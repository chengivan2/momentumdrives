import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import FuturisticHeader from "@/app/rootcomponents/header/FuturisticHeader";
import SignInMain from "./components/SignInMain";
import Footer from "@/app/rootcomponents/footer/Footer";

export const metadata: Metadata = {
  title: "Sign In - Momentum Drives",
  description: "Sign in to manage your Momentum account",
};

export default async function SignInPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <>
      <FuturisticHeader />
      <SignInMain />
      <Footer />
    </>
  );
}
