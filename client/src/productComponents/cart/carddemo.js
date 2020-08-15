import React, { Component } from 'react';
import './cart.css';
import Emptycart from './emptycart';
import { ProductConsumer } from '../../context';
import Cartlist from './cartlist';
import Cartcolumns from './cartcolumns';
import CartTotals from './carttotals';
import Checkout from './checkout';
import { Link } from 'react-router-dom';

export default class Cart extends Component {
	render() {
		return (
			<section>
				<ProductConsumer>
					{(value) => {
						const { cart } = value;

						if (cart.length > 0) {
							return (
								<React.Fragment>
									<div className="cart">
										<div className="cart-title">
											<h1 style={{ color: 'black' }}>Your Cart</h1>
										</div>
									</div>
									<Cartcolumns />
									<Cartlist value={value} />
									<CartTotals value={value} />
									<Link to="/checkout">
										<button>Checkout</button>
									</Link>
								</React.Fragment>
							);
						} else {
							return <Emptycart />;
						}
					}}
				</ProductConsumer>
			</section>
		);
	}
}
