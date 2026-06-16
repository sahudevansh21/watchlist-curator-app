import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-center">
      <h1>Welcome to Your Personal Watchlist Curator</h1>
      <p className="mb-4" style={{color: 'var(--text-color-secondary)'}}>
        Tired of endless scrolling and forgetting what you own? This is your personalized hub to log, track, and discover movies and TV shows from your collection.
      </p>

      <div className="grid-container" style={{maxWidth: '800px', margin: '3rem auto'}}>
        <Link href="/my-collection" className="glass-card flex-col items-center btn-secondary" style={{padding: '2rem'}}>
          <h2>My Collection</h2>
          <p style={{color: 'var(--text-color-secondary)'}}>
            Manage your entire library of movies and TV shows. Add new entries, update details, and keep track of everything you own.
          </p>
          <button className="btn mt-4">Go to Collection</button>
        </Link>

        <Link href="/suggest-a-watch" className="glass-card flex-col items-center btn-secondary" style={{padding: '2rem'}}>
          <h2>Suggest a Watch</h2>
          <p style={{color: 'var(--text-color-secondary)'}}>
            Can't decide what to watch? Let us pick something random from your collection based on your mood or criteria.
          </p>
          <button className="btn mt-4">Surprise Me!</button>
        </Link>
      </div>

      <p className="mt-4" style={{color: 'var(--text-color-secondary)'}}>
        All your data is stored securely in your browser's local storage.
      </p>
    </div>
  );
}
