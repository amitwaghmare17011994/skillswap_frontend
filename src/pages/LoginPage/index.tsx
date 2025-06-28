import { FaApple, FaFacebook } from "react-icons/fa";
import { auth, provider, signInWithPopup } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import LoginIllustration from "@/assets/login-illustration.webp";
import { createOrLoginUser } from "@/lib/services";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user.providerData[0];

      const userPayload = {
        name: googleUser.displayName,
        email: googleUser.email,
        avatar: googleUser.photoURL,
      };
      const res = await createOrLoginUser(userPayload);

      // Optional: Save token/local user
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(googleUser));

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
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-8">
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

          <Input type="email" placeholder="Email" className="mb-3" />
          <Button className="w-full">Continue with email</Button>
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
          Don’t have an account?{" "}
          <a href="/signup" className="text-primary font-medium">
            Sign up
          </a>
          <br />
          <a href="/org-login" className="text-sm text-primary underline">
            Log in with your organization
          </a>
        </div>
      </div>
    </div>
  );
}
