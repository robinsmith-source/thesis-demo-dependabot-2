"use client";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { getProviders, signIn, useSession } from "next-auth/react";
import type { BuiltInProviderType } from "next-auth/providers";
import { useEffect, useState } from "react";
import { Button, CardBody, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

  useEffect(() => {
    (async () => {
      setProviders(await getProviders());
    })().catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <>
      <CardHeader className="flex justify-center">
        <h1 className="text-5xl font-bold">Sign in</h1>
      </CardHeader>
      <CardBody>
        {providers &&
          Object.values(providers).map((provider) => (
            <Button
              key={provider.name}
              variant="solid"
              type="button"
              color="success"
              size="lg"
              className="w-full"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </Button>
          ))}
      </CardBody>
    </>
  );
}
