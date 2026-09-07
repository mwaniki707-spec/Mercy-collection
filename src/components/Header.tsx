'use client';

import { useEffect, useState, memo, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useCartStore } from '@/store/cartStore';

function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = useCartStore(state => state.getItemCount());

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const tokenResult = await currentUser.getIdTokenResult();
        setIsAdmin(!!tokenResult.claims.admin);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const navLinkClass = (path: string) =>
    `hover:text-primary transition-colors ${
      pathname === path ? 'text-primary font-semibold' : 'text-dark'
    }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <nav className="container py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl sm:text-2xl font-display font-bold text-dark">
            Mercy Collections
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6">
            <li>
              <Link href="/" className={navLinkClass('/')}>
                Shop
              </Link>
            </li>

            <li className="relative">
              <Link
                href="/cart"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                🛍️ Cart
                {isMounted && itemCount > 0 && (
                  <span className="badge">{itemCount}</span>
                )}
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="hover:text-primary transition-colors"
                  >
                    Sign Out
                  </button>
                </li>
                {isAdmin && (
                  <li>
                    <Link
                      href="/admin"
                      className="hover:text-primary transition-colors"
                    >
                      Admin
                    </Link>
                  </li>
                )}
              </>
            ) : (
              <li>
                <Link
                  href="/auth"
                  className="hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile: cart icon + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/cart"
              className="relative flex items-center hover:text-primary transition-colors"
            >
              🛍️
              {isMounted && itemCount > 0 && (
                <span className="badge absolute -top-2 -right-3 text-[10px] min-w-[18px] h-[18px]">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="flex flex-col gap-1 border-t border-gray-100 pt-4">
            <li>
              <Link
                href="/"
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  pathname === '/'
                    ? 'bg-amber-50 text-primary font-semibold'
                    : 'hover:bg-gray-50'
                }`}
              >
                🏠 Shop
              </Link>
            </li>

            <li>
              <Link
                href="/cart"
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  pathname === '/cart'
                    ? 'bg-amber-50 text-primary font-semibold'
                    : 'hover:bg-gray-50'
                }`}
              >
                🛍️ Cart
                {isMounted && itemCount > 0 && (
                  <span className="ml-2 badge">{itemCount}</span>
                )}
              </Link>
            </li>

            {user ? (
              <>
                {isAdmin && (
                  <li>
                    <Link
                      href="/admin"
                      className={`block px-4 py-3 rounded-lg transition-colors ${
                        pathname === '/admin'
                          ? 'bg-amber-50 text-primary font-semibold'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      ⚙️ Admin
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-red-500"
                  >
                    🚪 Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/auth"
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    pathname === '/auth'
                      ? 'bg-amber-50 text-primary font-semibold'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  🔑 Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

// Memoize Header component
export default memo(Header);
