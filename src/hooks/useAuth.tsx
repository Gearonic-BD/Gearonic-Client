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
      console.log(res.data);
      setUser(res.data);
      return true;
    } catch {
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, setLoading, isAuthenticated: !!user, checkAuth };
}
