import React, { Component } from 'react';
import { ProductConsumer } from '.././context';
import { Link } from 'react-router-dom';

import './details.css';

export default class Details extends Component {
	render() {
		return (
			<div className="detail-container">
				<ProductConsumer>
					{(value) => {
						const { _id, title, img, name, price, info, incart, stock } = value.detailProduct;
						return (
							<div>
								<div className="wrapper">
									{/* title*/}
									<div className="image">
										<img src={img} style={{ width: '500px', height: '500px' }} />
									</div>
									<div className="info">
										<span className="info-title">Model : {title}</span>
										<div>
											<span className="detail">Designed BY {name}</span>
										</div>
										<div>
											<span className="detail-price">Price :Rs {price}</span>
										</div>

										<div className="info-wrapper">
											<span className="info-para">{info}</span>
										</div>
										<div className="user-review">User Review:</div>
										<div className="user-review">
											Rating :<i class="far fa-star" />
											<i class="far fa-star" />
											<i class="far fa-star" />
											<i class="far fa-star" />
										</div>
										<div className="button-name">
											<div>
												<Link to="/">
													<button className="btn btn-primary">Back to Products</button>
												</Link>
											</div>
											<div>
												<Link to="/details">
													<button
														className="btn btn-success"
														disabled={stock === 0 || incart ? true : false}
														onClick={() => {
															value.addCart(_id);
															value.openModal(_id);
														}}
													>
														{stock === 0 ? (
															<p className="incart" disabled>
																Out of stock
															</p>
														) : (
															''
														)}
														{incart ? 'inCart' : 'addtoCart'}
													</button>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					}}
				</ProductConsumer>
			</div>
		);
	}
}
