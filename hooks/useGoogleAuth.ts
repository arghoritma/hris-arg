import { useState } from "react";
import { auth } from "@/services/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { googleSignin } from "@/actions/auth";
import { GoogleSigninPayload } from "@/types";

export function useGoogleAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);

  const googleLogin = async () => {
    setLoading(true);
    const avatarUrl = "https://ui-avatars.com/api/?name=";
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const payload = {
        email: user.email,
        name: user.displayName,
        uid: user.uid,
        Avatar: user.photoURL || `${avatarUrl}${user.displayName}`,
      };

      const actionLogin = await googleSignin(payload as GoogleSigninPayload);

      if (actionLogin.success) {
        setSuccess(true);
      } else {
        setError(actionLogin.errors?._form || ["An unknown error occurred"]);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError([error.message]);
      } else {
        setError(["An unknown error occurred"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, googleLogin };
}
