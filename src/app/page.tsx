import { database } from "@/db/database";
import { bids as bidsSchema } from "@/db/schema";

export default async function Home() {
  const bids = await database.query.bids.findMany();
  console.log(bids);

  return (
    <main className="container mx-auto py-12">
      <form
        action={async (formData: FormData) => {
          "use server";

          const bid = formData.get("bid") as string;
          await database.insert(bidsSchema).values({});
        }}
      >
        <input name="bid" type="number" placeholder="Bid" />
        <button type="submit">Place bid</button>
      </form>

      <div className="space-y-2.5">
        {bids.map((x) => (
          <div key={x.id}>Bid number {x.id}</div>
        ))}
      </div>
    </main>
  );
}
