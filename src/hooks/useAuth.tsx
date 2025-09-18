import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { User } from "@/types/types";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/auth/me");
      const userData = res.data;
      setUser(userData);
      return { success: true, user: userData }; // Return user data
    } catch {
      setUser(null);
      return { success: false, user: null };
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, setLoading, isAuthenticated: !!user, checkAuth };
}
