import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function Layout({ children }) {
  return (
    <main className="flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <section className="w-full">
        <Navbar />
        <div className="md:px-6 md:pt-8 px-4 pt-6">
          <div className="bg-mintGreen rounded-xl p-6">{children}</div>
        </div>
      </section>
    </main>
  );
}
