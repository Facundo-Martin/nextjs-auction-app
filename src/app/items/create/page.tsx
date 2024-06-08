import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { createItemAction } from "./actions";

export default async function Page() {
  const session = await auth();
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Post an Item</h1>
      <form
        className="border p-8 rounded-xl space-y-4 max-w-lg flex flex-col"
        action={createItemAction}
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
        <Button className="self-end" type="submit">
          Post item
        </Button>
      </form>
    </main>
  );
}
