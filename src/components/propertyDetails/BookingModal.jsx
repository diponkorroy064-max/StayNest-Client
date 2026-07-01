"use client";
import React, { useState } from "react";
import { Modal, Button, Input, TextField, Label, Surface } from "@heroui/react";
import { Calendar, User, Phone, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
// import { saveBookingInfo } from "@/lib/api/booking";
import { toast } from "react-toastify";


export default function BookingModal({ property, currentUser }) {
    const router = useRouter();

    const [moveInDate, setMoveInDate] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);

            // const bookingRecord = {
            //     propertyId: property?._id,
            //     title: property?.title,
            //     payAmount: property?.rentAmount,
            //     tenantName: currentUser?.name,
            //     tenantEmail: currentUser?.email,
            //     moveInDate,
            //     bookingDate: new Date().toISOString().split("T")[0],
            //     contactNumber,
            //     additionalNotes,
            //     transactionId: "MOCK_TXN_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
            //     paymentStatus: "Unpaid",
            //     bookingStatus: "Confirmed",
            //     bookingDate: new Date().toISOString().split('T')[0]
            // };

            // await saveBookingInfo(bookingRecord);
            toast.success("Booking info. Recorded!");
            // router.push(`/dashboard/tenant/payment?amount=${property.rentAmount}&propertyId=${property._id}&title=${property.title}`);
           
            router.push(`/dashboard/tenant/payment?amount=${property.rentAmount}&propertyId=${property._id}&title=${property.title}&moveInDate=${moveInDate}&contactNumber=${contactNumber}&additionalNotes=${additionalNotes}`);
        }
        catch (err) {
            toast.error(err.message || "Failed to record booking info.");
        }
        finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Modal>
            <Button className="btn btn-primary mt-3 px-8 rounded-xl font-bold normal-case shadow-md hover:btn-secondary">
                Book Property Now
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Icon className="flex justify-between items-center w-full">
                                <div className="bg-primary/10 text-primary p-2 rounded-full">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <Modal.CloseTrigger className="size-9 rounded-full" />
                            </Modal.Icon>

                            <Modal.Heading>
                                Booking Application Form
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default" className="p-4 rounded-xl">
                                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">

                                    {/* Tenant Context Read-Only Display Segment */}
                                    <div className="flex flex-col gap-1.5 bg-base-200/50 p-3 rounded-xl border border-base-300">
                                        <Label className="font-bold text-gray-400 text-xs flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5" /> User Profile Info
                                        </Label>
                                        <span className="text-sm font-semibold text-gray-700 truncate">
                                            {currentUser?.name} ({currentUser?.email})
                                        </span>
                                    </div>

                                    {/* Move-In Date Fields Vector Configuration Mapping */}
                                    <TextField variant="secondary">
                                        <Label className="font-bold text-gray-700">Move-In Date</Label>
                                        <Input
                                            type="date"
                                            required
                                            value={moveInDate}
                                            onChange={(e) => setMoveInDate(e.target.value)}
                                        />
                                    </TextField>

                                    {/* Primary Contact Liaison Phone Input Layout */}
                                    <TextField variant="secondary">
                                        <Label className="font-bold text-gray-700">Contact Number</Label>
                                        <Input
                                            type="tel"
                                            required
                                            placeholder="Contact phone number..."
                                            value={contactNumber}
                                            onChange={(e) => setContactNumber(e.target.value)}
                                        />
                                    </TextField>

                                    {/* Additional Specifications Textarea Element Block Mapping */}
                                    <div className="flex flex-col gap-1">
                                        <Label className="font-bold text-gray-700 text-sm">Additional Notes</Label>
                                        <textarea
                                            placeholder="Specify any unique request details..."
                                            value={additionalNotes}
                                            onChange={(e) => setAdditionalNotes(e.target.value)}
                                            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm font-medium bg-secondary/10 focus:outline-primary min-h-21.25 transition-all"
                                        />
                                    </div>

                                    {/* Footer buttons section containing operational action switches */}
                                    <Modal.Footer className="mt-2 pt-4 border-t border-gray-100">
                                        <Button variant="secondary" slot="close" type="button">
                                            Cancel
                                        </Button>

                                        <Button color="primary" type="submit" className="font-bold">
                                            Confirm Booking
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
