import { database } from "@/db/database";
import { ItemCard } from "@/components/item-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string };
}) {
  const item = await database.query.items.findFirst({
    where: (items, { eq }) => eq(items.id, parseInt(itemId)),
  });

  if (!item) {
    return (
      <div className="space-y-8 flex flex-col items-center mt-12">
        <h1 className="text-4xl font-bold">Item not found</h1>
        <Image src="/package.svg" width="200" height="200" alt="Package" />
        <p className="max-w-sm">
          The item you&apos;re trying to view is invalid. Please go back and
          search for a different auction item
        </p>
        <Button asChild>
          <Link href="/auctions">View Auctions</Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Items for Sale</h1>
      <div className="grid grid-cols-4 gap-8"></div>
    </main>
  );
}
