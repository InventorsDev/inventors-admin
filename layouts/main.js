import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function Layout({ children, title, showBackButton = false }) {
  return (
    <main className="flex">
      <div className="hidden md:block ">
        <Sidebar />
      </div>
      <section className="w-full">
        <Navbar title={title} showBackButton={showBackButton} />
        <div className="md:px-6 md:pt-8 px-4 py-6">
          <div className=" rounded-xl p-6">{children}</div>
        </div>
      </section>
    </main>
  );
}
