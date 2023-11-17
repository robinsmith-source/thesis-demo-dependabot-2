import React from "react";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-96 flex-col items-center justify-center gap-y-3">
      {children}
    </main>
  );
}
