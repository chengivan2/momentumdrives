import Link from "next/link";
import FooterLogo from "./components/FooterLogo";
import FooterMenu from "./components/FooterMenu";
import Footersocials from "./components/FooterSocials";

export default function Footer() {
  return (
    <footer className="min-w-full bg-lightmode-footer-bg-color pt-20 dark:bg-darkmode-footer-bg-color mt-12">
      <div className="">
        <div className="px-[2rem] grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" aria-label="go home" className="block size-fit">
              <FooterLogo />
            </Link>
          </div>

          <FooterMenu />
        </div>
        <div className="px-[2rem] lg:px-[2rem] mt-12 flex flex-wrap items-end justify-between gap-6 border-t dark:border-t py-6">
          <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
            © {new Date().getFullYear()} Momentum Drives
          </span>

          <Footersocials />
        </div>
      </div>
    </footer>
  );
}
