/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Layout.tsx

import Header from "./layout/Header";

export default function Layout({ children }: { children: any }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Page Content */}
      <main>
        <div className="min-h-screen flex  bg-gray-100 p-10">{children}</div>
      </main>
    </div>
  );
}
