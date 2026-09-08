"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'My Decks', href: '/my-decks' },
    { name: 'Study Session', href: '/study-session' },
    { name: 'Progress Tracker', href: '/progress-tracker' },
  ];

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">
        Flashcard Tool
      </Link>
      <div className="navbar-links">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              className={isActive ? 'active' : ''}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
