import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

/**
 * @param {Object} options
 * @param {Array} options.allowedRoles - نقش‌های مجاز
 * @param {"redirect" | "deny"} options.onRoleFail - رفتار هنگام نقش اشتباه
 * @param {string} options.redirectTo - مسیر redirect
 */
export const useAuthGuard = ({
  allowedRoles = [],
  onRoleFail = "redirect",
  redirectTo = "/dashboard",
} = {}) => {
  const { token, role, isAuthenticated, loading, isLoggingOut } = useAuth();
  const router = useRouter();
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (loading || isLoggingOut) return;

    // ❌ لاگین نیست
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // ❌ نقش اشتباه
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      if (onRoleFail === "deny") {
        setAccessDenied(true);
      } else {
        router.replace(redirectTo);
      }
    }
  }, [
    loading,
    isLoggingOut,
    isAuthenticated,
    role,
    allowedRoles,
    onRoleFail,
    redirectTo,
    router,
  ]);

  return {
    token,
    role,
    loading: loading || isLoggingOut,
    accessDenied,
  };
};
