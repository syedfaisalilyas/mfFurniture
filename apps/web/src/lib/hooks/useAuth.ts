import { useState, useEffect } from "react";
import * as auth from "../auth";

export interface User {
  id: string;
  email?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on mount
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      setLoading(true);
      const currentUser = await auth.getCurrentUser();
      setUser(currentUser ? { id: currentUser.id, email: currentUser.email } : null);
    } catch (err) {
      console.error("Error checking user:", err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const result = await auth.signInWithEmail(email, password);
      if (result.user) {
        setUser({ id: result.user.id, email: result.user.email });
      }
      return result;
    } catch (err: any) {
      const message = err.message || "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const result = await auth.signUpWithEmail(email, password);
      if (result.user) {
        setUser({ id: result.user.id, email: result.user.email });
      }
      return result;
    } catch (err: any) {
      const message = err.message || "Registration failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setError(null);
    setLoading(true);
    try {
      await auth.signOut();
      setUser(null);
    } catch (err: any) {
      setError(err.message || "Logout failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}
