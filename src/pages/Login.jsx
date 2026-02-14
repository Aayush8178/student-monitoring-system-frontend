import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/api/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      navigate(res.data.role === "admin" ? "/" : "/student");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 sm:px-6 lg:px-8">

      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">

        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-wide">
            Student Monitoring System
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Academic Performance & Risk Tracking Portal
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="bg-white/95 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl space-y-5 sm:space-y-6"
        >
          <h2 className="text-lg sm:text-xl font-medium text-center text-slate-700">
            Sign In
          </h2>

          {error && (
            <div className="bg-red-100 text-red-600 text-xs sm:text-sm p-2 rounded-md text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 transition text-sm sm:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 transition text-sm sm:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-medium hover:bg-slate-800 transition disabled:opacity-60 flex justify-center items-center gap-2 text-sm sm:text-base"
          >
            {loading ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Signing in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-slate-500 mt-6">
          © {new Date().getFullYear()} Student Monitoring System
        </p>
      </div>
    </div>
  );
}
