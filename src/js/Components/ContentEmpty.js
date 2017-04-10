import React from "react";

class ContentEmpty extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="content content-empty">
				<h1>ReactJS TestApplication</h1>
				<p>Choose department or employee and start editing</p>
			</div>
		)
	}
}

export default ContentEmpty;