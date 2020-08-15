import React, { Component } from 'react';
import './Landingpage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import image from './banner.jpg';
import ProductList from '../../productComponents/Productlist';

import Card from './Card';

class LandingPage extends Component {
	state = {
		properties: [],
		property: [],
		banner: []
	};

	async componentDidMount() {
		await axios.get('http://127.0.0.1:5000/images/getbanner').then((res) => {
			this.setState({
				banner: res.data
			});
		});
	}

	nextProperty = () => {
		let newIndex = this.state.property.index + 1;
		const { length } = this.state.properties;
		if (newIndex == this.state.properties.length) {
			newIndex = length - 1;
		}

		this.setState({
			property: this.state.properties[newIndex]
		});
	};

	prevProperty = () => {
		let newIndex = this.state.property.index - 1;
		if (newIndex < 0) {
			newIndex = 0;
		}
		this.setState({
			property: this.state.properties[newIndex]
		});
	};

	render() {
		const { property, properties } = this.state;
		return (
			<section className="Landing-page">
				<div className="jumbotron" style={{ backgroundColor: '#075b9a' }}>
					<p className="paragraph">
						<span className="span">Shop Exclusively.</span> Get exclusive designs only at RamroLuga. We
						provide you exclusive designs directly from your{' '}
						<span className="span-1">favourite designers.</span>
					</p>
					<div className="designer">
						<h1 className="designer">Are you a designer ?</h1>
						<button
							className="start btn btn-outline-primary"
							style={{ fontSize: '15px', color: '#fff', border: '1px solid #fff' }}
						>
							<Link to="/admin-login" style={{ textDecoration: 'none', background: 'none' }}>
								Get Started
							</Link>
						</button>
					</div>
				</div>
				<div className="banner">
					<div className="banner-wrapper">
						{this.state.banner.map(({ image }) => {
							return <img src={image} style={{ width: '100%', height: '100%' }} className="responsive" />;
						})}
					</div>
				</div>
				<ProductList />
				{/*
				<div className="carousel">
					<i
						className="fas fa-chevron-left"
						onClick={() => {
							this.prevProperty();
						}}
					/>
					<div className="card-slider">
						<div
							className="card-slider-wrapper"
							style={{ transform: `translateX(-${property.index * (100 / properties.length)}%)` }}
						>
							{this.state.properties.map((image, id) => {
								return <Card key={id} images={image} property={property} />;
							})}
						</div>
					</div>
					<i
						className="fas fa-chevron-right"
						onClick={() => {
							this.nextProperty();
						}}
					/>
				</div>
					*/}
			</section>
		);
	}
}

export default LandingPage;
