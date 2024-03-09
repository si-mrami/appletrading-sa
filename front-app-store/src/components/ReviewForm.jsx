import React, { useState } from "react";
import StarRating from "./StarRating";
import "../styles/stars.css";
import { BiCommentCheck } from "@react-icons/all-files/bi/BiCommentCheck";

const ReviewForm = ({ onSubmit, productId }) => {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [gender, setGender] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({
			fullName,
			email,
			rating,
			comment,
			category: selectedCategory,
			productId,
			gender,
		});
		resetForm();
	};

	const resetForm = () => {
		setFullName("");
		setEmail("");
		setRating(0);
		setComment("");
		setSelectedCategory("");
		setGender("");
	};

	return (
		<div className="review-form-container">
			<h2 className="head">
				{" "}
				<BiCommentCheck />
				اترك التعليق{" "}
			</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label> الاسم الكامل:</label>
					<input
						type="text"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label>البريد الالكتروني:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label>الجنس:</label>
					<div style={{ display: "flex", }}>
						<label style={{ marginRight: "10px", display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '10px' }}>
							<input
								type="radio"
								value="male"
								checked={gender === "male"}
								onChange={() => setGender("male")}
							/>
							ذكر
						</label>
						<label style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '10px' }}>
							<input
								type="radio"
								value="female"
								checked={gender === "female"}
								onChange={() => setGender("female")}
							/>
							أنثى
						</label>
					</div>
				</div>
				<div className="form-group">
					<label>تقييم:</label>
					<StarRating rating={rating} setRating={setRating} />
				</div>
				<div className="form-group">
					<label>تعليق:</label>
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
				</div>

				<button
					type="submit"
					style={{
						color: "white",
						backgroundColor: "rgb(13, 13, 204)",
						padding: "10px 20px",
						border: "none",
						borderRadius: "4px",
						fontSize: "16px",
						cursor: "pointer",
						transition: "background-color 0.3s",
					}}
					onMouseOver={(e) => (e.target.style.backgroundColor = "darkblue")}
					onMouseOut={(e) =>
						(e.target.style.backgroundColor = "rgb(13, 13, 204)")
					}
				>
					ارسال
				</button>
			</form>
		</div>
	);
};

export default ReviewForm;
