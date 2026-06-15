import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStats } from "../features/dashboard/dashboardThunk";

const STAT_CARDS = [
  { key: "totalUsers", label: "Total Users", accent: "blue" },
  { key: "totalStores", label: "Total Stores", accent: "blue" },
  { key: "totalRatings", label: "Total Ratings", accent: "blue" },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => { dispatch(getDashboardStats()); }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-sm font-medium">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-6 py-4 text-sm text-rose-400">⚠ {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-8 py-10">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-semibold tracking-tight">Admin Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Platform overview at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STAT_CARDS.map(({ key, label }) => (
          <div key={key} className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</span>
            </div>
            <p className="text-4xl font-bold text-white">{stats?.[key] ?? 0}</p>
            <div className="mt-3 h-px w-full bg-gradient-to-r from-blue-500/40 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;