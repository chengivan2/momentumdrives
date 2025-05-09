import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link href="/">
      <div className="flex justify-between items-center">
        <Image
          width={100}
          height={50}
          alt="OnPoint header logo"
          src="/logo/momentumlogo.png"
          className="flex"
        />
      </div>
    </Link>
  );
}
