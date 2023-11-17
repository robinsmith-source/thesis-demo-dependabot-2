"use client";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function Page() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-5xl font-bold">Signout</h1>
        <h2 className="text-xl">Are you sure you want to sign out?</h2>
      </div>
      <Button
        variant="solid"
        type="button"
        color="success"
        size="lg"
        className="w-64"
        onClick={() => signOut()}
      >
        Sign out
      </Button>
    </>
  );
}
