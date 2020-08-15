import React, { Component } from 'react';
import axios from 'axios';
import { detailProduct } from './data';
import { confirm } from './confirm';

const ProductContext = React.createContext();

class ProductProvider extends Component {
	state = {
		storeProducts: [],
		products: [],
		detailProduct: detailProduct,
		cart: [],
		purchase: confirm,
		modalOpen: false,
		modalProduct: detailProduct,
		cartSubTotal: 0,
		cartTax: 0,
		cartTotal: 0
	};

	setProducts = () => {
		let tempProducts = [];
		this.state.storeProducts.forEach((item) => {
			const singleItem = { ...item };
			tempProducts = [ ...tempProducts, singleItem ];
		});
		this.setState(() => {
			return { products: tempProducts };
		});
	};

	getItem = (_id) => {
		const product = this.state.products.find((item) => item._id === _id);
		return product;
	};

	handleDetail = (_id) => {
		console.log('handled click');

		const product = this.getItem(_id);
		this.setState(() => {
			return { detailProduct: product };
		});
	};

	addCart = (_id) => {
		let tempproducts = [ ...this.state.products ];
		const index = tempproducts.indexOf(this.getItem(_id));
		const products = tempproducts[index];
		products.incart = true;
		products.count = 1;
		const price = products.price;
		products.total = price;
		this.setState(
			() => {
				return { products: tempproducts, cart: [ ...this.state.cart, products ] };
			},
			() => {
				this.addTotals();
			}
		);
	};

	openModal = (_id) => {
		const product = this.getItem(_id);
		this.setState(() => {
			return { modalProduct: product, modalOpen: true };
		});
	};

	closeModal = () => {
		this.setState(() => {
			return { modalOpen: false };
		});
	};

	increment = (_id) => {
		let tempCart = [ ...this.state.cart ];
		const selected = tempCart.find((item) => item._id === _id);
		const index = tempCart.indexOf(selected);
		const product = tempCart[index];

		console.log('product count ->', product.count);
		console.log('product stock ->', product.stock);
		if (product.count === product.stock) {
			return;
		} else {
			product.count = product.count + 1;
			product.total = product.count * product.price;

			this.setState(
				() => {
					return { cart: [ ...tempCart ] };
				},
				() => {
					this.addTotals();
				}
			);
		}
	};

	decrement = (_id) => {
		let tempCart = [ ...this.state.cart ];
		const selected = tempCart.find((item) => item._id === _id);
		const index = tempCart.indexOf(selected);
		const product = tempCart[index];
		product.count = product.count - 1;

		if (product.count === 0) {
			this.removeItem(_id);
		} else {
			product.total = product.count * product.price;
			this.setState(
				() => {
					return { cart: [ ...tempCart ] };
				},
				() => {
					this.addTotals();
				}
			);
		}
	};

	removeItem = (_id) => {
		let tempProducts = [ ...this.state.products ];
		let tempCart = [ ...this.state.cart ];
		tempCart = tempCart.filter((item) => item._id !== _id);
		const index = tempProducts.indexOf(this.getItem(_id));
		let removedProduct = tempProducts[index];
		removedProduct.inCart = false;
		removedProduct.count = 0;
		removedProduct.total = 0;
		this.setState(
			() => {
				return {
					cart: [ ...tempCart ],
					products: [ ...tempProducts ]
				};
			},
			() => {
				this.addTotals();
			}
		);
		if (tempCart.length < 1) {
			setTimeout(() => {
				window.location = '/';
			}, 1000);
		}
	};

	clearCart = () => {
		this.setState(
			() => {
				return { cart: [] };
			},
			() => {
				this.setProducts();
				this.addTotals();
			}
		);
	};

	addTotals = () => {
		let subTotal = 0;
		this.state.cart.map((item) => (subTotal += item.total));
		const tempTax = subTotal * 0.15;
		const tax = parseFloat(tempTax.toFixed(2));
		const total = subTotal + tax;
		this.setState(() => {
			return {
				cartSubTotal: subTotal,
				cartTax: tax,
				cartTotal: total
			};
		});
	};

	async componentDidMount() {
		await axios.get('http://127.0.0.1:5000/product/getproduct').then((res) => {
			this.setState({
				storeProducts: res.data
			});
			this.setProducts();
		});
	}
	render() {
		return (
			<ProductContext.Provider
				value={{
					...this.state,
					handleDetail: this.handleDetail,
					addCart: this.addCart,
					openModal: this.openModal,
					closeModal: this.closeModal,
					increment: this.increment,
					decrement: this.decrement,
					removeItem: this.removeItem,
					clearCart: this.clearCart,
					carterror: false
				}}
			>
				{this.props.children}
			</ProductContext.Provider>
		);
	}
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
