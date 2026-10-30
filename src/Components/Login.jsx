import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import { checkValidData, getFirebaseErrorMessage } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  // If already authenticated, redirect to /browse
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      }
    });

    return () => unsubscribe();
  }, [navigate, dispatch]);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const handleAuthSubmit = async (e) => {
    if (e) e.preventDefault();

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const name = nameRef.current?.value || "";

    const validationError = checkValidData(email, password, !isSignInForm, name);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      if (!isSignInForm) {
        // Sign Up Flow
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name,
        });

        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: name,
          })
        );
        navigate("/browse");
      } else {
        // Sign In Flow
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
        navigate("/browse");
      }
    } catch (error) {
      console.error("Auth error:", error);
      setErrorMessage(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "url('https://assets.nflxext.com/ffe/siteui/vlv3/cc73e7c7-7860-4ef4-8fc8-1baf24569d2f/web/IN-en-20260126-TRIFECTA-perspective_90d714e8-acc9-4253-ab46-ca6b349c1989_large.jpg')",
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Header */}
      <Header />

      {/* Content Form Card */}
      <div className="relative z-10 w-full max-w-md pt-16">
        <form
          onSubmit={handleAuthSubmit}
          className="w-full bg-black/75 backdrop-blur-md p-8 md:p-10 rounded-xl text-white space-y-5 border border-white/10 shadow-2xl"
        >
          <h2 className="text-3xl font-extrabold tracking-tight">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h2>

          {!isSignInForm && (
            <div>
              <input
                ref={nameRef}
                type="text"
                placeholder="Full Name"
                disabled={loading}
                className="w-full px-4 py-3.5 rounded-lg bg-zinc-800/90 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
              />
            </div>
          )}

          <div>
            <input
              ref={emailRef}
              type="email"
              placeholder="Email Address"
              disabled={loading}
              className="w-full px-4 py-3.5 rounded-lg bg-zinc-800/90 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            />
          </div>

          <div>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password (min 6 characters)"
              disabled={loading}
              className="w-full px-4 py-3.5 rounded-lg bg-zinc-800/90 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            />
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-950/70 border border-red-800 text-red-200 text-xs sm:text-sm rounded-lg flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 active:scale-95 transition py-3.5 rounded-lg font-bold text-base shadow-lg shadow-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>{isSignInForm ? "Signing in..." : "Creating account..."}</span>
              </>
            ) : (
              <span>{isSignInForm ? "Sign In" : "Sign Up"}</span>
            )}
          </button>

          <div className="pt-2 text-sm text-gray-400 flex items-center justify-between">
            <span>
              {isSignInForm ? "New to NetflixGPT?" : "Already have an account?"}
            </span>
            <button
              type="button"
              onClick={toggleSignInForm}
              className="text-white font-semibold hover:underline cursor-pointer"
            >
              {isSignInForm ? "Sign up now" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
