import { items } from "@/db/schema";
import { getImageUrl } from "@/utils/files";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatToDollar } from "@/utils/currency";

type AuctionItem = typeof items.$inferSelect;

export function ItemCard(props: AuctionItem) {
  return (
    <div className="border p-8 rounded-xl space-y-2">
      <Image
        src={getImageUrl(props.fileKey)}
        alt={props.name}
        width={250}
        height={250}
        className="object-cover"
      />
      <p className="text-xl font-bold">{props.name}</p>
      <p className="text-lg">
        startingPrice: ${formatToDollar(props.startingPrice)}
      </p>
      <Button asChild>
        <Link href={`/items/${props.id}`}>Place Bid</Link>
      </Button>
    </div>
  );
}
