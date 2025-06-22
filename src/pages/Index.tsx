
import { Button } from "@/components/ui/button";
import { Building, Home, Palette, Crown, Minimize2, User, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, removeToken } from "@/utils/auth";
import { HeroSection } from "@/components/HeroSection";
import { CategoryCard } from "@/components/CategoryCard";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ContactUs } from "@/components/ContactUs";
import { FeedbackForm } from "@/components/FeedbackForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setIsAuth(authStatus);
      if (authStatus) {
        setUsername(localStorage.getItem("username") || "User");
      } else {
        setUsername("");
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("username");
    setIsAuth(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleAuthAction = (path: string) => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    navigate(path);
  };

  const categories = [
    {
      id: "modern",
      title: "Modern",
      description: "Clean lines, open spaces, and contemporary aesthetics with smart technology integration",
      icon: <Building className="h-10 w-10" />,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: "traditional",
      title: "Traditional",
      description: "Classic designs with timeless architectural elements and warm, inviting spaces",
      icon: <Home className="h-10 w-10" />,
      gradient: "from-amber-500 to-orange-600"
    },
    {
      id: "minimalist",
      title: "Minimalist",
      description: "Simple, functional designs with maximum impact and clutter-free living",
      icon: <Minimize2 className="h-10 w-10" />,
      gradient: "from-gray-500 to-slate-600"
    },
    {
      id: "luxury",
      title: "Luxury",
      description: "Premium materials and sophisticated architectural details for ultimate elegance",
      icon: <Crown className="h-10 w-10" />,
      gradient: "from-yellow-500 to-amber-600"
    }
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // offset for the sticky nav
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Build Your Architecture</span>
            </div>
            
            {/* Desktop Nav and Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="link" onClick={() => handleScrollTo('contact')}>Contact Us</Button>
              <Button variant="link" onClick={() => handleScrollTo('feedback')}>Feedback</Button>

              {isAuth ? (
                <>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium text-foreground">{username}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Log Out</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => navigate('/login')}>
                    Sign In
                  </Button>
                  <Button onClick={() => navigate('/login')}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Dropdown Menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isAuth ? (
                    <>
                      <DropdownMenuLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{username}</span>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleScrollTo('contact')}>
                        Contact Us
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleScrollTo('feedback')}>
                        Feedback
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log Out</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => handleScrollTo('contact')}>
                        Contact Us
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleScrollTo('feedback')}>
                        Feedback
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/login')}>Sign In</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/login')}>Sign Up</DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Design Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Choose Your{" "}
              <span className="text-primary">Architectural Style</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Select from our curated collection of architectural styles, each powered by advanced AI to create your perfect space
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                {...category}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Contact Us */}
      <ContactUs />
      
      {/* Feedback Form */}
      <FeedbackForm />

      {/* CTA */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
