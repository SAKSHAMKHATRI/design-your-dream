
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setToken } from "@/utils/auth";
import { Building, ArrowLeft, Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic validation for signup
    if (isSignUp) {
      if (!formData.name || !formData.email || !formData.password) {
        alert("Please fill in all fields");
        setIsLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match");
        setIsLoading(false);
        return;
      }
    }
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, any email/password combination works
      if (formData.email && formData.password) {
        setToken('demo-jwt-token');
        if (isSignUp && formData.name) {
          localStorage.setItem('username', formData.name);
        } else {
          // For login, derive a username from the email
          const usernameFromEmail = formData.email.split('@')[0];
          localStorage.setItem('username', usernameFromEmail.charAt(0).toUpperCase() + usernameFromEmail.slice(1));
        }
        const redirectTo = searchParams.get('redirect') || '/design';
        navigate(redirectTo);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center mb-6">
            <Building className="h-10 w-10 text-primary mr-3" />
            <h1 className="text-3xl font-bold text-primary">ArchitectAI</h1>
          </div>
          <p className="text-muted-foreground">
            {isSignUp ? "Create your account to start designing" : "Welcome back! Sign in to continue"}
          </p>
        </div>

        <Card className="border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isSignUp ? "Create Account" : "Sign In"}
            </CardTitle>
            <CardDescription>
              {isSignUp 
                ? "Join thousands of architects using AI-powered design" 
                : "Access your architectural design dashboard"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required={isSignUp}
                    className="h-11"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required={isSignUp}
                    className="h-11"
                  />
                </div>
              )}

              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading 
                  ? (isSignUp ? "Creating Account..." : "Signing In...") 
                  : (isSignUp ? "Create Account" : "Sign In")
                }
              </Button>
            </form>
            
            <div className="mt-6 text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}
                  </span>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                onClick={toggleMode}
                className="w-full"
              >
                {isSignUp ? "Sign in instead" : "Create an account"}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Demo: Use any email and password to {isSignUp ? "sign up" : "sign in"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
