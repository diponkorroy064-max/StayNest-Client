"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heart, MapPin, BedDouble, Bath, Maximize, MessageSquare } from "lucide-react";
import { toast } from "react-toastify";
import ReviewCard from "@/components/propertyDetails/ReviewCard";
import ReviewForm from "@/components/propertyDetails/ReviewForm";
import BookingModal from "@/components/propertyDetails/BookingModal";
import { getPropertyId } from "@/lib/api/properties";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { addFavouriteProperty } from "@/lib/api/favourites";
import { saveBookingInfo } from "@/lib/api/booking";


export default function PropertyDetailsPrivatePage() {
    const { propertyId } = useParams();
    // console.log("propertyId", propertyId);

    const router = useRouter();
    const session = useSession();
    const currentUser = session?.data?.user;
    // console.log("currentUser", currentUser);

    const [property, setProperty] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isBookModalOpen, setIsBookModalOpen] = useState(false);
    const [processingBooking, setProcessingBooking] = useState(false);

    useEffect(() => {
        if (!propertyId) return;
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const propertyData = await getPropertyId(propertyId);
                // const reviewsData = await getPropertyReviews(propertyId);
                setProperty(propertyData);
                // setReviews(reviewsData || []);
            } catch (err) {
                toast.error("Error matching file properties context configuration.");
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [propertyId]);


    const handleFavoriteRegistration = async (property) => {
        const submitFavInfo = {
            ...property,
            propertyId,
            currentUserEmail: currentUser?.email
        }
        console.log(submitFavInfo);

        try {
            const res = await addFavouriteProperty(submitFavInfo);
            if (res.error || res.message) {
                toast.info(res.message || res.error);
            } else {
                toast.success("Successfully added into your favorite list");
            }
        } 
        catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    };


    const handleBookingConfirmation = async (bookingDetails) => {
        // console.log('bookingDetails', bookingDetails);

        try {
            setProcessingBooking(true);
            const structuralRecord = {
                propertyId,
                title: property.title,
                rentAmount: property.rentAmount,
                tenantName: currentUser.name,
                tenantEmail: currentUser.email,
                ...bookingDetails,
                transactionId: "MOCK_TXN_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
                paymentStatus: "Paid"
            };
            // console.log("structuralRecord", structuralRecord);

            await saveBookingInfo(structuralRecord);
            setIsBookModalOpen(false);
            toast.success("Lease secured perfectly!");
            router.push("/dashboard/tenant/success");
        }
        catch (err) {
            toast.error("Failed to store booking confirmation.");
        }
        finally {
            setProcessingBooking(false);
        }
    };

    
    const handleReviewSubmit = async (reviewFormData) => {
        // const contextDoc = {
        //     propertyId,
        //     name: currentUser.name,
        //     email: currentUser.email,
        //     ...reviewFormData
        // };

        // try {
        //     await submitReview(contextDoc);
        //     setReviews((prev) => [contextDoc, ...prev]);
        //     toast.success("Review logged successfully!");
        // } catch (err) {
        //     toast.error("Could not capture review entry transaction parameters.");
        // }
    };


    if (loading) return <div className="min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    if (!property) return null;

    return (
        <div className="min-h-screen bg-base-200 py-8 px-4 md:px-8 text-base-content">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Main Cover Showcase Header */}
                <div className="card bg-base-100 overflow-hidden border border-base-300 shadow-xl rounded-3xl">
                    <figure className="h-96 relative w-full bg-neutral-900">
                        <Image height={500} width={500} src={property.images?.[0] || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"} alt={property.title} className="w-full h-full object-cover" />

                        <button onClick={()=>handleFavoriteRegistration(property)} className="btn btn-circle btn-lg absolute top-4 right-4 bg-base-100/80 backdrop-blur border-none hover:bg-primary hover:text-white transition-colors text-error shadow-md">
                            <Heart className="w-6 h-6 fill-current" />
                        </button>
                    </figure>

                    <div className="card-body p-6 md:p-8 space-y-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <span className="badge badge-primary font-bold px-3 py-2 text-xs mb-2 rounded-md">{property.propertyType}</span>
                                <h1 className="text-3xl font-black tracking-tight">{property.title}</h1>
                                <p className="text-sm text-neutral-500 flex items-center gap-1.5 mt-1 font-medium"><MapPin className="w-4 h-4" /> {property.location}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-black text-primary">${property.rentAmount}<span className="text-sm font-semibold text-neutral-400">/{property.rentType || "mo"}</span></p>
                                <button onClick={() => setIsBookModalOpen(true)} className="btn btn-primary mt-3 px-8 rounded-xl font-bold normal-case shadow-md">Book Property Now</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 bg-base-200 p-4 rounded-2xl text-center text-sm font-bold border border-base-300 max-w-md">
                            <div className="border-r border-base-300 flex flex-col items-center"><BedDouble className="w-4 h-4 text-primary mb-0.5" />{property.bedrooms} Bed</div>
                            <div className="border-r border-base-300 flex flex-col items-center"><Bath className="w-4 h-4 text-primary mb-0.5" />{property.bathrooms} Bath</div>
                            <div className="flex flex-col items-center"><Maximize className="w-4 h-4 text-primary mb-0.5" />{property.size || "N/A"}</div>
                        </div>
                    </div>
                </div>

                {/* Reviews Split Grid Structure */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-primary" /> Tenant Feedback ({reviews.length})
                        </h3>

                        {reviews.length === 0 ? (
                            <div className="p-8 bg-base-100 rounded-2xl border border-base-300 text-center text-neutral-400 font-medium">
                                No review modules cataloged for this layout option yet.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {reviews.map((rev, index) => (
                                    <ReviewCard key={index} rev={rev} />
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <ReviewForm onSubmit={handleReviewSubmit} />
                    </div>
                </div>

                {/* Extracted Booking Flow System Modal Wrapper */}
                <BookingModal isOpen={isBookModalOpen}
                    onClose={() => setIsBookModalOpen(false)}
                    property={property}
                    currentUser={currentUser}
                    onConfirm={handleBookingConfirmation}
                    processing={processingBooking}
                />
            </div>
        </div>
    );
}

