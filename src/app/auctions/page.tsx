import { database } from "@/db/database";
import { ItemCard } from "@/components/item-card";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { items } from "@/db/schema";

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
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">My auctions page</h1>
      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
    </main>
  );
}
