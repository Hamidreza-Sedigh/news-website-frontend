// hooks/useAuthRedirect.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

/**
 * هوک برای محافظت صفحات و ریدایرکت امن
 * @param {Array<string>} allowedRoles - آرایه‌ای از نقش‌های مجاز (مثلاً ["admin"])
 * @param {string} redirectTo - مسیر ریدایرکت اگر دسترسی نداشت
 */
export const useAuthRedirect = (allowedRoles = [], redirectTo = "/login") => {
  const router = useRouter();
  const { isAuthenticated, loading, role, isLoggingOut } = useAuth();

  useEffect(() => {
    if (loading) return; // هنوز auth init نشده

    // اگر کاربر لاگین نکرده
    if (!isAuthenticated && !isLoggingOut) {
      router.replace(redirectTo);
      return;
    }

    // اگر نقش محدود شده و کاربر نقش مجاز ندارد
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      router.replace("/"); // می‌تونی مسیر دلخواه برای "access denied" بدی
    }
  }, [loading, isAuthenticated, role, isLoggingOut, allowedRoles, router]);
};
