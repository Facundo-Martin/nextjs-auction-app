import { database } from "@/db/database";
import { ItemCard } from "@/components/item-card";
import { auth } from "@/auth";
import { EmptyState } from "./empty-state";

export default async function Home() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  const userId = session.user.id!;

  const allItems = await database.query.items.findMany({
    where: (items, { eq }) => eq(items.userId, userId),
  });

  return (
    <main className="py-12">
      <h1 className="text-4xl font-bold">Your Current Auctions</h1>
      {allItems.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-4 gap-8 mt-8">
          {allItems.map((item) => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </main>
  );
}
