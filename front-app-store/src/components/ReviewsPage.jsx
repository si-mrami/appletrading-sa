import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import CheckIcon from '@mui/icons-material/Check';
import moment from 'moment';
import 'moment/locale/ar';
import manager from '../Assets/manager.png';
import manager2 from '../Assets/manager2.png';
import axios from 'axios';
import { baseUrl } from '../enveronment.js';
import { Staticreviews } from '../StaticData.js';
import './styles.scss';


const useStyles = makeStyles((theme) => ({
	reviewContainer: {
		maxWidth: '400px',
		margin: '0 auto',
	},
	review: {
		display: 'flex',
		flexDirection: 'row-reverse',
		marginBottom: theme.spacing(2),
		padding: theme.spacing(2),
	},
	reviewerImage: {
		width: theme.spacing(10),
		height: theme.spacing(10),
		marginRight: theme.spacing(2),
	},
	reviewerInfo: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
	},
	reviewHeader: {
		textAlign: 'right',
		color: '#6F3091',
		fontSize: '30px',
	},
	purchaseAndRating: {
		display: 'flex',
		flexDirection: 'row-reverse',
		alignItems: 'center',
		marginTop: theme.spacing(1),
	},
	purchaseInfo: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: '#FFCD3C',
		borderRadius: '10px',
		padding: '5px',
		fontWeight: 'bolder',
	},
	checkIcon: {
		color: 'black',
	},
	ratingInfo: {
		fontSize: '20px',
		marginRight: theme.spacing(1),
	},
	stars: {
		marginTop: theme.spacing(1),
		textAlign: 'right',
	},
	reviewText: {
		textAlign: 'right',
		fontWeight: 'bolder',
	},
	reviewTime: {
		fontSize: '14px',
		color: '#777',
		textAlign: 'right',
		marginTop: theme.spacing(1),
		fontWeight: 'bolder',
	},
}));


const ReviewsPage = ({ productId }) => {
	const classes = useStyles();
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				let reviewsUrl = `${baseUrl}reviews/${productId}`;
				const response = await axios.get(reviewsUrl);

				if (response.status === 200) {
					setReviews(response.data);
				} else {
					console.error('Failed to fetch reviews:', response.status);
				}
			} catch (error) {
				console.error('Error fetching reviews:', error);
			}
		};

		fetchReviews();
	}, [productId]);

	let combinedReviews = reviews.length > 0 ? reviews : Staticreviews;

	combinedReviews = combinedReviews.sort(() => Math.random() - 0.5);

	const getTimeAgo = (date) => {
		moment.locale('ar');
		return moment(date).fromNow();
	};

	return (
		<div className='review'>
			<div className="reviewBody">
				<h2>أراء العملاء</h2>
				{combinedReviews.map((review, index) => (
					review.approved ? (
						<div className="bodyItem" key={index}>
							<div className="top">
								<div className="left">
									<span>{getTimeAgo(review.timestamp)}</span>
								</div>
								<div className="right">
									<div className="items">
										<div className="itemTop">
											<span>{review.fullName}</span>
										</div>
										<div className="itemCenter">
											<span>تم التقييم</span>
											<div className="icons">
												<span>قام بالشراء</span>
												<CheckIcon />
											</div>
										</div>
										<div className="itemBottom">
											<div className={classes.stars}>
												<Rating value={review.rating} readOnly size="small" />
											</div>
										</div>
									</div>
									<img src="https://cdn-icons-png.flaticon.com/128/3048/3048122.png" alt="" />
								</div>
							</div>
							<div className="bottom">
								<span>{review.comment}</span>
							</div>
						</div>
					) : null))}
			</div>
		</div>
	);
};

export default ReviewsPage;

