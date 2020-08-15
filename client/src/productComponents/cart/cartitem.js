import React from 'react';
import './cart.css';

export default function CartItem({ item, value }) {
	const { _id, title, img, price, total, count } = item;
	const { increment, decrement, removeItem } = value;
	return (
		<div className="row my-1 text-capitalize text-center">
			<div className="col-10 mx-auto col-lg-2">
				<img src={img} style={{ width: '10rem', height: '10rem', marginTop: '-8px' }} className="img-fluid" />
			</div>
			<div className="col-10 mx-auto col-lg-2">
				<span className="d-lg-non cart-item-list"> {title}</span>
			</div>
			<div className="col-10 mx-auto col-lg-2">
				<span className="d-lg-non cart-item-list"> {price}</span>
			</div>
			<div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
				<div className="d-flex justify-content-center">
					<div className="quantity">
						<div className="minus btn btn-danger" onClick={() => decrement(_id)}>
							<span style={{ fontSize: '20px' }}>-</span>
						</div>
						<div className="count">
							<span className="btn btn-outline-primary" style={{ fontSize: '10px' }}>
								{count}
							</span>
						</div>
						<div className="plus btn btn-success" onClick={() => increment(_id)}>
							<span style={{ fontSize: '20px' }}>+</span>
						</div>
					</div>
				</div>
			</div>
			<div className="col-10 mx-auto col-lg-2">
				<div
					className="cart-icon"
					onClick={() => {
						removeItem(_id);
					}}
				>
					<i class="fas fa-trash" style={{ color: 'red' }} />
				</div>
			</div>
			<div className="col-10 mx-auto col-lg-2">
				<strong className="cart-item-list">Item total : Rs {total}</strong>
			</div>
		</div>
	);
}
