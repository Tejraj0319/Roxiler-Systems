import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../features/auth/authThunk";
import { clearError } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  useEffect(() => {
    if (isAuthenticated && user?.role === "STORE_OWNER") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginUser({
        email,
        password,
      }),
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-base">
            S
          </span>
          <span className="text-white text-xl font-semibold tracking-tight">
            Store <span className="text-blue-400">Dashboard</span>
          </span>
        </div>

        {/* Card */}
        <div className="relative rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/40 overflow-hidden">
          {/* Gradient top border */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80" />

          <div className="px-8 py-8">
            <h1 className="text-2xl font-bold text-white mb-1">Store Owner Login</h1>
            <p className="text-sm text-slate-400 mb-7">Sign in to manage your store.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter Password..."
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* API error */}
              {error && (
                <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
                  ⚠ {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Logging in…
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
