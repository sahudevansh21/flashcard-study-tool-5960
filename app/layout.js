import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Flashcard Study Tool',
  description: 'An interactive platform to create, organize, and study custom flashcard decks.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
