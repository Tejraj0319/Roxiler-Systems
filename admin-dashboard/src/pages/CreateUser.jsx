import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createUser } from "../features/users/userThunk";
import { resetCreateSuccess, clearUserError } from "../features/users/userSlice";
import { validateUserForm } from "../utils/validation";

const ROLES = ["USER", "STORE_OWNER", "ADMIN"];

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, createSuccess } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({ name: "", email: "", password: "", address: "", role: "USER" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (createSuccess) { dispatch(resetCreateSuccess()); navigate("/users"); }
    return () => { dispatch(clearUserError()); };
  }, [createSuccess, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateUserForm(formData);
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setErrors({});
    dispatch(createUser(formData));
  };

  const inputClass =
    "w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-base select-none">
              U
            </span>
            <div>
              <h1 className="text-white text-xl font-semibold tracking-tight">Create User</h1>
              <p className="text-slate-500 text-xs mt-0.5">Add a new user to the platform</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Full Name", name: "name", type: "text", placeholder: "John Doe" },
              { label: "Email", name: "email", type: "email", placeholder: "john@example.com" },
              { label: "Password", name: "password", type: "password", placeholder: "Enter Password..." },
              { label: "Address", name: "address", type: "text", placeholder: "123 Main St, City" },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
                <input name={name} type={type} placeholder={placeholder} value={formData[name]} onChange={handleChange} className={inputClass} />
                {errors[name] && <p className="mt-1.5 text-xs text-rose-400">{errors[name]}</p>}
              </div>
            ))}

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Role</label>
              <select name="role" value={formData.role} onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-200 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

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
              ) : "Create User"}
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

export default CreateUser;