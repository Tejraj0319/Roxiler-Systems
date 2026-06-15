// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import { changePassword } from "../features/auth/authThunk";
// import { clearError, resetPasswordChangeSuccess } from "../features/auth/authSlice";

// function ChangePassword() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error, passwordChangeSuccess } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   useEffect(() => {
//     if (passwordChangeSuccess) {
//       alert("Password updated successfully!");
//       dispatch(resetPasswordChangeSuccess());
//       navigate("/stores");
//     }
//   }, [passwordChangeSuccess, dispatch, navigate]);

//   useEffect(() => {
//     return () => {
//       dispatch(clearError());
//       dispatch(resetPasswordChangeSuccess());
//     };
//   }, [dispatch]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.newPassword !== formData.confirmPassword) {
//       alert("New Password and Confirm Password do not match.");
//       return;
//     }

//     dispatch(
//       changePassword({
//         oldPassword: formData.oldPassword,
//         newPassword: formData.newPassword,
//       }),
//     );
//   };

//   return (
//     <div>
//       <h1>Change Password</h1>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Old Password</label>
//           <br />
//           <input
//             type="password"
//             name="oldPassword"
//             value={formData.oldPassword}
//             onChange={handleChange}
//           />
//         </div>

//         <br />

//         <div>
//           <label>New Password</label>
//           <br />
//           <input
//             type="password"
//             name="newPassword"
//             value={formData.newPassword}
//             onChange={handleChange}
//           />
//         </div>

//         <br />

//         <div>
//           <label>Confirm Password</label>
//           <br />
//           <input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//           />
//         </div>

//         <br />

//         <button type="submit" disabled={loading}>
//           {loading ? "Updating..." : "Update Password"}
//         </button>
//       </form>

//       {error && <p>{error}</p>}
//     </div>
//   );
// }

// export default ChangePassword;



import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../features/auth/authThunk";
import { clearError, resetPasswordChangeSuccess } from "../features/auth/authSlice";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, passwordChangeSuccess } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (passwordChangeSuccess) {
      alert("Password updated successfully!");
      dispatch(resetPasswordChangeSuccess());
      navigate("/stores");
    }
  }, [passwordChangeSuccess, dispatch, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(resetPasswordChangeSuccess());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New Password and Confirm Password do not match.");
      return;
    }

    dispatch(
      changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      })
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
          {/* Signature: gradient top border */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80" />

          <div className="px-8 py-8">
            {/* Back link */}
            <button
              type="button"
              onClick={() => navigate("/stores")}
              className="mb-5 flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to stores
            </button>

            <h1 className="text-2xl font-bold text-white mb-1">Change password</h1>
            <p className="text-sm text-slate-400 mb-7">Update your account password below.</p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Old Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Current Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  placeholder="Enter Password..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Divider */}
              <div className="border-t border-slate-800" />

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter Password..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Enter Password..."
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
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Updating…
                  </span>
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
