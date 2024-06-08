import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const session = await auth();
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Post an Item to Sell</h1>
      <form
        className="border p-8 rounded-xl space-y-4 max-w-lg flex flex-col"
        action={async (formData: FormData) => {
          "use server";

          const name = formData.get("name") as string;
          const userId = session?.user?.id!;
          await database.insert(items).values({ name, userId });
          revalidatePath("/");
        }}
      >
        <Input name="name" type="text" placeholder="Name your item" />
        <Button className="self-end" type="submit">
          Post item
        </Button>
      </form>

      <h2 className="text-2xl font-bold">Items For Sale</h2>
      <div className="space-y-2.5">
        <div className="grid grid-cols-4 gap-8">
          {allItems.map((x) => (
            <div key={x.id} className="border p-8 rounded-xl">
              {x.name}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
