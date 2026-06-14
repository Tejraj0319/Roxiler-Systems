import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getOwnerDashboard } from "../features/owner/ownerThunk";
import { clearOwnerError } from "../features/owner/ownerSlice";
import { logout } from "../features/auth/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dashboard, loading, error } = useSelector((state) => state.owner);
  const { user } = useSelector((state) => state.auth);

  const [openStoreId, setOpenStoreId] = useState(null);

  useEffect(() => {
    dispatch(getOwnerDashboard());
    return () => {
      dispatch(clearOwnerError());
    };
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const toggleStore = (id) => {
    setOpenStoreId((prev) => (prev === id ? null : id));
  };

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
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-6 py-4 text-sm text-rose-400">
          ⚠ {error}
        </div>
      </div>
    );
  }

  const stores = Array.isArray(dashboard?.stores)
    ? dashboard.stores
    : dashboard?.storeName
    ? [dashboard]
    : [];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">

      {/* Navbar */}
      <header className="w-full border-b border-slate-800 bg-slate-900">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-base select-none">
              S
            </span>
            <span className="text-white text-xl font-semibold tracking-tight">
              Store <span className="text-blue-400">Dashboard</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end mr-1">
              <span className="text-xs text-slate-500">Signed in as</span>
              <span className="text-sm font-medium text-slate-200">{user?.name}</span>
            </div>
            <button
              onClick={handleChangePassword}
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white active:scale-95"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-400 transition hover:bg-rose-500/20 hover:text-rose-300 active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full px-8 py-8">

        {/* Section heading */}
        <div className="mb-5">
          <h1 className="text-white text-xl font-semibold">Your Stores</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {stores.length} {stores.length === 1 ? "store" : "stores"} — click a store to see its ratings
          </p>
        </div>

        {stores.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900 flex flex-col items-center justify-center py-20 text-center">
            <p className="text-slate-400 text-sm font-medium">No stores found.</p>
            <p className="text-slate-600 text-xs mt-1">Your stores will appear here once added.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {stores.map((store, storeIdx) => {
              const id = store.storeId ?? storeIdx;
              const isOpen = openStoreId === id;
              const ratingCount = store.ratedUsers?.length ?? 0;

              return (
                <div
                  key={id}
                  className={`rounded-xl border bg-slate-900 overflow-hidden transition-colors ${
                    isOpen ? "border-blue-500/40" : "border-slate-800"
                  }`}
                >
                  {/* Accordion trigger */}
                  <button
                    onClick={() => toggleStore(id)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Left — store name */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/20 text-xs font-bold text-blue-400">
                        {storeIdx + 1}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-base leading-tight">{store.storeName}</p>
                        <p className="text-slate-500 text-xs mt-0.5">
                          {ratingCount} {ratingCount === 1 ? "rating" : "ratings"}
                        </p>
                      </div>
                    </div>

                    {/* Right — average rating + chevron */}
                    <div className="flex items-center gap-5 shrink-0">
                      <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Avg Rating</p>
                        <div className="flex items-baseline gap-1.5 justify-end">
                          <span className="text-2xl font-bold text-white">{store.averageRating ?? 0}</span>
                          <span className="text-slate-500 text-sm">/ 5</span>
                          <span className="text-lg ml-1">⭐</span>
                        </div>
                      </div>

                      {/* Chevron */}
                      <svg
                        className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </button>

                  {/* Accordion body */}
                  {isOpen && (
                    <div className="border-t border-slate-800">
                      {ratingCount === 0 ? (
                        <div className="flex items-center justify-center py-10">
                          <p className="text-slate-500 text-sm">No ratings submitted for this store yet.</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-slate-800/40 border-b border-slate-800">
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-500 w-10">#</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-500">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-500">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-500">Rating</th>
                              </tr>
                            </thead>
                            <tbody>
                              {store.ratedUsers.map((ratedUser, idx) => (
                                <tr
                                  key={ratedUser.userId}
                                  className="border-b border-slate-800/50 last:border-b-0 hover:bg-slate-800/30 transition-colors"
                                >
                                  <td className="px-6 py-4 text-slate-600 text-xs">{idx + 1}</td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600/20 border border-blue-500/20 text-xs font-semibold text-blue-400">
                                        {ratedUser.name?.charAt(0).toUpperCase()}
                                      </div>
                                      <span className="text-slate-200 font-medium">{ratedUser.name}</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-slate-400">{ratedUser.email}</td>
                                  <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 rounded-md border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400">
                                      ⭐ {ratedUser.rating}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;