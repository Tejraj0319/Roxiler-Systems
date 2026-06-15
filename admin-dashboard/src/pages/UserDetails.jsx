// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";

// import { getUserById } from "../features/users/userThunk";
// import { clearSelectedUser } from "../features/users/userSlice";

// const UserDetails = () => {
//   const { id } = useParams();

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { selectedUser, loading, error } = useSelector(
//     (state) => state.users
//   );

//   useEffect(() => {
//     dispatch(getUserById(id));

//     return () => {
//       dispatch(clearSelectedUser());
//     };
//   }, [dispatch, id]);

//   if (loading) return <h2>Loading...</h2>;

//   if (error) return <h2>{error}</h2>;

//   return (
//     <div>
//       <h1>User Details</h1>

//       <p>
//         <strong>Name:</strong> {selectedUser?.name}
//       </p>

//       <p>
//         <strong>Email:</strong> {selectedUser?.email}
//       </p>

//       <p>
//         <strong>Address:</strong> {selectedUser?.address}
//       </p>

//       <p>
//         <strong>Role:</strong> {selectedUser?.role}
//       </p>

//       {selectedUser?.role === "STORE_OWNER" && (
//         <p>
//           <strong>Average Rating:</strong>{" "}
//           {selectedUser?.averageRating}
//         </p>
//       )}

//       <button onClick={() => navigate("/users")}>
//         Back
//       </button>
//     </div>
//   );
// };

// export default UserDetails;







import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getUserById } from "../features/users/userThunk";
import { clearSelectedUser } from "../features/users/userSlice";

const ROLE_STYLES = {
  ADMIN: "border-rose-500/20 bg-rose-500/10 text-rose-400",
  STORE_OWNER: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  USER: "border-slate-600/40 bg-slate-700/30 text-slate-400",
};

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedUser, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUserById(id));
    return () => { dispatch(clearSelectedUser()); };
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-sm">Loading user...</span>
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

  const Field = ({ label, value }) => (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-0.5">{label}</p>
      <p className="text-slate-200 text-sm">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 px-8 py-10">
      <button onClick={() => navigate("/users")}
        className="mb-6 flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to Users
      </button>

      <h1 className="text-white text-2xl font-semibold mb-6 tracking-tight">User Details</h1>

      <div className="max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-5">
        {/* Avatar + name */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600/20 border border-blue-500/20 text-base font-semibold text-blue-400">
            {selectedUser?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-white font-semibold text-base">{selectedUser?.name}</p>
            <span className={`mt-1 inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold ${ROLE_STYLES[selectedUser?.role] ?? ROLE_STYLES.USER}`}>
              {selectedUser?.role}
            </span>
          </div>
        </div>

        <Field label="Email" value={selectedUser?.email} />
        <Field label="Address" value={selectedUser?.address} />

        {selectedUser?.role === "STORE_OWNER" && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-0.5">Average Rating</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-white">{selectedUser?.averageRating ?? 0}</span>
              <span className="text-slate-500 text-sm">/ 5</span>
              <span className="text-xl ml-1">⭐</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;