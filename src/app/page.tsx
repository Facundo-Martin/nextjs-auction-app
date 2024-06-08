import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { bids as bidsSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const bids = await database.query.bids.findMany();

  return (
    <main className="container mx-auto py-12">
      <form
        action={async (formData: FormData) => {
          "use server";

          const bid = formData.get("bid") as string;
          await database.insert(bidsSchema).values({});
          revalidatePath("/");
        }}
      >
        <Input name="bid" type="number" placeholder="Bid" />
        <Button type="submit">Place bid</Button>
      </form>

      <div className="space-y-2.5">
        {bids.map((x) => (
          <div key={x.id}>Bid number {x.id}</div>
        ))}
      </div>
    </main>
  );
}
