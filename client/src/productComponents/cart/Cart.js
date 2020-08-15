import React, { Component } from 'react';
import './cart.css';
import Emptycart from './emptycart';
import { ProductConsumer } from '../../context';
import Cartlist from './cartlist';
import Cartcolumns from './cartcolumns';
import CartTotals from './carttotals';
import { Link } from 'react-router-dom';

import * as actions from '../../Actions';
import { connect } from 'react-redux';

class Cart extends Component {
	render() {
		return (
			<section>
				<div className="cart-main">
					<ProductConsumer>
						{(value) => {
							const { cart } = value;

							if (cart.length > 0) {
								return (
									<React.Fragment>
										<div className="cart-wrapper">
											<div className="cart">
												<div className="cart-title">
													<h1 style={{ color: 'black' }}>Your Cart</h1>
												</div>
											</div>
											{value.carterror ? (
												<div className="alert alert-danger cont">
													<h5 style={{ color: '#000' }} className="log-checkout">
														Please login to continue
													</h5>
												</div>
											) : (
												''
											)}
											<Cartcolumns />
											<Cartlist value={value} />
											<CartTotals value={value} />
											<div className="checkout-btn">
												<Link to="/checkout">
													<button
														className="btn btn-outline-primary"
														onClick={() => {
															{
																return this.props.token ? '' : (value.carterror = true);
															}
														}}
													>
														Checkout
													</button>
												</Link>
											</div>
										</div>
									</React.Fragment>
								);
							} else {
								return <Emptycart />;
							}
						}}
					</ProductConsumer>
				</div>
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		token: state.auth.token
	};
}

export default connect(mapStateToProps)(Cart);
