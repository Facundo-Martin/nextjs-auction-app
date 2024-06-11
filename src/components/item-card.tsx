import { items } from "@/db/schema";
import { getImageUrl } from "@/utils/files";
import Image from "next/image";

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
      <p className="text-lg">startingPrice: ${props.startingPrice / 100}</p>
    </div>
  );
}
