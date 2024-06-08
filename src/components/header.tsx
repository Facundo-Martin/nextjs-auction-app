import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { SignIn } from "./sign-in";
import { SignOut } from "./sign-out";

export async function Header() {
  const session = await auth();

  const userId = session?.user?.id;
  return (
    <div className="bg-gray-200 py-2">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href="/" className="hover:underline flex items-center gap-1">
            <Image src="/logo.png" width="50" height="50" alt="Logo" />
            BidBuddy.com
          </Link>

          <div className="flex items-center gap-8">
            <Link href="/" className="hover:underline flex items-center gap-1">
              All Auctions
            </Link>

            {userId && (
              <>
                <Link
                  href="/items/create"
                  className="hover:underline flex items-center gap-1"
                >
                  Create Auction
                </Link>

                <Link
                  href="/auctions"
                  className="hover:underline flex items-center gap-1"
                >
                  My Auctions
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>Notifs</div>

          {session?.user?.image && (
            <Image
              src={session.user.image}
              width="40"
              height="40"
              alt="user avatar"
              className="rounded-full"
            />
          )}
          <div>{session?.user?.name}</div>
          <div>{userId ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </div>
  );
}
