"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { useCartStore } from "@/store/cart";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<
    "initial" | "login" | "signup" | "verify-otp"
  >("initial");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [checkedName, setCheckedName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { fetchCart } = useCartStore();

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const resetSuccess = searchParams.get("reset") === "success";

  // Show success message if password was reset
  useEffect(() => {
    if (resetSuccess) {
      setError(""); // Clear any errors
      // You could set a success message here if you have a success state
    }
  }, [resetSuccess]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // Use axiosInstance to ensure correct baseURL from environment variables
      const response = await axiosInstance.post("/auth/api/check-email", {
        email,
      });

      if (response.data.exists && response.data.hasPassword) {
        setCheckedName(response?.data?.name);
        setStep("login");
      } else {
        console.log("User does not exist. Going to signup step.");
        setStep("signup");
      }
    } catch (err) {
      console.error("Error checking user existence", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const redirect = searchParams.get("redirect") || window.location.pathname;
    // Use OAuth state parameter to store redirect URL
    const state = encodeURIComponent(redirect);
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/api/google?state=${state}`;
  };

  // const handleFacebookLogin = async () => {
  //   window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/api/facebook`;
  // };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.post(`/auth/api/login`, {
        email,
        password,
      });

      if (res.status === 200) {
        // Check if OTP verification is required
        if (res.data.requiresVerification && res.data.userId) {
          setUserId(res.data.userId);
          setStep("verify-otp");
          setResendTimer(60); // Start 60 second countdown
          // Focus first OTP input
          setTimeout(() => {
            otpInputRefs.current[0]?.focus();
          }, 100);
        } else {
          // User is already verified, redirect
          router.replace(redirect);
          fetchCart();
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || error.message || "Login failed";
        setError(errorMessage);
        console.error("Login error:", error.response?.data || error.message);
      } else {
        setError("An unexpected error occurred");
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.post(`/auth/api/create-user`, {
        email,
        password,
        name,
      });
      if (res.status === 201) {
        router.replace(redirect);
        fetchCart();
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message || err.message || "Signup failed";
        setError(errorMessage);
        console.error("Signup error:", err.response?.data || err.message);
      } else {
        setError("An unexpected error occurred");
        console.error("Unexpected error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are entered
    if (newOtp.every((digit) => digit !== "") && newOtp.join("").length === 6) {
      handleVerifyOtp(newOtp.join(""));
    }
  };

  // Handle backspace in OTP input
  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste OTP
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      setError("");
      // Focus last input
      otpInputRefs.current[5]?.focus();
      // Auto-verify
      setTimeout(() => {
        handleVerifyOtp(pastedData);
      }, 100);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (otpCode?: string) => {
    const code = otpCode || otp.join("");
    if (code.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.post(`/auth/api/verify-otp`, {
        userId,
        code,
      });

      if (res.status === 200 && res.data.verified) {
        fetchCart();
        router.replace(redirect);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || "Invalid or expired OTP";
        setError(errorMessage);
        // Clear OTP on error
        setOtp(["", "", "", "", "", ""]);
        otpInputRefs.current[0]?.focus();
      } else {
        setError("An unexpected error occurred");
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.post(`/auth/api/resend-otp`, {
        userId,
      });

      if (res.status === 200) {
        setResendTimer(60); // Reset timer to 60 seconds
        setOtp(["", "", "", "", "", ""]);
        otpInputRefs.current[0]?.focus();
        // Show success message (optional)
        setError(""); // Clear any previous errors
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || "Failed to resend OTP";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred");
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  return (
    <div className=" min-h-[75vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {step === "login" && `Welcome back ${checkedName}`}
            {step === "signup" && "Create your account"}
            {step === "verify-otp" && "Verify your email"}
          </h1>
          <p className="text-gray-600">
            {step === "login" && "Enter your password to continue"}
            {step === "signup" && "Fill in your details to get started"}
            {step === "verify-otp" && `We've sent a 6-digit code to ${email}`}
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {step === "initial" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                {loading ? "Continueing..." : "Continue"}
              </button>

              <div className="text-center text-sm text-gray-600 transition-colors">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setStep("signup")}
                  className="cursor-pointer text-primary hover:text-primary/90 transition-colors hover:underline"
                >
                  Sign up
                </button>
              </div>

              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full cursor-pointer flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>

                {/* <button
                  type="button"
                  onClick={handleFacebookLogin}
                  className="w-full cursor-pointer flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Continue with Facebook
                </button> */}
              </div>
            </form>
          )}

          {step === "login" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setStep("initial")}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <p className="text-sm text-gray-600">Signing in as</p>
                  <p className="font-medium text-gray-900">{email}</p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full cursor-pointer bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <div className="text-center space-y-2">
                <Link
                  href="/forgot-password"
                  className="block text-sm text-primary hover:text-primary/90 transition-colors hover:underline"
                >
                  Forgot password?
                </Link>
                <button
                  onClick={() => setStep("initial")}
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Use a different email
                </button>
              </div>
            </div>
          )}

          {step === "signup" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setStep("initial")}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <p className="text-sm text-gray-600">Creating account for</p>
                  <p className="font-medium text-gray-900">{email}</p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>

              <div className="text-center">
                <button
                  onClick={() => setStep("initial")}
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Use a different email
                </button>
              </div>
            </div>
          )}

          {step === "verify-otp" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setStep("login")}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <p className="text-sm text-gray-600">Verifying</p>
                  <p className="font-medium text-gray-900">{email}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  Enter verification code
                </label>
                <div className="flex justify-center gap-2 mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        otpInputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleOtpPaste : undefined}
                      className="w-12 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                      disabled={loading}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleVerifyOtp()}
                disabled={loading || otp.join("").length !== 6}
                className="w-full cursor-pointer bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify"}
              </button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Didn&apos;t receive the code?{" "}
                  {resendTimer > 0 ? (
                    <span className="text-gray-500">
                      Resend in {resendTimer}s
                    </span>
                  ) : (
                    <button
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="text-primary hover:text-primary/90 transition-colors hover:underline disabled:text-gray-400"
                    >
                      Resend code
                    </button>
                  )}
                </p>
                <button
                  onClick={() => setStep("login")}
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Use a different email
                </button>
              </div>
            </div>
          )}

          {resetSuccess && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">
                Password reset successfully! You can now login with your new
                password.
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            By continuing, you agree to our{" "}
            <Link
              href="/terms-conditions"
              className="text-primary hover:underline"
            >
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              className="text-primary hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
