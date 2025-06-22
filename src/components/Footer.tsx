
import { Building, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Building className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Build Your Architecture</span>
            </div>
            <p className="text-background/80 leading-relaxed mb-6 max-w-md">
              Transforming architectural vision into reality with cutting-edge AI technology. 
              Design, visualize, and build your dream spaces with unprecedented precision and speed.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/saksham_.khatri?igsh=MXUweHF4OHpmdDltcw==--"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/saksham-khatri-4a3810324/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-background/80 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/design" className="text-background/80 hover:text-primary transition-colors">
                  Design Studio
                </Link>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-background/80">
                <Mail className="h-4 w-4 mr-3 text-primary" />
                sakshamkhatri8810@gmail.com
              </li>
              <li className="flex items-center text-background/80">
                <Phone className="h-4 w-4 mr-3 text-primary" />
                +91 8901186266
              </li>
              <li className="flex items-center text-background/80">
                <MapPin className="h-4 w-4 mr-3 text-primary" />
                India, Haryana
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-background/60">
            © 2024 Build Your Architecture. All rights reserved. Powered by AI innovation.
          </p>
        </div>
      </div>
    </footer>
  );
};
