import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import WhyChooseUs from "@/components/about/WhyChooseUs";
// import Achievements from "@/components/about/Achievements";
import TeamSection from "@/components/about/TeamSection";
import AboutCTA from "@/components/about/AboutCTA";
// import HowItWorks from "@/components/about/HowItWorks";


export default function AboutPage() {
    return (
        <div className="container mx-auto">
            <AboutHero />
            <OurStory />
            <MissionVision />
            <WhyChooseUs />
            {/* <Achievements /> */}
            <TeamSection />
            {/* <HowItWorks /> */}
            {/* <CTASection /> */}
            <AboutCTA></AboutCTA>
       </div>
    );
}

