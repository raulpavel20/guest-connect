import React from "react";

export default async function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-10">
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
