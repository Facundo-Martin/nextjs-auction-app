import { database } from "@/db/database";
import { ItemCard } from "@/components/item-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getImageUrl } from "@/utils/files";
import { formatDistance } from "date-fns";

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
        <p className="text-center">
          The item you&apos;re trying to view is invalid. <br />
          Please go back and search for a different auction item
        </p>
        <Button asChild>
          <Link href="/auctions">View Auctions</Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-12 space-y-8">
      <div className="flex gap-8">
        <div>
          <h1 className="text-4xl font-bold">
            <span className="font-normal">Auction for</span> {item.name}
          </h1>
          <Image
            src={getImageUrl(item.fileKey)}
            alt={item.name}
            width={400}
            height={400}
            className="object-cover rounded-xl"
          />
          <p className="text-lg">
            Starting price of{" "}
            <span className="font-bold">${item.startingPrice}</span>
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Current Bids</h2>
        </div>
      </div>
    </main>
  );
}

function formatTimesstamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), { addSuffix: true });
}
