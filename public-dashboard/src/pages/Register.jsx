// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import { registerUser } from "../features/auth/authThunk";
// import { clearError, resetRegisterSuccess } from "../features/auth/authSlice";

// function Register() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error, registerSuccess } = useSelector((state) => state.auth);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     dispatch(registerUser(data));
//   };

//   useEffect(() => {
//     if (registerSuccess) {
//       navigate("/");

//       dispatch(resetRegisterSuccess());
//     }
//   }, [registerSuccess, navigate, dispatch]);

//   useEffect(() => {
//     return () => {
//       dispatch(clearError());
//     };
//   }, [dispatch]);

//   return (
//     <div>
//       <h1>Register</h1>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* Name */}
//         <div>
//           <label>Name</label>
//           <br />

//           <input
//             type="text"
//             {...register("name", {
//               required: "Name is required",
//               minLength: {
//                 value: 20,
//                 message: "Minimum 20 characters required",
//               },
//               maxLength: {
//                 value: 60,
//                 message: "Maximum 60 characters allowed",
//               },
//             })}
//           />

//           {errors.name && <p>{errors.name.message}</p>}
//         </div>

//         <br />

//         {/* Email */}

//         <div>
//           <label>Email</label>
//           <br />

//           <input
//             type="email"
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                 message: "Enter a valid email",
//               },
//             })}
//           />

//           {errors.email && <p>{errors.email.message}</p>}
//         </div>

//         <br />

//         {/* Address */}

//         <div>
//           <label>Address</label>
//           <br />

//           <textarea
//             {...register("address", {
//               required: "Address is required",
//               maxLength: {
//                 value: 400,
//                 message: "Maximum 400 characters allowed",
//               },
//             })}
//           />

//           {errors.address && <p>{errors.address.message}</p>}
//         </div>

//         <br />

//         {/* Password */}

//         <div>
//           <label>Password</label>
//           <br />

//           <input
//             type="password"
//             {...register("password", {
//               required: "Password is required",
//               pattern: {
//                 value: /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/,
//                 message: "8-16 chars, 1 uppercase, 1 special character required",
//               },
//             })}
//           />

//           {errors.password && <p>{errors.password.message}</p>}
//         </div>

//         <br />

//         <button type="submit" disabled={loading}>
//           {loading ? "Registering..." : "Register"}
//         </button>

//         {error && (
//           <>
//             <br />
//             <p>{error}</p>
//           </>
//         )}
//       </form>

//       <br />

//       <p>
//         Already have an account? <Link to="/">Login</Link>
//       </p>
//     </div>
//   );
// }

// export default Register;
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../features/auth/authThunk";
import { clearError, resetRegisterSuccess } from "../features/auth/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, registerSuccess } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (registerSuccess) {
      navigate("/");
      dispatch(resetRegisterSuccess());
    }
  }, [registerSuccess, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

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
          {/* Signature: animated gradient top border */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80" />

          <div className="px-8 py-8">
            <h1 className="text-2xl font-bold text-white mb-1">Create account</h1>
            <p className="text-sm text-slate-400 mb-7">Fill in the details below to get started.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alexandra Johnson"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 20, message: "Minimum 20 characters required" },
                    maxLength: { value: 60, message: "Maximum 60 characters allowed" },
                  })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-xs text-rose-400 flex items-center gap-1">
                    <span>⚠</span> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-xs text-rose-400 flex items-center gap-1">
                    <span>⚠</span> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Address
                </label>
                <textarea
                  placeholder="Enter your full address…"
                  rows={3}
                  {...register("address", {
                    required: "Address is required",
                    maxLength: { value: 400, message: "Maximum 400 characters allowed" },
                  })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none resize-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                {errors.address && (
                  <p className="text-xs text-rose-400 flex items-center gap-1">
                    <span>⚠</span> {errors.address.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="8–16 chars, 1 uppercase, 1 special"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/,
                      message: "8-16 chars, 1 uppercase, 1 special character required",
                    },
                  })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                {errors.password && (
                  <p className="text-xs text-rose-400 flex items-center gap-1">
                    <span>⚠</span> {errors.password.message}
                  </p>
                )}
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
                    Registering…
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link to="/" className="text-blue-400 font-medium hover:text-blue-300 transition">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;