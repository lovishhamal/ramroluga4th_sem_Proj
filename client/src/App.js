import React, { Component } from 'react';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Backdrop from './components/Backdrop/Backdrop';
import SideDrawer from './components/Sidedrawer/Sidedrawer';
import Modal from './productComponents/model';

class App extends Component {
	state = {
		isOpen: false,
		show: false
	};

	/* replace with context api rather then prop drilling */

	//hides search
	nosearch = () => {
		this.setState((prevState) => {
			return { show: !prevState.show };
		});
	};

	//togglestate isOpen
	toggle = () => {
		this.setState((prevState) => {
			return { isOpen: !prevState.isOpen };
		});
	};

	//toggle sidedrawer
	toggleHide = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};

	render() {
		let backdrop;
		if (this.state.isOpen) {
			backdrop = <Backdrop close={this.toggle} />;
		}

		return (
			<div className="App">
				<div className="background-content">
					<div className="main-layout">
						<SideDrawer show={this.state.isOpen} close={this.toggleHide} />
						<Navbar click={this.toggle} search={this.state.show} hide={this.nosearch} />
						{backdrop}
					</div>
					<Modal />
				</div>
				{this.props.children}
			</div>
		);
	}
}

export default App;
