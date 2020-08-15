import React, { useState } from 'react';

import axios from 'axios';
import './dashboard.css';
import Button from '@material-ui/core/Button';
import * as actions from '../../Actions';
import { connect } from 'react-redux';
import { stat } from 'fs';

const Imagelist = ({ img, deleteimg }) => {
	return (
		<tr>
			<td>
				<img src={img.img} />
			</td>
			<td>
				<a
					href="/dashboardproduct"
					onClick={() => {
						deleteimg(img._id);
					}}
					style={{ color: ' black' }}
				>
					Delete
				</a>
			</td>
		</tr>
	);
};

function DashboardProduct() {
	const [ file, setFile ] = useState('');
	const [ filename, setFilename ] = useState('Choose File');
	const [ value, setvalue ] = useState([]);
	const [ title, settitle ] = useState([]);
	const [ price, setprice ] = useState([]);
	const [ info, setinfo ] = useState([]);
	const [ category, setcategory ] = useState([]);
	const [ message, setmessage ] = useState('');
	const [ stock, setstock ] = useState('');
	const [ list, setlist ] = useState([]);
	const [ titlemsg, settitlemsg ] = useState([]);

	const onChange = (e) => {
		e.preventDefault();
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		let myForm = document.getElementById('myForm');
		const formData = new FormData(myForm);
		formData.append('file', file);
		formData.append('value', value);
		formData.append('title', title);
		formData.append('price', price);
		formData.append('info', info);
		formData.append('category', category);
		formData.append('stock', stock);

		/* Donot sumbmit if empty */
		if (formData === null && value === null && title && price && info) {
			return;
		}
		this.props.postProduct(formData);
		window.location = '/dashboardproduct';
	};

	const listimages = (e) => {
		e.preventDefault();
		try {
			fetch('http://127.0.0.1:5000/product/getproduct').then((res) => {
				res.json().then((data) => {
					setlist(data);
				});
			});
		} catch (error) {}
	};

	const images = () => {
		return list.map((img, id) => {
			return <Imagelist img={img} deleteimg={deleteimage} key={id} />;
		});
	};

	const deleteimage = (id) => {
		axios.delete('http://127.0.0.1:5000/product/delete/' + id);
	};

	return (
		<div className="dashboardproduct">
			<div className="product">
				<div>
					<h1 style={{ color: 'black', fontFamily: 'IM Fell Great Primer SC' }}>Upload Product</h1>
				</div>
				<div>
					<div className="custom-file">
						<form onSubmit={onSubmit} id="myForm">
							<input
								type="file"
								name="file"
								id="file"
								className="custom-file-input"
								onChange={onChange}
								required
							/>
							<label htmlFor="file" className="custom-file-label">
								{filename}
							</label>
							<br />
							<input
								type="text"
								placeholder="Enter Your Name"
								value={value}
								onChange={(e) => setvalue(e.target.value)}
								required
							/>
							<input
								type="text"
								placeholder="Enter Title (Less than 10 words)"
								value={title}
								onChange={(e) => settitle(e.target.value)}
								required
							/>
							<input
								type="number"
								placeholder="Enter price"
								value={price}
								onChange={(e) => setprice(e.target.value)}
								required
							/>
							<input
								type="text"
								placeholder="Enter category"
								value={category}
								onChange={(e) => setcategory(e.target.value)}
								required
							/>
							<input
								type="number"
								placeholder="Enter available  stock"
								value={stock}
								onChange={(e) => setstock(e.target.value)}
								required
							/>
							<textarea
								type="comment"
								placeholder="Enter info"
								value={info}
								onChange={(e) => setinfo(e.target.value)}
								required
							/>

							<button type="submit" className="btn btn-outline-success">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
			<div className="dashprod-delete">
				<div className="list-images">
					<Button variant="outlined" color="secondary" onClick={listimages} style={{ background: 'none' }}>
						Delete cuttent image
					</Button>
				</div>
				<div className="list">
					<table className="table">
						<thead className="thead-dark">
							<tr>
								<th scope="col">Image</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>{images()}</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		errorproduct: state.auth.errorproduct,
		productsuccess: state.auth.productsuccess
	};
}

export default connect(mapStateToProps, actions)(DashboardProduct);
