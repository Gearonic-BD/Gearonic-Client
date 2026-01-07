"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "verify-otp" | "reset-password">(
    "email"
  );
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

    // Auto-verify when all 6 digits are entered
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

  // Request password reset
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.post(`/auth/api/forgot-password`, {
        email,
      });

      if (res.status === 200) {
        setUserId(res.data.userId);
        setStep("verify-otp");
        setResendTimer(60); // Start 60 second countdown
        // Focus first OTP input
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 100);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || "Failed to send reset code";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred");
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
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
      const res = await axiosInstance.post(
        `/auth/api/verify-password-reset-otp`,
        {
          userId,
          code,
        }
      );

      if (res.status === 200 && res.data.verified) {
        setStep("reset-password");
        setOtp(["", "", "", "", "", ""]);
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
      const res = await axiosInstance.post(`/auth/api/forgot-password`, {
        email,
      });

      if (res.status === 200) {
        setResendTimer(60); // Reset timer to 60 seconds
        setOtp(["", "", "", "", "", ""]);
        otpInputRefs.current[0]?.focus();
        setError(""); // Clear any previous errors
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || "Failed to resend code";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred");
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate passwords
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post(`/auth/api/reset-password`, {
        userId,
        newPassword,
      });

      if (res.status === 200 && res.data.success) {
        // Redirect to login page with success message
        router.push("/login?reset=success");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || "Failed to reset password";
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
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {step === "email" && "Forgot Password"}
            {step === "verify-otp" && "Verify Your Email"}
            {step === "reset-password" && "Reset Your Password"}
          </h1>
          <p className="text-gray-600">
            {step === "email" &&
              "Enter your email address and we'll send you a reset code"}
            {step === "verify-otp" && `We've sent a 6-digit code to ${email}`}
            {step === "reset-password" && "Enter your new password"}
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {step === "email" && (
            <form onSubmit={handleRequestReset} className="space-y-4">
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
                {loading ? "Sending..." : "Send Reset Code"}
              </button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Back to login
                </Link>
              </div>
            </form>
          )}

          {step === "verify-otp" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setStep("email")}
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
                  onClick={() => setStep("email")}
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Use a different email
                </button>
              </div>
            </div>
          )}

          {step === "reset-password" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setStep("verify-otp")}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <p className="text-sm text-gray-600">
                    Resetting password for
                  </p>
                  <p className="font-medium text-gray-900">{email}</p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                    placeholder="Enter new password"
                    minLength={6}
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
                  Confirm Password
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
                    placeholder="Confirm new password"
                    minLength={6}
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
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Back to login
                </Link>
              </div>
            </form>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
