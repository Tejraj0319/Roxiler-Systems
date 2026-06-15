import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../features/auth/authSlice";
import { getStores } from "../features/stores/storeThunk";
import { submitRating, updateRating } from "../features/ratings/ratingThunk";

function RatingBadge({ value }) {
  const color =
    value >= 4
      ? "text-emerald-400 ring-emerald-500/40"
      : value >= 2.5
        ? "text-amber-400 ring-amber-500/40"
        : "text-rose-400 ring-rose-500/40";

  return (
    <span
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full ring-2 font-mono font-bold text-sm ${color} bg-slate-900`}
    >
      {value != null ? Number(value).toFixed(1) : "—"}
    </span>
  );
}

function StarInput({ storeId, value, onChange }) {
  const [hovered, setHovered] = useState(null);
  const current = hovered ?? Number(value) ?? 0;

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onChange(storeId, star)}
          className={`text-xl transition-colors duration-100 ${
            star <= current ? "text-amber-400" : "text-slate-600"
          } hover:scale-110`}
          title={`${star} star${star > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function SortIcon({ field, sortBy, order }) {
  if (sortBy !== field) return <span className="ml-1 text-slate-600">↕</span>;
  return <span className="ml-1 text-blue-400">{order === "asc" ? "↑" : "↓"}</span>;
}

function StoreList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stores, loading, error } = useSelector((state) => state.stores);

  const [ratings, setRatings] = useState({});
  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    dispatch(getStores({ sortBy, order }));
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleChangePassword = () => navigate("/change-password");

  const handleSearch = () => {
    dispatch(getStores({ name: searchName, address: searchAddress, sortBy, order }));
  };

  const handleReset = () => {
    setSearchName("");
    setSearchAddress("");
    setSortBy("name");
    setOrder("asc");
    dispatch(getStores({ sortBy: "name", order: "asc" }));
  };

  const handleRatingChange = (storeId, value) => {
    setRatings((prev) => ({
      ...prev,
      [storeId]: value,
    }));
  };

  const handleSubmitRating = async (storeId) => {
    const rating = Number(ratings[storeId]);
    if (!rating || rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5");
      return;
    }
    const result = await dispatch(submitRating({ storeId, rating }));
    if (!result.error) {
      dispatch(getStores({ name: searchName, address: searchAddress, sortBy, order }));
      setRatings((prev) => ({ ...prev, [storeId]: "" }));
    }
  };

  const handleUpdateRating = async (storeId) => {
    const rating = Number(ratings[storeId]);
    if (!rating || rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5");
      return;
    }
    const result = await dispatch(updateRating({ storeId, rating }));
    if (!result.error) {
      dispatch(getStores({ name: searchName, address: searchAddress, sortBy, order }));
      setRatings((prev) => ({ ...prev, [storeId]: "" }));
    }
  };

  const handleSortClick = (field) => {
    const newOrder = sortBy === field && order === "asc" ? "desc" : "asc";
    setSortBy(field);
    setOrder(newOrder);
    dispatch(
      getStores({
        name: searchName,
        address: searchAddress,
        sortBy: field,
        order: newOrder,
      }),
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* ── Top Nav ── */}
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-bold">
              S
            </span>
            <h1 className="text-lg font-semibold tracking-tight">
              Store <span className="text-blue-400">Dashboard</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleChangePassword}
              className="rounded-md border border-slate-700 bg-slate-800 px-4 py-1.5 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="rounded-md bg-rose-600/20 border border-rose-500/30 px-4 py-1.5 text-sm text-rose-400 transition hover:bg-rose-600/40 hover:text-rose-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* ── Filter Bar ── */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Filter & Sort
          </p>

          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
              <label className="text-xs text-slate-400">Store Name</label>
              <input
                type="text"
                placeholder="Search by name…"
                value={searchName}
                onChange={(e) => {
                  setSearchName(e.target.value);
                  dispatch(getStores({ name: e.target.value, address: searchAddress, sortBy, order }));
                }}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none ring-blue-500 transition focus:border-blue-500 focus:ring-1"
              />
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
              <label className="text-xs text-slate-400">Address</label>
              <input
                type="text"
                placeholder="Search by address…"
                value={searchAddress}
                onChange={(e) => {
                  setSearchAddress(e.target.value);
                  dispatch(getStores({ name: searchName, address: e.target.value, sortBy, order }));
                }}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none ring-blue-500 transition focus:border-blue-500 focus:ring-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none ring-blue-500 transition focus:border-blue-500 focus:ring-1"
              >
                <option value="name">Name</option>
                <option value="address">Address</option>
                <option value="overallRating">Overall Rating</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Order</label>
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none ring-blue-500 transition focus:border-blue-500 focus:ring-1"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="flex gap-2 pb-0.5">
              <button
                onClick={handleSearch}
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-95"
              >
                Search
              </button>
              <button
                onClick={handleReset}
                className="rounded-lg border border-slate-700 bg-slate-800 px-5 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
              >
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* ── Table ── */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-slate-400">
              <svg
                className="mr-3 h-5 w-5 animate-spin text-blue-500"
                viewBox="0 0 24 24"
                fill="none"
              >
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
              Loading stores…
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-24 text-rose-400">⚠ {error}</div>
          ) : stores.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-24 text-slate-500">
              <span className="text-4xl">🏪</span>
              <p className="text-sm">No stores found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60">
                    <th className="px-5 py-3.5 text-left">
                      <button
                        onClick={() => handleSortClick("name")}
                        className="flex items-center text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-white transition"
                      >
                        Store Name
                        <SortIcon field="name" sortBy={sortBy} order={order} />
                      </button>
                    </th>
                    <th className="px-5 py-3.5 text-left">
                      <button
                        onClick={() => handleSortClick("address")}
                        className="flex items-center text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-white transition"
                      >
                        Address
                        <SortIcon field="address" sortBy={sortBy} order={order} />
                      </button>
                    </th>
                    <th className="px-5 py-3.5 text-center">
                      <button
                        onClick={() => handleSortClick("overallRating")}
                        className="mx-auto flex items-center text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-white transition"
                      >
                        Overall
                        <SortIcon field="overallRating" sortBy={sortBy} order={order} />
                      </button>
                    </th>
                    <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
                      Your Rating
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-slate-400">
                      Rate
                    </th>
                    <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {stores.map((store, idx) => (
                    <tr
                      key={store.id}
                      className={`border-b border-slate-800/60 transition-colors duration-100 hover:bg-slate-800/40 ${
                        idx % 2 === 0 ? "bg-transparent" : "bg-slate-900/40"
                      }`}
                    >
                      {/* Store Name */}
                      <td className="px-5 py-4">
                        <span className="font-medium text-white">{store.storeName}</span>
                      </td>

                      {/* Address */}
                      <td className="px-5 py-4 text-slate-400 max-w-[220px]">
                        <span className="line-clamp-2">{store.address}</span>
                      </td>

                      {/* Overall Rating */}
                      <td className="px-5 py-4 text-center">
                        <div className="flex justify-center">
                          <RatingBadge value={store.overallRating} />
                        </div>
                      </td>

                      {/* User Rating */}
                      <td className="px-5 py-4 text-center">
                        {store.userRating != null ? (
                          <span className="inline-block rounded-md bg-blue-600/20 px-2.5 py-0.5 font-mono text-sm font-semibold text-blue-300 ring-1 ring-blue-500/30">
                            {store.userRating}
                          </span>
                        ) : (
                          <span className="text-slate-600 text-xs italic">Not rated</span>
                        )}
                      </td>

                      {/* Star Input */}
                      <td className="px-5 py-4">
                        <StarInput
                          storeId={store.id}
                          value={ratings[store.id] || 0}
                          onChange={handleRatingChange}
                        />
                      </td>

                      {/* Submit / Update */}
                      <td className="px-5 py-4 text-center">
                        {store.userRating === null ? (
                          <button
                            onClick={() => handleSubmitRating(store.id)}
                            disabled={!ratings[store.id]}
                            className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-30 active:scale-95"
                          >
                            Submit
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpdateRating(store.id)}
                            disabled={!ratings[store.id]}
                            className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400 transition hover:bg-amber-500/20 disabled:cursor-not-allowed disabled:opacity-30 active:scale-95"
                          >
                            Update
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer row */}
          {!loading && !error && stores.length > 0 && (
            <div className="border-t border-slate-800 bg-slate-950/40 px-5 py-3 text-xs text-slate-500">
              {stores.length} store{stores.length !== 1 ? "s" : ""} listed
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default StoreList;