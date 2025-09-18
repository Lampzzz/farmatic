export function getFirebaseErrorMessage(error: any): string {
  if (!error?.code) return "An unexpected error occurred";

  switch (error.code) {
    case "auth/email-already-in-use":
      return "Email is already in use";
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/user-disabled":
      return "This account has been disabled";
    case "auth/user-not-found":
      return "No account found with this email";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/weak-password":
      return "Password should be at least 6 characters";
    case "auth/missing-password":
      return "Password is required";
    case "auth/network-request-failed":
      return "Network error, please try again";
    default:
      return error.message || "An unknown error occurred";
  }
}
