"use client";

import Link from "next/link";

export default function Menu() {
  return (
    <div className="text-[0.85rem] lg:flex space-y-3 lg:space-y-0 lg:space-x-8 flex-col lg:flex-row">
      <Link
        href="/"
      >
        Home
      </Link>
      <Link
        href="/"
      >
        All Cars
      </Link>
      <Link
        href="/"
      >
        Car Brands
      </Link>
      <Link
        href="/"
        
      >
        About
      </Link>
      <Link
        href="/"
      >
        Contact
      </Link>
    </div>
  );
}
