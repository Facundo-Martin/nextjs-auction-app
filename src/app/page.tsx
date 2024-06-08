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
    <main className="container mx-auto py-12">
      <form
        action={async (formData: FormData) => {
          "use server";

          const name = formData.get("name") as string;
          const userId = session?.user?.id!;
          await database.insert(items).values({ name, userId });
          revalidatePath("/");
        }}
      >
        <Input name="name" type="text" placeholder="Name your item" />
        <Button type="submit">Post item</Button>
      </form>

      <div className="space-y-2.5">
        {allItems.map((x) => (
          <div key={x.id}>{x.name}</div>
        ))}
      </div>
    </main>
  );
}
