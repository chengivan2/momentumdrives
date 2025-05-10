import Link from "next/link";

export default function CTAOne() {
  return (
    <Link
      href="/"
      className="min-w-full lg:min-w-auto flex flex-row justify-center items-center px-4 py-2 rounded-full text-sm font-medium
                     transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100"
    >
      Make your own trip
    </Link>
  );
}
