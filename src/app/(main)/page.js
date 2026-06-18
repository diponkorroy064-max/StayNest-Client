import CustomerReviews from "@/components/home/CustomerReviews";
import RecentlyAdded from "@/components/home/RecentlyAddedProperties";
import RentalStatistics from "@/components/home/RentalStatistics";
import TopLocations from "@/components/home/TopLocations";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      
      <RecentlyAdded></RecentlyAdded>
      <WhyChooseUs></WhyChooseUs>
      <CustomerReviews></CustomerReviews>
      <TopLocations></TopLocations>
      <RentalStatistics></RentalStatistics>
    </div>
  );
}
