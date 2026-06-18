import PropertyCard from "./PropertyCard";

const featuredPropertiesData = [
    {
        _id: "1",
        title: "Modern Family Apartment",
        image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        location: "Dhanmondi, Dhaka",
        category: "Apartment",
        rent: 25000,
        bedrooms: 3,
        bathrooms: 2,
        size: 1450,
        status: "approved",
    },
    {
        _id: "2",
        title: "Luxury City Villa",
        image:
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
        location: "Gulshan, Dhaka",
        category: "Villa",
        rent: 65000,
        bedrooms: 5,
        bathrooms: 4,
        size: 3200,
        status: "approved",
    },
    {
        _id: "3",
        title: "Cozy Studio Apartment",
        image:
            "https://images.unsplash.com/photo-1494526585095-c41746248156",
        location: "Uttara, Dhaka",
        category: "Studio",
        rent: 15000,
        bedrooms: 1,
        bathrooms: 1,
        size: 650,
        status: "approved",
    },
    {
        _id: "4",
        title: "Premium Duplex House",
        image:
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
        location: "Banani, Dhaka",
        category: "Duplex",
        rent: 55000,
        bedrooms: 4,
        bathrooms: 3,
        size: 2800,
        status: "approved",
    },
    {
        _id: "5",
        title: "Elegant Office Space",
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
        location: "Motijheel, Dhaka",
        category: "Office",
        rent: 40000,
        bedrooms: 0,
        bathrooms: 2,
        size: 1800,
        status: "approved",
    },
    {
        _id: "6",
        title: "Lake View Apartment",
        image:
            "https://images.unsplash.com/photo-1484154218962-a197022b5858",
        location: "Bashundhara, Dhaka",
        category: "Apartment",
        rent: 30000,
        bedrooms: 3,
        bathrooms: 2,
        size: 1650,
        status: "approved",
    },
];


// async function getFeaturedProperties() {
//     const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/properties/featured`,
//         {
//             cache: "no-store",
//         }
//     );

//     if (!res.ok) {
//         throw new Error("Failed to fetch properties");
//     }

//     return res.json();
// }

export default async function FeaturedProperties() {
    // const properties = await getFeaturedProperties();
    const properties = featuredPropertiesData;

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
                        <PropertyCard
                            key={property._id}
                            property={property}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}


