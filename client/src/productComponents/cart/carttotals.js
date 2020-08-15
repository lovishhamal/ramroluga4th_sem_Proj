import React from 'react';
import { Link } from 'react-router-dom';
import './cart.css';

export default function carttotals({ value }) {
	const { cartSubTotal, cartTax, cartTotal, clearCart } = value;
	console.log('cart -> totals', cartTotal);

	return (
		<React.Fragment>
			<div className="container-total">
				<div className="row">
					<div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capatalized text-right mr-0">
						<Link to="/">
							<button
								className="btn btn-outline-danger text-uppercase mb-3 px-5 "
								type="button"
								onClick={() => {
									clearCart();
								}}
							>
								clear cart
							</button>
						</Link>
						<h5>
							<span className="text-title">
								Subtotal: <span className="text-rs">Rs {cartSubTotal}</span>
							</span>
						</h5>
						<h5>
							<span className="text-title">
								Tax: <span className="text-rs">Rs {cartTax}</span>{' '}
							</span>
						</h5>
						<h5>
							<span className="text-title">
								Total: <span className="text-rs">Rs {cartTotal}</span>
							</span>
						</h5>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
