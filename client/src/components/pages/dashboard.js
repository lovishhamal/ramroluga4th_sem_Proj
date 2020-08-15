import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';
import Button from '@material-ui/core/Button';
import Header from './dashHeader';
import Product from './dashboardproduct';

const Imagelist = ({ img, deleteimg }) => {
	return (
		<tr>
			<td>
				<img src={img.image} />
			</td>
			<td>
				<a
					href="/dashboard"
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

function Dashboard() {
	const [ file, setFile ] = useState('');
	const [ filename, setFilename ] = useState('Choose File');
	const [ list, setlist ] = useState([]);
	const [ value, setvalue ] = useState([]);

	const onChange = (e) => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		let myForm = document.getElementById('myForm');
		const formData = new FormData(myForm);
		formData.append('file', file);

		/* Donot sumbmit if empty */
		if (formData === null && value === null) {
			return;
		}
		try {
			await axios.post('http://127.0.0.1:5000/images/uploadbanner', formData);
			window.location = '/dashboard';
		} catch (err) {
			if (err.response.status === 500) {
				console.log('Problem with server -> ', err);
			} else {
				console.log(err.response.data.msg);
			}
		}
	};

	const listimages = (e) => {
		e.preventDefault();
		try {
			fetch('http://127.0.0.1:5000/images/getbanner').then((res) => {
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

	const deleteimage = async (id) => {
		await axios.delete('http://127.0.0.1:5000/images/deletebanner/' + id);
	};

	return (
		<div className="dashboard">
			<div>
				<Header />
			</div>
			<div>
				Note:-<br />
				1 . <span>Image should have 1920*1080 dimension and png format</span>
				<br />
				2. <span>Delet current image before adding next one</span>
			</div>
			<br />
			<div className="banner-image">
				<form onSubmit={onSubmit} id="myForm">
					<input
						type="file"
						name="file"
						id="file"
						className="custom-file-input form-control"
						onChange={onChange}
						required
					/>
					<label htmlFor="file" className="custom-file-label">
						{filename}
					</label>
					<br />
					<button type="submit" className="btn btn-success">
						Submit
					</button>
				</form>
			</div>

			{/*
			<div className="image-slider">
				<p>
					
					<br />
					2. All the field are required to fill.
					<br />
					3. While Deleting image in edit delte from the last
				</p>
				<div>
					<h1 style={{ color: 'black', fontFamily: 'IM Fell Great Primer SC' }}>Image slider</h1>
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

							<button type="submit" className="btn btn-outline-success">
								Submit
							</button>
						</form>

						
			</div>
			
			*/}
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
	);
}

export default Dashboard;
