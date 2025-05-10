"use client";

import Image from "next/image";

export default function FooterLogo() {
  return (
    <div className="flex justify-between items-center">
      <Image
        width={100}
        height={50}
        alt="Momentum Drives footer logo"
        src="/logos/mdrives-lm-logo.png"
        className="flex duration-300 dark:hidden"
      />

      <Image
        width={100}
        height={50}
        alt="Momentum Drives footer logo"
        src="/logos/mdrives-dm-logo.png"
        className="hidden duration-300 dark:flex"
      />
    </div>
  );
}
