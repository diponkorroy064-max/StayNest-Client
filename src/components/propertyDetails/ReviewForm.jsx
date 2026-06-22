import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ReviewForm({ onSubmit }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            return toast.warning("Prose comment cannot match empty definitions.");
        }
        onSubmit({ rating: Number(rating), comment });
        setComment("");
    };

    return (
        <div className="bg-base-100 border border-base-300 p-6 rounded-3xl shadow-md h-fit space-y-4">
            <h3 className="text-lg font-black tracking-tight">Express Experience Evaluation</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="form-control">
                    <label className="label py-1">
                        <span className="label-text font-bold text-neutral-500">Metric Rating</span>
                    </label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="select select-bordered rounded-xl font-bold"
                    >
                        <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                        <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                        <option value="3">⭐⭐⭐ 3 Stars</option>
                        <option value="2">⭐⭐ 2 Stars</option>
                        <option value="1">⭐ 1 Star</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className="label py-1">
                        <span className="label-text font-bold text-neutral-500">Review Commentary</span>
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Elaborate on structural conditions..."
                        className="textarea textarea-bordered h-24 rounded-xl focus:outline-primary font-medium"
                    />
                </div>
                <button type="submit" className="btn btn-neutral btn-block rounded-xl font-bold normal-case">
                    Post Feedback Record
                </button>
            </form>
        </div>
    );
}
