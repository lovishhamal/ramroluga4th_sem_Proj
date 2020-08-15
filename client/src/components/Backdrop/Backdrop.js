import React from 'react';
import './Backdrop.css';

function Backdrop(props) {
	return <div className="Backdrop" onClick={(props.close, props.onClick)} />;
}

export default Backdrop;
