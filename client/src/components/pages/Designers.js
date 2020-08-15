import React from 'react';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeID: 0,
			wrapperStyle: {
				backgroundImage: `url('${this.props.data[0].img}')`
			},
			panelStyle: {
				background: this.props.data[0].color
			},
			buttonHover: false,
			buttonStyle: {
				color: '#ffffff'
			}
		};
	}
	_changeActive(id) {
		this.setState({
			activeID: id,
			wrapperStyle: {
				backgroundImage: `url('${this.props.data[id].img}')`
			},
			panelStyle: {
				backgroundColor: this.props.data[id].color
			}
		});
	}
	_buttoncolor() {
		if (!this.state.buttonHover) {
			this.setState({
				buttonHover: true,
				buttonStyle: {
					color: this.props.data[this.state.activeID].color
				}
			});
		} else {
			this.setState({
				buttonHover: false,
				buttonStyle: {
					color: '#ffffff'
				}
			});
		}
	}
	render() {
		return (
			<section className="wrapper" style={this.state.wrapperStyle}>
				<Selectors
					data={this.props.data}
					activeID={this.state.activeID}
					_changeActive={this._changeActive.bind(this)}
				/>
				<Panel
					data={this.props.data[this.state.activeID]}
					panelStyle={this.state.panelStyle}
					buttonStyle={this.state.buttonStyle}
					_buttoncolor={this._buttoncolor.bind(this)}
				/>
			</section>
		);
	}
}
class Panel extends React.Component {
	render() {
		return (
			<aside className="panel" style={this.props.panelStyle}>
				<h2 className="panel-header">{this.props.data.header}</h2>
				<p className="panel-info">{this.props.data.body}</p>
				<button
					className="panel-button"
					style={this.props.buttonStyle}
					onMouseEnter={this.props._buttoncolor}
					onMouseLeave={this.props._buttoncolor}
				>
					Read More
				</button>
			</aside>
		);
	}
}
class Selectors extends React.Component {
	_handleClick(e) {
		if (this.props.id !== this.props.activeID) {
			this.props._changeActive(this.props.id);
		} else {
			return;
		}
	}
	render() {
		return (
			<div className="selectors">
				{this.props.data.map((item) => (
					<Selector
						key={item.id}
						id={item.id}
						_handleClick={this._handleClick}
						_changeActive={this.props._changeActive}
						activeID={this.props.activeID}
					/>
				))}
			</div>
		);
	}
}
class Selector extends React.Component {
	render() {
		let componentClass = 'selector';
		if (this.props.activeID === this.props.id) {
			componentClass = 'selector active';
		}
		return <div className={componentClass} onClick={this.props._handleClick.bind(this)} />;
	}
}

/*Lets step up the Carousel construct with header, body, color and image*/
const data = [
	{
		id: 0,
		header: 'THE GNAT & THE BULL',
		body: 'A Gnat alighted on one of the horns of a Bull, and remained sitting there...',
		color: '#242846',
		img: 'http://portfolio.gokemon.xyz/wp-content/uploads/2016/09/photo-4forest.jpg'
	},
	{
		id: 1,
		header: 'THE OAK AND THE REEDS',
		body: 'An Oak that grew on the bank of a river was uprooted by a severe gale of wind...',
		color: '#ba9077',
		img: 'http://portfolio.gokemon.xyz/wp-content/uploads/2016/09/photo-1mountains.jpg'
	},
	{
		id: 2,
		header: 'THE RIVERS AND THE SEA',
		body: 'Once upon a time all the Rivers protested against the Sea for making their waters salty....',
		color: '#1ABC9C',
		img: 'http://portfolio.gokemon.xyz/wp-content/uploads/2016/09/photo-2rivers.jpg'
	},
	{
		id: 3,
		header: 'THE CROW AND THE PITCHER',
		body: 'A thirsty Crow found a Pitcher with some water in it, but so little was there...',
		color: '#C0392B',
		img: 'http://portfolio.gokemon.xyz/wp-content/uploads/2016/09/photo-3water.jpg'
	},
	{
		id: 4,
		header: 'The Fox & the Grapes',
		body: 'A hungry Fox saw some fine bunches of Grapes hanging from a vine that was...',
		color: '#513B56',
		img: 'http://portfolio.gokemon.xyz/wp-content/uploads/2016/09/photo-0woods.jpg'
	}
];

export default App;
