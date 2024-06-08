import { auth } from "@/auth";
import { database } from "@/db/database";

export default async function Home() {
  const session = await auth();
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Items for Sale</h1>
      <div className="space-y-2.5">
        <div className="grid grid-cols-4 gap-8">
          {allItems.map((x) => (
            <div key={x.id} className="border p-8 rounded-xl">
              <p>{x.name}</p>
              <p>startingPrice: ${x.startingPrice / 100}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
