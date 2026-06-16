import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Personal Watchlist Curator',
  description: 'Manage your movie and TV show collection with ease.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <div className="navbar-container">
            <Link href="/" className="navbar-brand">
              Watchlist Curator
            </Link>
            <div className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/my-collection">My Collection</Link>
              <Link href="/suggest-a-watch">Suggest a Watch</Link>
            </div>
          </div>
        </nav>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
