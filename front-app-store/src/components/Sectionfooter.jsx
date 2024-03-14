import React from "react";
import List from "@mui/material/List";
import { GrContactInfo } from "react-icons/gr";
import { AiOutlineLink } from "react-icons/ai";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { FaSnapchat } from "react-icons/fa";
import PhoneIcon from "@mui/icons-material/Phone";
import "../styles/Sectionfooter.css";
import './styles.scss';




const Sectionfooter = () => {

	const whatsappNumber = "+966536456617";
	const whatsappMessage = "مرحبًا! أنا أرغب في التحدث معك.";


	const snapchatURL = "https://www.snapchat.com/";
	const instagramURL = "https://www.instagram.com/";
	const twitterURL = "https://www.twitter.com/";

	return (
		<div className="contact_info">
			<div className="left">
				<div className="top">
					<h1>
						من نحن
						<GrContactInfo />
					</h1>
					<span>
						مؤسسة ابل التجارية لجميع منتجات الهواتف الذكية والألعاب سوني
					</span>
					<div className="infoIcons">
						<a href="mailto:f1642397@gmail.com">
							<div className="item">
								<span>الايميل</span>
								<EmailIcon />
							</div>
						</a>
						<a
							href={`https://wa.me/${whatsappNumber}/?text=${encodeURIComponent(whatsappMessage)}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="item">
								<span>الهاتف</span>
								<PhoneIcon />
							</div>
						</a>
						<a href={`https://wa.me/${whatsappNumber}/?text=${encodeURIComponent(whatsappMessage)}`}>
							<div className="item">
								<span>واتساب</span>
								<WhatsAppIcon />
							</div>
						</a>
					</div>
				</div>
			</div>
			<div className="center">
				<span >معتمدين بوزارة التجارة</span>
				<a href="https://maroof.sa/330149"
					target="_blank"
					rel="noopener noreferrer">
					<img src="https://play-lh.googleusercontent.com/Rj-nvbmRDYczvZ8kfSM6BDD1cCr0XMiq9jP1YBo6gIxSo-bAY3SEJsRWdy99ZiCR3XlG" alt="" />
				</a>
			</div>
			<div className="right">
				<div className="top">
					<h1>
						روابط مهمة
						<AiOutlineLink />
					</h1>
				</div>
				<ul>
					<Link className="Linkstyle" to="/TermandConditions">
						<li>الشروط والأحكام</li>
					</Link>
					<Link className="Linkstyle" to="/Privacypolicy">
						<li>سياسة الخصوصية</li>
					</Link>
					<Link className="Linkstyle" to="/About">
						<li>نبذة عن</li>
					</Link>
					<Link className="Linkstyle" to="/Returnandexchanges">
						<li>الإرجاع والإستبدال</li>
					</Link>
					<a className="Linkstyle"
						href={`https://wa.me/${whatsappNumber}/?text=${encodeURIComponent(whatsappMessage)}`}
						target="_blank"
						rel="noopener noreferrer">
						<li>إتصل بنا</li>
					</a>
				</ul>
			</div>
			<div className="lastpage">
				<div className="top">
					<h1>تواصل معنا</h1>
				</div>
				<div className="socailIcons">
					<a href={snapchatURL} target="_blank" rel="noopener noreferrer">
						<FaSnapchat style={{ fontSize: '20px' }} />
					</a>
					<a href={instagramURL} target="_blank" rel="noopener noreferrer">
						<InstagramIcon />
					</a>
					<a href={twitterURL} target="_blank" rel="noopener noreferrer">
						<TwitterIcon />
					</a>
				</div>
			</div>
		</div>
	);
};

export default Sectionfooter;
