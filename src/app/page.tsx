import Footer from "./rootcomponents/footer/Footer";
import Header from "./rootcomponents/header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Momentum Drives</h1>
        <p className="mt-4 text-lg">Your next vehicle is here.</p>
      </main>
      <Footer />
    </>
  );
}
