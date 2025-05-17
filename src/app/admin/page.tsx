"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app/firebase";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validasi...
    if (!email.trim()) {
      setError("Email wajib diisi.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9@.]+$/;
    if (!emailRegex.test(email)) {
      setError("Email hanya boleh mengandung huruf, angka, '@', dan '.'");
      return;
    }

    if (!password.trim()) {
      setError("Password wajib diisi.");
      return;
    }

    if (password.length > 16) {
      setError("Password maksimal 16 karakter.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // Simpan token ke cookie
      setCookie("adminAuth", idToken, {
        maxAge: 60 * 60, // 1 hari
      });

      router.push("/admin/dashboard");
    } catch (err: any) {
      setError("Login gagal. Periksa email dan password.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (Maks 16 karakter)"
          className="w-full border p-2 mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
