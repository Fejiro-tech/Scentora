import AnouncementBar from "../../components/layout/AnouncementBar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 w-full z-50">
        <AnouncementBar
          items={["Free Delivery above ₦80,000", "New Arrivals", "Luxury Perfumes"]}
        />
        <Navbar />
      </header>

      <main className="pt-14 flex-1">{children}</main>

      <Footer />
    </div>
  );
}
