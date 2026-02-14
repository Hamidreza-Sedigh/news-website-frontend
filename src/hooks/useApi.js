// src/hooks/useApi.js
import { useCallback } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/services/api";

export const useApi = () => {
  const { token, logout } = useAuth();
  const router = useRouter();

  const request = useCallback(async ({ url, method, body, headers }) => {
    if (!token) {
      throw new Error("No token available");
    }

    try {
      return await apiRequest({
        url,
        method,
        body,
        headers: {
          Authorization: `Bearer ${token}`,
          ...headers,
        },
      });
    } catch (error) {
      if (error.status === 401) {
        // 🔐 توکن منقضی شده
        logout();
        router.replace("/login");
      }

      if (error.status === 403) {
        router.replace("/dashboard");
      }

      throw error;
    }
  }, [token, logout, router]);

  return {
    get: (url, headers) => request({ url, method: "GET", headers }),
    post: (url, body, headers) =>
      request({ url, method: "POST", body, headers }),
    put: (url, body, headers) =>
      request({ url, method: "PUT", body, headers }),
    del: (url, headers) =>
      request({ url, method: "DELETE", headers }),
    patch: (url, headers) =>
      request({ url, method: "PATCH", headers }),
  };
};
