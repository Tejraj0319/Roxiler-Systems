import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../features/users/userThunk";
import { createStore } from "../features/stores/storeThunk";
import { resetCreateSuccess, clearStoreError } from "../features/stores/storeSlice";
import { validateStoreForm } from "../utils/validation";

const CreateStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.users);
  const { loading, error, createSuccess } = useSelector((state) => state.stores);

  const [formData, setFormData] = useState({ name: "", email: "", address: "", ownerId: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getUsers({ role: "STORE_OWNER" }));
  }, [dispatch]);

  useEffect(() => {
    if (createSuccess) {
      dispatch(resetCreateSuccess());
      navigate("/stores");
    }
    return () => { dispatch(clearStoreError()); };
  }, [createSuccess, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateStoreForm(formData);
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setErrors({});
    dispatch(createStore({ ...formData, ownerId: Number(formData.ownerId) }));
  };

  const inputClass =
    "w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          {/* Header */}
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-base select-none">
              S
            </span>
            <div>
              <h1 className="text-white text-xl font-semibold tracking-tight">Create Store</h1>
              <p className="text-slate-500 text-xs mt-0.5">Add a new store to the platform</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Store Name */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Store Name</label>
              <input type="text" name="name" placeholder="e.g. Downtown Branch" value={formData.name} onChange={handleChange} className={inputClass} />
              {errors.name && <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Store Email</label>
              <input type="email" name="email" placeholder="store@example.com" value={formData.email} onChange={handleChange} className={inputClass} />
              {errors.email && <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Address</label>
              <input type="text" name="address" placeholder="123 Main St, City" value={formData.address} onChange={handleChange} className={inputClass} />
              {errors.address && <p className="mt-1.5 text-xs text-rose-400">{errors.address}</p>}
            </div>

            {/* Owner */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Store Owner</label>
              <select name="ownerId" value={formData.ownerId} onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-200 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">Select Store Owner</option>
                {users.map((owner) => (
                  <option key={owner.id} value={owner.id}>{owner.name}</option>
                ))}
              </select>
              {errors.ownerId && <p className="mt-1.5 text-xs text-rose-400">{errors.ownerId}</p>}
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating...
                </span>
              ) : "Create Store"}
            </button>
          </form>

          {error && (
            <div className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-400">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateStore;