"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { FaGoogle, FaXTwitter } from "react-icons/fa6";
import HeaderLogo from "@/app/rootcomponents/header/components/HeaderLogo";

export default function SignUpMain() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        // Redirect to the welcome page after successful sign-up
        router.push("/welcome");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="flex flex-col lg:flex-row min-h-screen mt-16">
        <div className="hidden lg:flex relative min-h-full bg-center bg-cover bg-[url(/images/signup.jpg)] flex-1/2">
          <div className="absolute inset-0 bg-darkmode-bg-color opacity-10 dark:opacity-20"></div>
        </div>

        <div className="bg-center bg-cover bg-[url(/images/signin.jpg)] md:bg-none relative min-h-full flex flex-row justify-center items-center flex-1/2">
          <form
            onSubmit={handleSignUp}
            className="backdrop-blur-lg bg-lightmode-auth-bg-color/80 md:bg-lightmode-auth-bg-color dark:bg-darkmode-auth-bg-color/80 dark:md:bg-darkmode-auth-bg-color m-auto h-fit w-full max-w-sm rounded-[0.8rem] p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
          >
            <div className="p-8 pb-6">
              <div>
                <HeaderLogo />
                <h1 className="text-title mb-1 mt-4 text-xl font-semibold">
                  Create a Momentum Drives Account
                </h1>
                <p className="text-sm">
                  Welcome! Create an account to get exclusive deals & offers.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  type="button"
                  className="rounded-full cursor-pointer bg-lightmode-btn-bg-color dark:bg-darkmode-bg-color hover:bg-lightmode-btn-bg-hover-color hover:dark:bg-darkmode-btn-bg-hover-color"
                >
                  <FaGoogle className="text-lightmode-btn-text-color dark:text-darkmode-btn-text-color" />
                  <span className="text-lightmode-btn-text-color dark:text-darkmode-btn-text-color">
                    Sign up with Google
                  </span>
                </Button>

                <Button
                  type="button"
                  className="rounded-full cursor-pointer bg-lightmode-btn-bg-color dark:bg-darkmode-bg-color hover:bg-lightmode-btn-bg-hover-color hover:dark:bg-darkmode-btn-bg-hover-color"
                >
                  <FaXTwitter className="text-lightmode-btn-text-color dark:text-darkmode-btn-text-color" />
                  <span className="text-lightmode-btn-text-color dark:text-darkmode-btn-text-color">
                    Microsoft
                  </span>
                </Button>
              </div>

              <div className="flex items-center my-8">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                <span className="mx-4 text-lightmode-text-color dark:text-darkmode-text-color text-sm">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="block text-sm">
                    Full name
                  </Label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    id="fullname"
                    className="border border-green-300 dark:border-green-700 rounded-md p-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="block text-sm">
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    id="email"
                    className="border border-green-300 dark:border-green-700 rounded-md p-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pwd" className="text-title text-sm">
                    Password
                  </Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    id="pwd"
                    className="border border-green-300 dark:border-green-700 rounded-md p-2"
                  />
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer bg-lightmode-btn-bg-color dark:bg-darkmode-bg-color hover:bg-lightmode-btn-bg-hover-color hover:dark:bg-darkmode-btn-bg-hover-color"
                >
                  <span>{loading ? "Signing you up..." : "Continue"}</span>
                </Button>
              </div>
            </div>

            <div className="bg-muted p-3">
              <p className="text-accent-foreground text-center text-sm">
                Have an account?
                <Button asChild variant="link" className="px-2">
                  <Link href="/signin">Sign In</Link>
                </Button>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
