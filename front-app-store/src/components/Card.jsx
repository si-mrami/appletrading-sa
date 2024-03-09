import React from 'react';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

const Card = ({ image, title, price, beforePrice, id }) => {
	return (
		<div className="card">
			<div className="cartTop">
				<img src={image} alt="" />
			</div>
			<div className="bottom">
				<div className="title">
					<span>{title}</span>
				</div>
				<div className="prices">
					<div className="pricebefore">
						<span>{beforePrice}</span>
					</div>
					<div className="price">
						<span>{price}</span>
					</div>
					<AddShoppingCartOutlinedIcon style={{ fontSize: '14px' }} />
				</div>
				<div className="lastelement">
					{/* <button>أطلب ألان</button> */}
					<div className="iconsCard">
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
