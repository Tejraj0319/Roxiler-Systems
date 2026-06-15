import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../features/auth/authThunk";
import { clearError } from "../features/auth/authSlice";

const DEMO = { email: "admin@test.com", password: "Password@1" };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
    return () => { dispatch(clearError()); };
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); dispatch(loginUser(formData)); };
  const fillDemo = () => setFormData(DEMO);

  const inputClass =
    "w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-lg select-none">S</span>
            <span className="text-white text-xl font-semibold tracking-tight">Store <span className="text-blue-400">Admin</span></span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <h1 className="text-white text-lg font-semibold mb-1">Sign in</h1>
          <p className="text-slate-500 text-sm mb-6">Welcome back — enter your credentials</p>

          {/* Demo credentials banner */}
          <div className="mb-5 rounded-lg border border-blue-500/25 bg-blue-500/10 px-4 py-3">
            <p className="text-xs font-medium text-blue-400 mb-2">Demo credentials</p>
            <div className="space-y-1 text-xs text-slate-400 font-mono">
              <div className="flex justify-between items-center">
                <span><span className="text-slate-500">Email</span>    {DEMO.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span><span className="text-slate-500">Pass </span>    {DEMO.password}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={fillDemo}
              className="mt-3 w-full rounded-md border border-blue-500/30 bg-blue-500/15 px-3 py-1.5 text-xs font-medium text-blue-400 transition hover:bg-blue-500/25 active:scale-95"
            >
              Fill credentials
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
              <input type="email" name="email" placeholder="admin@example.com" value={formData.email} onChange={handleChange} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
              <input type="password" name="password" placeholder="Enter Password..." value={formData.password} onChange={handleChange} className={inputClass} />
            </div>

            <button type="submit" disabled={loading}
              className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in...
                </span>
              ) : "Sign in"}
            </button>
          </form>

          {error && (
            <div className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-400">
              ⚠ {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;