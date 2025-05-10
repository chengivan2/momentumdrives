"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import { FiLogIn, FiUser } from "react-icons/fi";

export default function HeaderAuthButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();
  }, []);

  return user ? (
    <Link
      href="/dashboard"
      className="px-4 flex flex-row gap-[0.8rem] border justify-center items-center py-2 rounded-full text-sm font-medium transition-colors focus:outline-none min-w-full lg:min-w-auto"
    >
      <FiUser size="18" />
      Dashboard
    </Link>
  ) : (
    <Link
      href="/signin"
      className="px-4 flex flex-row gap-[0.8rem] justify-center items-center py-2 rounded-full text-sm font-medium border-none bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 min-w-full lg:min-w-auto"
    >
      <FiLogIn size="18" />
      Login
    </Link>
  );
}
