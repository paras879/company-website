import PageHero from "@/components/PageHero";
import NewsScene from "@/components/3d/NewsScene";
import NewsList from "@/components/news/NewsList";
import CTASection from "@/components/CTASection";
import PremiumFooter from "@/components/PremiumFooter";
import Navbar from "@/components/Navbar";


export const metadata = {
    title: "News & Announcements | RecentureSoft",
    description: "Stay updated with company milestones, product launches, and press releases.",
};

export default function NewsPage() {
    return (
        <main className="bg-slate-50 dark:bg-[#020617] transition-colors duration-300 min-h-screen">
            <Navbar />
            <PageHero
                badge="Press Room"
                title="Company"
                highlight="News"
                description="The latest updates, press releases, and milestones from our global engineering teams."
            >
                <NewsScene />
            </PageHero>

            <div className="relative -mt-6 md:-mt-4">
                <NewsList />
            </div>

            <div className="relative -mt-6 md:-mt-6">
                <CTASection
                    title="Media Inquiries"
                    description="Are you a journalist or analyst? Get in touch with our PR team for press kits, interviews, and official comments."
                    primaryBtnText="Contact PR Team"
                    secondaryBtnText="Download Press Kit"
                />
            </div>
            <PremiumFooter />
        </main>
    );
}
