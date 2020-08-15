import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';

import * as actions from '../Actions';
import './card.css';
import PropTypes from 'prop-types';
import { ProductConsumer } from '.././context';
import axios from 'axios';

export default class Card extends Component {
	state = {
		cardProduct: [],
		like: 0
	};

	render() {
		const { _id, img, title, name, price, incart, stock } = this.props.product;
		console.log('incart-> ', incart);
		console.log('stock -> ', stock);

		return (
			<CardWrapper>
				<div className="container">
					<div className="card">
						<div className="head">
							<ProductConsumer>
								{(value) => {
									return (
										<div
											className="image-container"
											onClick={() => {
												value.handleDetail(_id);
											}}
										>
											<div className="overflow">
												<Link to="/details">
													{img.map((img, id) => {
														return (
															<img
																style={{
																	width: 'auto',
																	maxHeight: '150px',
																	marginLeft: '80px'
																}}
																src={img}
																className="card-img-top responsive"
																key={id}
															/>
														);
													})}
												</Link>
											</div>
											<div className="card-body">
												<div className="title">{title}</div>
												<div className="body-wrapper">
													<div className="like-name">
														<i
															className="far fa-thumbs-up"
															style={{
																color: '#075b9a',
																fontSize: '20px',
																marginTop: '5px'
															}}
															onClick={() => {
																return this.setState({
																	like: this.state.like + 1
																});
															}}
														>
															{this.state.like}
														</i>
													</div>
													<div className="spacer" />
													<div>
														<span className="by">By: {name}</span>
													</div>
												</div>
												<div className="price">
													<h5 className="price-head">Rs : {price}</h5>
												</div>
												<div className="stock">
													<h5
														style={{
															fontSize: '16px',
															color: '#265995',
															fontWeight: '900'
														}}
														className="stock-head"
													>
														Stock : {stock}
													</h5>
												</div>
												<button
													className="btn btn-success cart-button"
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
													{incart ? (
														<p className="incart" disabled>
															In Cart
														</p>
													) : (
														<i
															className="fas fa-cart-plus cart-plus"
															style={{ textDecoration: 'none', backgroundColor: 'none' }}
														>
															Add to cart
														</i>
													)}
												</button>
											</div>
										</div>
									);
								}}
							</ProductConsumer>
						</div>
					</div>
				</div>
			</CardWrapper>
		);
	}
}

Card.propTypes = {
	product: PropTypes.shape({
		id: PropTypes.number,
		img: PropTypes.array,
		title: PropTypes.string,
		price: PropTypes.number,
		incart: PropTypes.bool,
		stock: PropTypes.number
	}).isRequired
};

const CardWrapper = styled.div``;
