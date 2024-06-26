import { database } from "@/db/database";
import { ItemCard } from "@/components/item-card";

export default async function Home() {
  const allItems = await database.query.items.findMany();

  return (
    <main className="space-y-8">
      <h1 className="text-4xl font-bold">Items for Sale</h1>
      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
    </main>
  );
}
