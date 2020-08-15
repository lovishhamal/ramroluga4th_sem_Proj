import React, { Component } from 'react';
import Login from '../Login/Login';
import image from '../Landingpage/shirt.png';
import './About.css';
class About extends Component {
	render() {
		return (
			<div>
				<a href="large.jpg" class="MagicZoom" data-options="zoomWidth:70%; zoomHeight:100%">
					<img src={image} />
				</a>
			</div>
		);
	}
}

export default About;
