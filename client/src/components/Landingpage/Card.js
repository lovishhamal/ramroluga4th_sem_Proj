import React, { Component } from 'react';
import './Landingpage.css';
import axios from 'axios';

class Card extends Component {
	state = {
		designers: []
	};

	render() {
		return (
			<div className="cards">
				<img
					src={this.props.images.imgCollection}
					key={this.props.id}
					style={{ width: '270px', height: '230px' }}
					className="image"
				/>
				<div className="image-name">
					<p className="from-designer "> By {this.props.images.name}</p>
				</div>
			</div>
		);
	}
}

export default Card;
