import React, { useState } from "react";
import { Calendar, User, Phone, FileText, CreditCard, ShieldCheck } from "lucide-react";

export default function BookingModal({ isOpen, onClose, property, currentUser, onConfirm, processing }) {
    // console.log('property from modal', property);

    const [showPaymentView, setShowPaymentView] = useState(false);
    const [moveInDate, setMoveInDate] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [additionalNotes, setAdditionalNotes] = useState("");

    if (!isOpen) return null;

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setShowPaymentView(true);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        onConfirm({ moveInDate, contactNumber, additionalNotes });
    };


    return (
        <div className="modal modal-open bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 fixed inset-0">
            <div className="modal-box bg-base-100 border border-base-300 rounded-3xl max-w-md p-6 relative shadow-2xl">
                <button onClick={() => { onClose(); setShowPaymentView(false)}} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 font-black">
                    ✕
                </button>

                {!showPaymentView ? (
                    /* STEP 1: BOOKING FORM */
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <h3 className="text-xl font-black border-b pb-3 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" /> Application Form
                        </h3>

                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-neutral-500">User Info</span></label>
                            <div className="input input-bordered flex items-center gap-2 rounded-xl bg-base-200 font-bold text-sm select-none">
                                <User className="w-4 h-4 text-neutral-400"/> {currentUser.name} ({currentUser.email})
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-neutral-500">Move-In Date</span></label>
                            <input type="date" required value={moveInDate} onChange={(e) => setMoveInDate(e.target.value)} className="input input-bordered rounded-xl font-medium" />
                        </div>

                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-neutral-500">Contact Number</span></label>
                            <div className="relative">
                                <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input type="tel" required placeholder="Contact phone number..." value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} className="input input-bordered w-full pl-9 rounded-xl font-medium" />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-neutral-500">Additional Notes</span></label>
                            <div className="relative">
                                <FileText className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                                <textarea placeholder="Specify any unique details..." value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} className="textarea textarea-bordered w-full pl-9 rounded-xl min-h-17.5 focus:outline-primary font-medium"/>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block rounded-xl font-bold normal-case shadow-md">
                            Proceed to Payment UI
                        </button>
                    </form>
                ) : (
                    /* STEP 2: PAYMENT OVERVIEW */
                    <form onSubmit={handlePaymentSubmit} className="space-y-5">
                        <h3 className="text-xl font-black border-b pb-3 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-primary" /> Checkout Portal
                        </h3>

                        <div className="bg-base-200 p-4 border border-base-300 rounded-2xl space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-neutral-400 font-bold">Property:</span>
                                <span className="font-extrabold max-w-50 truncate">{property.title}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-400 font-bold">Move-in target:</span>
                                <span className="font-extrabold">{moveInDate}</span>
                            </div>
                            <div className="flex justify-between border-t border-base-300 pt-2 text-md font-black text-primary">
                                <span>Total Due:</span> <span>${property.rentAmount}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="form-control">
                                <label className="label py-0.5"><span className="label-text font-bold text-neutral-500 text-xs">Cardholder Name</span></label>
                                <input type="text" defaultValue={currentUser.name} className="input input-bordered input-sm rounded-xl font-medium bg-base-100" placeholder="John Doe" required />
                            </div>
                            <div className="form-control">
                                <label className="label py-0.5"><span className="label-text font-bold text-neutral-500 text-xs">Card Details (UI Placeholder)</span></label>
                                <input type="text" className="input input-bordered input-sm rounded-xl font-medium" placeholder="4242 •••• •••• 4242" maxLength={16} required />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" className="input input-bordered input-sm rounded-xl font-medium text-center" placeholder="MM / YY" maxLength={5} required />
                                <input type="password" className="input input-bordered input-sm rounded-xl font-medium text-center" placeholder="CVC" maxLength={3} required />
                            </div>
                        </div>

                        <button type="submit" disabled={processing} className="btn btn-primary btn-block rounded-xl normal-case font-bold text-white shadow-md">
                            {processing ? <span className="loading loading-spinner"></span> :`Confirm Payment of $${property.rentAmount}`}
                        </button>

                        <div className="flex items-start gap-2 bg-base-200 p-3 rounded-xl text-[11px] text-neutral-500 leading-relaxed">
                            <ShieldCheck className="w-4 h-4 text-success shrink-0 mt-0.5" />
                            <p>This layout is running in local UI mode. Integration gateway routes can step directly into this action layer later.</p>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

