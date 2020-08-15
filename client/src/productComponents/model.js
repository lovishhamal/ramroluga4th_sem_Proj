import React, { Component } from 'react';
import { ProductConsumer } from '.././context';
import { Link } from 'react-router-dom';
import './model.css';

export default class Model extends Component {
	render() {
		return (
			<ProductConsumer>
				{(value) => {
					const { modalOpen, closeModal } = value;

					const { img, title, price, name } = value.modalProduct;
					if (!modalOpen) {
						return null;
					} else {
						return (
							<div className="modal-info">
								<div className="modal-wrapper">
									<span className="modal-heading">ITEM ADDED TO CART</span>
									<img
										className="modal-img"
										src={img}
										style={{ width: '200px', height: '200px', marginTop: '-10px' }}
									/>
									<span className="modal-head">{title}</span>
									<span className="modal-head">By {name}</span>
									<span className="modal-price">Rs: {price}</span>
									<div className="modal-button">
										<Link to="/">
											{' '}
											<button
												onClick={() => {
													closeModal();
												}}
												className="btn btn-outline-primary"
											>
												Continue Shoping
											</button>
										</Link>
										<Link to="/cart">
											<button
												onClick={() => {
													closeModal();
												}}
												style={{ marginLeft: '5px' }}
												className="btn btn-outline-success"
											>
												Go to Cart
											</button>
										</Link>
									</div>
								</div>
							</div>
						);
					}
				}}
			</ProductConsumer>
		);
	}
}
