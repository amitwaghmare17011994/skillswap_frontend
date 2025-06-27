/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Layout.tsx

import { Link } from "react-router-dom";

export default function Layout({ children }: { children: any }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <header
        className="sticky top-0 z-50 bg-white border-b h-[72px]"
        style={{
          boxShadow:
            "0 2px 4px rgba(6, 17, 118, 0.08), 0 4px 12px rgba(6, 17, 118, 0.08)",
          alignContent: "center",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            SkillMatch
          </Link>

          <nav className="space-x-4">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              to="/skills"
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              Skills
            </Link>
            <Link
              to="/chat"
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              Chat
            </Link>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main>
        <div className="min-h-screen flex items-center justify-center bg-white">
          {children}
        </div>
      </main>
    </div>
  );
}
