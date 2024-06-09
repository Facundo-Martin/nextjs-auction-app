"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { items } from "@/db/schema";
import { database } from "@/db/database";
import { getSignedUrlForS3Object } from "@/lib/s3";

export async function createUploadUrlAction(key: string, type: string) {
  return await getSignedUrlForS3Object(key, type);
}

export async function createItemAction(formData: FormData) {
  const session = await auth();

  if (!session) throw new Error("Unauthorized");

  const user = session.user;

  if (!user || !user.id) throw new Error("Unauthorized");

  const startingPrice = formData.get("startingPrice") as string;
  const priceAsCents = Math.floor(parseFloat(startingPrice) * 100);

  const file = formData.get("file") as File;
  console.log(file);

  await database.insert(items).values({
    name: formData.get("name") as string,
    startingPrice: priceAsCents,
    userId: user.id,
  });

  revalidatePath("/");
  redirect("/");
}
