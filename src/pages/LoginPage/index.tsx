import { FaApple, FaFacebook } from "react-icons/fa";
import { auth, provider, signInWithPopup } from "@/lib/firebase";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import LoginIllustration from "@/assets/login-illustration.webp";
import { createOrLoginUser, loginUser } from "@/lib/services";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user.providerData[0];

      const userPayload = {
        name: googleUser.displayName,
        // email: googleUser.email,
        // avatar: googleUser.photoURL,
        ...googleUser,
      };
      const res = await createOrLoginUser(userPayload);
      // Optional: Save token/local user
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      // Redirect to dashboard
      navigate("/dashboard");

      if (res.ok) {
        navigate("/dashboard");
      } else {
        console.error("Backend auth failed");
      }
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!showPassword) {
      // Show password field
      setShowPassword(true);
      return;
    }
    // Try login
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-8 bg-white">
      {/* Left Illustration */}
      <div className="hidden md:flex items-center justify-center">
        <img
          src={LoginIllustration} // Replace with your actual image path
          alt="Learning Illustration"
          className="w-full max-w-lg"
        />
      </div>

      {/* Right Form */}
      <div className="flex flex-col justify-center space-y-6 w-full max-w-md mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Log in to continue your learning journey
          </h1>
          <form onSubmit={handleContinue}>
            <Input
              type="email"
              placeholder="Email"
              className="mb-3"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={showPassword}
            />
            {showPassword && (
              <Input
                type="password"
                placeholder="Password"
                className="mb-3"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            )}
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Logging in..." : showPassword ? "Login" : "Continue with email"}
            </Button>
          </form>
        </div>

        {/* Divider */}
        <div className="relative text-center">
          <hr className="absolute w-full border-t border-gray-200 top-3" />
          <span className="relative bg-white px-3 text-sm text-gray-500">
            Other log in options
          </span>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col space-y-3">
          <Button
            variant="outline"
            className="w-full flex gap-2"
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={20} /> Google
          </Button>
          <Button variant="outline" className="w-full flex gap-2">
            <FaFacebook size={20} className="text-blue-600" /> Facebook
          </Button>
          <Button variant="outline" className="w-full flex gap-2">
            <FaApple size={20} /> Apple
          </Button>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500 text-center pt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary font-medium">
            Sign up
          </Link>
          <br />
          <a href="/org-login" className="text-sm text-primary underline">
            Log in with your organization
          </a>
        </div>
      </div>
    </div>
  );
}
