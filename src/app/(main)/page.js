import Banner from "@/components/home/Banner";
import CustomerReviews from "@/components/home/CustomerReviews";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import RecentlyAdded from "@/components/home/RecentlyAddedProperties";
import RentalStatistics from "@/components/home/RentalStatistics";
import TopLocations from "@/components/home/TopLocations";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Banner></Banner>
      <FeaturedProperties></FeaturedProperties>
      <RecentlyAdded></RecentlyAdded>
      <WhyChooseUs></WhyChooseUs>
      <CustomerReviews></CustomerReviews>
      <TopLocations></TopLocations>
      <RentalStatistics></RentalStatistics>
    </div>
  );
}
