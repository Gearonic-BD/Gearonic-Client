
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/auth/me");
      setUser(res.data);
      return true;
    } catch {
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, isAuthenticated: !!user, checkAuth };
}
