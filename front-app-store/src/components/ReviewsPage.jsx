import React from 'react';
import Rating from '@mui/material/Rating';
import CheckIcon from '@mui/icons-material/Check';
import { makeStyles } from '@material-ui/core/styles';
import './styles.scss';
import { Staticreviews } from '../StaticData.js';

const useStyles = makeStyles((theme) => ({
	stars: {
		marginTop: theme.spacing(1),
		textAlign: 'right',
	},
}));

const ReviewsPage = ({ productId }) => {
	const classes = useStyles();

	return (
		<div className='review'>
			<div className="reviewBody">
				<h2>أراء العملاء</h2>
				{Staticreviews.map((review, index) => (
					<div className="bodyItem" key={index}>
						<div className="top">
							<div className="left">
								<span>{review.timestamp}</span>
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
				))}
			</div>
		</div>
	);
};

export default ReviewsPage;
