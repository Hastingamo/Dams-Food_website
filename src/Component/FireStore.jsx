import React, { useState, useEffect } from "react";
import { projectFirestore } from "../firebase"; // use the path to your file

function ReviewSection({ itemId }) {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const fetchReviews = () => {
    projectFirestore
      .collection("reviews")
      .where("itemId", "==", itemId)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(data);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await projectFirestore.collection("reviews").add({
      name,
      comment,
      itemId,
      createdAt: new Date(),
    });
    setName("");
    setComment("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 w-full"
        />
        <textarea
          placeholder="Write your review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border px-2 py-1 w-full"
        />
        <button className="bg-blue-600 text-white px-4 py-1 rounded">
          Submit Review
        </button>
      </form>

      <div className="mt-4">
        <h2 className="font-bold mb-2">Reviews:</h2>
        {reviews.map((rev) => (
          <div key={rev.id} className="border-b mb-2 pb-2">
            <p className="font-semibold">{rev.name}</p>
            <p>{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewSection;
