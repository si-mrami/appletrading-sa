import React from "react";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ConstructionIcon from "@mui/icons-material/Construction";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import "../styles/Thetreecards.css";
import { useNavigate } from 'react-router-dom';
import './styles.scss';


const Thetreecards = () => {

	const navigate = useNavigate();


	const cardContentStyle = {
		backgroundColor: "#01082D",
		color: "white",
		padding: 2,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
	};

	const cardStyle = {
		width: "600px",
		margin: "18px",
	};

	const containerStyle = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "100vh",
	};

	const handleCardClick = () => {
		navigate('/fastdelivery');
	};

	const handleCard2Click = () => {
		navigate('/maintenance');
	};


	return (
		<div style={containerStyle} className="responsive-cards">
			<Card sx={cardStyle} onClick={handleCardClick}>
				<CardContent sx={cardContentStyle}>
					<LocalShippingIcon sx={{ fontSize: 48 }} />
					<Typography className="texttitle" variant="h4">التوصيل السريع</Typography>
				</CardContent>
				<CardContent
					sx={{
						flex: 1,
						backgroundColor: "black",
						color: "white",
						padding: 2,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Typography className="textitle" variant="h6" gutterBottom>
						مع العميل مع ضمان المنتجات من الموقع
					</Typography>
				</CardContent>
			</Card>

			<Card sx={cardStyle} onClick={handleCard2Click}>
				<CardContent sx={cardContentStyle}>
					<ConstructionIcon sx={{ fontSize: 48 }} />
					<Typography className="texttitle" variant="h4">الصيانة الفورية المتنقلة</Typography>
				</CardContent>
				<CardContent
					sx={{
						flex: 1,
						backgroundColor: "black",
						color: "white",
						padding: 2,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Typography className="textitle" variant="h6" gutterBottom>
						إلى منزل العميل
					</Typography>
				</CardContent>
			</Card>

			<Card sx={cardStyle}>
				<CardContent sx={cardContentStyle}>
					<HeadsetMicIcon sx={{ fontSize: 48 }} />
					<Typography className="texttitle" variant="h4">
						<a  href="https://wa.me/+966504481954" target="_blank" rel="noopener noreferrer">
							الدعم السريع
						</a>
					</Typography>
				</CardContent>
				<CardContent
					sx={{
						flex: 1,
						backgroundColor: "black",
						color: "white",
						padding: 2,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Typography className="textitle" variant="h6" gutterBottom>
						<a href="https://wa.me/+966504481954" target="_blank" rel="noopener noreferrer">
							+966504481954
						</a>
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

export default Thetreecards;
