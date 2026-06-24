import { getPropertiesData } from "@/lib/api/properties";
import PropertyCard from "./PropertyCard";

export default async function FeaturedProperties() {
    const allProperties = await getPropertiesData();
    // console.log("all Pro in featured", allProperties);
    const properties = allProperties.slice(0, 6);
    // console.log("proData in featured", properties);

    return (
        <section className="py-20 bg-base-200">
            <div className="max-w-7xl mx-auto px-5">

                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold">
                        Featured Properties
                    </h2>

                    <p className="text-base-content/70 mt-3 max-w-2xl mx-auto">
                        Explore our hand-picked verified rental properties
                        selected for quality, comfort and affordability.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property) => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>

            </div>
        </section>
    );
}


