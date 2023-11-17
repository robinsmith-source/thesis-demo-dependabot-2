"use client";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { getProviders, signIn, useSession } from "next-auth/react";
import type { BuiltInProviderType } from "next-auth/providers";
import { useEffect, useState } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
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
      <h1 className="text-5xl font-bold">Signin</h1>
      {providers &&
        Object.values(providers).map((provider) => (
          <Card key={provider.name} className="w-96">
            <CardBody>
              <Button
                variant="solid"
                type="button"
                color="success"
                size="lg"
                className="w-64"
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </Button>
            </CardBody>
          </Card>
        ))}
    </>
  );
}
