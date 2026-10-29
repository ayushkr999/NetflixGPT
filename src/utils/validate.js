export const checkValidData = (email, password, isSignUp = false, name = "") => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );

  if (!email || !email.trim()) {
    return "Please enter your email address.";
  }

  if (!isEmailValid) {
    return "Please enter a valid email address.";
  }

  if (!password) {
    return "Please enter your password.";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  if (isSignUp) {
    if (!name || name.trim().length < 2) {
      return "Please enter your full name (at least 2 characters).";
    }
  }

  return null;
};

export const getFirebaseErrorMessage = (error) => {
  if (!error) return "An error occurred. Please try again.";

  const code = error.code || "";
  switch (code) {
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Invalid email or password. Please check your credentials.";
    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in instead.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 6 characters.";
    case "auth/invalid-email":
      return "Please provide a valid email format.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later or reset your password.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    default:
      return error.message || "Authentication failed. Please try again.";
  }
};
