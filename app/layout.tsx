import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "VibeCheque — Rate the Vibe, Not Just the Food",
  description:
    "Discover restaurants and bars by their vibe. AI-powered vibe checks + community reviews to find your perfect atmosphere.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl vibe-gradient flex items-center justify-center text-white font-black text-lg shadow-md">
                V
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-gray-900">
                  Vibe
                </span>
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Cheque
                </span>
              </div>
            </Link>

            <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-purple-600 transition-colors">
                Discover
              </Link>
              <Link href="/add-venue" className="hover:text-purple-600 transition-colors">
                Add Venue
              </Link>
            </nav>

            <Link
              href="/add-venue"
              className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:from-purple-700 hover:to-pink-600 transition-all shadow-sm"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add Venue</span>
            </Link>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-20 border-t border-gray-200 py-10 text-center text-sm text-gray-400">
          <p>
            <span className="font-bold text-gray-600">VibeCheque</span> — Rate
            the vibe, not just the food.
          </p>
          <p className="mt-1">vibecheque.com · AI-powered vibe analysis</p>
        </footer>
      </body>
    </html>
  );
}
