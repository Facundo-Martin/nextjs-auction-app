"use client";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { createItemAction, createUploadUrlAction } from "./actions";

export default function Page() {
  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Post an Item</h1>
      <form
        className="border p-8 rounded-xl space-y-4 max-w-lg flex flex-col"
        onSubmit={async (e) => {
          e.preventDefault();

          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
          const file = formData.get("file") as File;

          const uploadUrl = await createUploadUrlAction(file.name);

          const uploadFormData = new FormData();
          uploadFormData.append("file", file);

          await fetch(uploadUrl, {
            method: "PUT",
            body: uploadFormData,
          });

          await createItemAction(formData);
        }}
      >
        <Input required name="name" type="text" placeholder="Name your item" />
        <Input
          required
          name="startingPrice"
          type="number"
          min="1"
          step="0.01"
          placeholder="Where to start your auction at"
        />
        <Input required name="file" type="file" placeholder="Name your item" />
        <Button className="self-end" type="submit">
          Post item
        </Button>
      </form>
    </main>
  );
}
