import CinematicEvents from "@/components/events/CinematicEvents";
import Navbar from "@/components/Navbar";
import PremiumFooter from "@/components/PremiumFooter";

export const metadata = {
  title: "Events & Culture | RecentureSoft",
  description: "Experience the passion, innovation, and global collaboration that drives our engineering teams.",
};

export default function EventsPage() {
    return (
        <main className="bg-slate-50 dark:bg-[#020617] transition-colors duration-300 min-h-screen">
            <Navbar />
            <CinematicEvents />
            <PremiumFooter />
        </main>
    );
}
