import PageHero from "@/components/PageHero";
import BlogScene from "@/components/3d/BlogScene";
import FeaturedArticle from "@/components/blog/FeaturedArticle";
import ArticleGrid from "@/components/blog/ArticleGrid";
import CTASection from "@/components/CTASection";
import PremiumFooter from "@/components/PremiumFooter";
import Navbar from "@/components/Navbar";


export const metadata = {
    title: "Blog & Insights | Software Engineering, AI & Digital Innovation",
    description:
        "Explore expert insights on software engineering, AI, cloud architecture, UI/UX, digital transformation, and enterprise technology.",
};

export default function BlogPage() {
    return (
        <main className="relative relative min-h-screen overflow-x-hidden antialiased ">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full" />
            </div>

            <Navbar />
            <PageHero
                badge="Editorial"
                title="Insights &"
                highlight="Perspectives"
                description="Explore deep technical deep-dives, industry trends, and thoughts on the future of enterprise software and design."
            >
                <BlogScene />
            </PageHero>

            <FeaturedArticle />
            <ArticleGrid />

            <CTASection
                title="Never Miss an Update"
                description="Subscribe to our engineering newsletter to get the latest architectural breakdowns and case studies delivered to your inbox."
                primaryBtnText="Subscribe Now"
                secondaryBtnText="Follow on Twitter"
            />
            <PremiumFooter />
        </main>
    );
}
