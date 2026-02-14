// src/components/AccessDenied.js
import { useRouter } from "next/router";
import { Shield } from "lucide-react";

export default function AccessDenied({
  message = "شما اجازه دسترسی به این صفحه را ندارید.",
  redirectTo = "/",
  buttonText = "رفتن به صفحه اصلی",
}) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center max-w-sm">
        <Shield className="mx-auto w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-2">دسترسی محدود</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        <button
          onClick={() => router.push(redirectTo)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
