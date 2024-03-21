import Header from "@/components/global/header";
import Footer from "@/components/global/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg bg-white">
      <div><Header /></div>
      <div className="h-96"></div>
      <div><Footer /></div>
    </main>
  );
}
