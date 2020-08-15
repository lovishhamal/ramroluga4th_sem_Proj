import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './product.css';
import { ProductConsumer } from '.././context';
import Card from './Card';
import Footer from '../footer/footer';

export default class Productlist extends Component {
	render() {
		return (
			<section>
				<React.Fragment>
					<div className="product-wrapper" style={{ backgroundColor: '#f8f9fa' }}>
						<div className="product-list">
							<div className="navbar">
								<div className="cart" />
								<div className="spacer" />
								<Link to="/cart" style={{ textDecoration: 'none', background: 'none' }}>
									<button className="btn btn-primary">
										<i
											className="fas fa-cart-plus cart-icon"
											style={{ textDecoration: 'none', background: 'none', fontSize: '14px' }}
										>
											My Cart
										</i>
									</button>
								</Link>
							</div>
							<div className="product-container">
								<div className="productlist-wrapper">
									<ProductConsumer>
										{(data) => {
											return data.products.map((value, id) => {
												return <Card key={id} product={value} />;
											});
										}}
									</ProductConsumer>
								</div>
							</div>
						</div>
					</div>
					<Footer />
				</React.Fragment>
			</section>
		);
	}
}
