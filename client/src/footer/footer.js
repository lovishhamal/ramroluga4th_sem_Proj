import React from 'react';
import './footer.css';

export default function footer() {
	return (
		<section className="footer">
			<footer>
				<div className="container-fluid padding ">
					<div className="row text-center">
						<div className="col-md-4 footer-head">
							<span className="heading">Terms and Conditions </span>
							<span className="dummy">Liscense</span>
							<span className="dummy">Rules</span>
							<span className="dummy">Contract</span>
						</div>
						<div className="col-md-4 footer-head">
							<span className="heading">Product Exchange</span>
							<span className="dummy">Sell</span>
							<span className="dummy">Buy</span>
							<span className="dummy">Feature</span>
						</div>
						<div className="col-md-4 footer-head">
							<span className="heading">Our Services </span>
							<span className="dummy">RamroLuga.store</span>
							<span className="dummy">Customer care</span>
							<span className="dummy">Customers</span>
						</div>
					</div>
				</div>
			</footer>
		</section>
	);
}
