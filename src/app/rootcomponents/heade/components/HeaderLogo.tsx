import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link href="/">
      <div className="flex justify-between items-center">
        <Image
          width={100}
          height={50}
          alt="Momentum Drives header logo"
          src="/logos/mdrives-lm-logo.png"
          className="flex duration-300 dark:hidden"
        />

        <Image
          width={100}
          height={50}
          alt="Momentum Drives header logo"
          src="/logos/mdrives-dm-logo.png"
          className="hidden duration-300 dark:flex"
        />
      </div>
    </Link>
  );
}
