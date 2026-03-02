import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "VibeCheque — Find Your Kind of Night in Chicago",
  description:
    "Discover Chicago's best restaurants and bars by atmosphere. AI-powered vibe analysis and community reviews.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f7f6f4]">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80">
          <div className="max-w-6xl mx-auto px-4 h-15 flex items-center justify-between" style={{ height: 60 }}>
            <Link href="/" className="flex items-center gap-2.5 group">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black tracking-tight shadow-sm"
                style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" }}
              >
                V
              </div>
              <span className="font-black text-lg tracking-tight text-gray-900">
                Vibe<span className="text-violet-600">Cheque</span>
              </span>
            </Link>

            <nav className="hidden sm:flex items-center gap-7 text-sm font-medium text-gray-500">
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Discover
              </Link>
              <Link href="/add-venue" className="hover:text-gray-900 transition-colors">
                Add Venue
              </Link>
            </nav>

            <Link
              href="/add-venue"
              className="flex items-center gap-1.5 bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors"
            >
              <Plus size={15} />
              <span className="hidden sm:inline">Add Venue</span>
            </Link>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-24 border-t border-gray-200 py-10 text-center text-sm text-gray-400">
          <p>
            <span className="font-semibold text-gray-600">VibeCheque</span>
            {" "}— Find your kind of night.
          </p>
          <p className="mt-1 text-xs">Chicago · AI-powered vibe analysis</p>
        </footer>
      </body>
    </html>
  );
}
