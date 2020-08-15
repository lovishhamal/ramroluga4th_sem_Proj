import React, { Component } from 'react';
import './cart.css';

export default class emptycart extends Component {
	render() {
		return (
			<div className="empty-cart">
				<div>
					<h1 style={{ color: '#000' }}>You Cart is currently empty!</h1>
				</div>
			</div>
		);
	}
}
