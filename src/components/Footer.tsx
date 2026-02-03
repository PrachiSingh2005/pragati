import { Link } from "react-router-dom";

const Footer = () => {
  const navigationLinks = [
    { label: "Home", to: "/" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "Services", to: "/services" },
    { label: "About", to: "/about" },
  ];

  return (
    <footer className="py-16 md:py-20 border-t border-border">
      <div className="container-editorial">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* About */}
          <div>
            <h3 className="editorial-heading text-2xl text-foreground mb-6">Pragati</h3>
            <p className="body-text text-muted-foreground text-sm leading-relaxed">
              Designing warm, contemporary interiors rooted in material, light, and everyday living since 2015.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="body-text text-xs tracking-widest uppercase text-brass mb-6">
              Navigation
            </h4>
            <nav className="space-y-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="block body-text text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Social Combined */}
          <div>
            <h4 className="body-text text-xs tracking-widest uppercase text-brass mb-6">
              Contact
            </h4>
            <div className="space-y-3 mb-8">
              <a
                href="mailto:hello@pragatiinteriors.com"
                className="block body-text text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                hello@pragatiinteriors.com
              </a>
              <p className="body-text text-sm text-muted-foreground">
                Pune, India
              </p>
            </div>

            <h4 className="body-text text-xs tracking-widest uppercase text-brass mb-6">
              Follow
            </h4>
            <div className="space-y-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block body-text text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block body-text text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Pinterest
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="body-text text-xs text-muted-foreground">
            © 2024 Pragati Interior Studio. All rights reserved.
          </p>
          <p className="body-text text-xs text-muted-foreground">
            Crafted with care in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
