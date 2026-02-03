import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const [navLinks, setNavLinks] = useState<{ name: string, href: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/navbar`)
      .then(res => res.json())
      .then(data => {
        setNavLinks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch navbar links:", err);
        // Fallback to default links if API fails
        setNavLinks([
          { name: "Home", href: "/" },
          { name: "Portfolio", href: "/portfolio" },
          { name: "Services", href: "/services" },
          { name: "Blog", href: "/blog" },
          { name: "About Us", href: "/about" },
        ]);
        setLoading(false);
      });
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || mobileMenuOpen
        ? "bg-background/95 backdrop-blur-sm border-b border-border/50"
        : "bg-transparent"
        }`}
    >
      <div className="container-editorial">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="editorial-heading text-xl md:text-2xl text-foreground tracking-wide">
            Pragati
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`nav-link text-sm tracking-widest uppercase font-light transition-colors duration-300
                  ${isActive(link.href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button & Theme Toggle - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              to="/about"
              className="btn-primary text-xs"
            >
              Start a Project
            </Link>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="text-foreground p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/30 py-6 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`py-2 text-sm tracking-widest uppercase transition-colors
                    ${isActive(link.href) ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border/30">
                <Link
                  to="/about"
                  className="btn-primary text-xs text-center block"
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
