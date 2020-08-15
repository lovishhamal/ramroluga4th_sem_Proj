import React, { Component } from 'react';
import { ProductConsumer } from '../../context';
import axios from 'axios';

import './checkout.css';

import * as actions from '../../Actions';
import { connect } from 'react-redux';
import { stat } from 'fs';

class Checkout extends Component {
	state = {
		message: ''
	};
	render() {
		return (
			<ProductConsumer>
				{(value) => {
					const data = {
						name: this.props.userdata.user.local.username,
						email: this.props.userdata.user.local.email,
						address: this.props.userdata.user.local.address,
						city: this.props.userdata.user.local.city,
						number: this.props.userdata.user.local.number,
						data: value.cart,
						total: value.cartTotal
					};
					const submit = () => {
						this.props.order(data);
						setTimeout(() => {
							window.location = '/';
						}, 1000);
					};
					return (
						<section className="checkout">
							<div className="checkout-wrapper">
								<h1 style={{ color: '#000' }}>Your order</h1>
								{this.props.ordersuccess ? (
									<div className="alert alert-success">
										<p style={{ color: '#000' }} className="ordersuccess">
											{this.props.ordersuccess}
										</p>
									</div>
								) : (
									''
								)}
								<div className="checkout-container">
									Name: {this.props.userdata.user.local.username}
								</div>
								<div className="checkout-container">Email: {this.props.userdata.user.local.email}</div>
								<div className="checkout-container">
									Address: {this.props.userdata.user.local.address}
								</div>
								<div className="checkout-container">City: {this.props.userdata.user.local.city}</div>
								<div className="checkout-container">
									{value.cart.map((product, id) => {
										return (
											<p key={id}>
												<span className="product-title">Product: {product.title}</span>
												<br />
												<span className="product-title">Order: {product.count}</span>
											</p>
										);
									})}
								</div>
								<div className="total">Total: {value.cartTotal}</div>
								<div className="checkout-button">
									<button
										type="submit"
										className="btn btn-success"
										onClick={() => {
											submit();
										}}
									>
										Confirm Order
									</button>
								</div>
							</div>
						</section>
					);
				}}
			</ProductConsumer>
		);
	}
}

function mapStateToProps(state) {
	return {
		userdata: state.auth.userData,
		ordersuccess: state.auth.ordersuccess
	};
}

export default connect(mapStateToProps, actions)(Checkout);
