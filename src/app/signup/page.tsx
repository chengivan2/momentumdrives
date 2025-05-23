import { Metadata } from "next";
import SignUpMain from "./components/SignUpMain";
import Footer from "@/app/rootcomponents/footer/Footer";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FuturisticHeader from "@/app/rootcomponents/header/FuturisticHeader";

export const metadata: Metadata = {
  title: "Sign Up - Momentum Drives",
  description: "Sign up to get great deals on Momentum Drives",
};

export default async function SignUpPage() {
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
      <SignUpMain />
      <Footer />
    </>
  );
}
