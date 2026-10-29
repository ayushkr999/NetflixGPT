import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { Navigate } from "react-router-dom";
import { logo } from "../utils/constant";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { uid, email, displayName } = currentUser;
        dispatch(addUser({ uid, email, displayName }));
      } else {
        dispatch(removeUser());
      }
      setAuthChecking(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Auth loading state
  if (authChecking) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
        <img src={logo} alt="Netflix" className="w-40 animate-pulse" />
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm">Authenticating session...</p>
      </div>
    );
  }

  // Not authenticated -> redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Authenticated -> render protected content
  return children;
};

export default ProtectedRoute;

