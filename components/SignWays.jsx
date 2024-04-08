import React from "react";
import { useUserAuth } from "@/utils/auth-context";
import Link from "next/link";

function SignWays() {
  const { user, gitHubSignIn, googleSignIn } = useUserAuth();
  async function handleSignIn() {
    await gitHubSignIn();
  }
  async function handleGoogleSignIn() {
    await googleSignIn();
  }
  return (
    <div>
      <div className="grid grid-cols-1 grid-rows-3">
        <p className="font-extrabold text-2xl my-2">Other ways to sign up</p>
        <div className="grid row-span-2 justify-center">
          <Link href="./">
            <button
              onClick={handleSignIn}
              className="bg-black text-white p-2 px-3 m-5 hover:bg-black/30 hover:text-slate-800"
            >
              GitHub
            </button>
          </Link>
          <Link href="./">
            <button
              onClick={handleGoogleSignIn}
              className="bg-black hover:bg-black/30 hover:text-slate-800 text-white p-2 px-3 m-5"
            >
              Google
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignWays;
