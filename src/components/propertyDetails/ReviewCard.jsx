import React from "react";
import { Star } from "lucide-react";

export default function ReviewCard({ rev }) {
    return (
        <div className="bg-base-100 border border-base-300 p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-extrabold text-sm">{rev.name}</h4>
                    <p className="text-xs text-neutral-400 font-semibold">
                        {rev.email} {rev.date && `• ${rev.date}`}
                    </p>
                </div>
                <div className="flex items-center gap-0.5 bg-warning/10 text-warning px-2.5 py-1 rounded-lg text-xs font-black">
                    <Star className="w-3.5 h-3.5 fill-current" /> {rev.rating}
                </div>
            </div>
            <p className="text-sm text-neutral-600 font-medium leading-relaxed">{rev.comment}</p>
        </div>
    );
}
