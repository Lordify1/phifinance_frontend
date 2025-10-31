// layouts/LandingLayout.jsx
import { advisorName, advisorUrl, appUrl } from "@/app";
import { classMap } from "@/components/Tools/Misc";
import { useAuth } from "@/context/AuthContext";
import { Link } from "@inertiajs/react";

export default function LandingLayout({ children, user = useAuth() }) {
  // console.log(user)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#141414] text-white font-sans">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#0f0f0f]/70 backdrop-blur-md border-b border-gray-800">
        <div className="not-only:max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/" className="text-2xl font-bold tracking-wide text-white">
            {advisorName}
          </Link>
          <nav className="hidden md:block space-x-6 text-sm font-medium">
            {/* <Link
              href="/advisor"
              className="hover:text-[#00ffd1] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/features"
              className="hover:text-[#00ffd1] transition-colors"
            >
              Features
            </Link>
            <Link
              href="/faq"
              className="hover:text-[#00ffd1] transition-colors"
            >
              FAQ
            </Link> */}
            {user?.user ? (
              <Link
                href={advisorUrl + `/dashboard`}
                className={classMap.button()}
              >
                Dashboard
              </Link>
            ) : (
              <>
              <Link
                href={advisorUrl + '/login'}
                className={`${classMap.button('','','','','left')}`}
              >
                Login
              </Link>
              <Link
                href={advisorUrl + '/register'}
                className={`${classMap.button('','','','','right')}`}
              >
                Register
              </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className="">{children}</main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-gray-800 py-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} PHI.AI. All rights reserved. Built for the bold.
      </footer>
    </div>
  );
}
