import React from "react";
import { connect } from "react-redux";

class Department extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<li
				onClick={this.props.onDepartmentWasChosen.bind(this, this.props.id)}
				className="list-group-item department"
			>
				{this.props.name}
			</li>
		)
	}
}

Department.propTypes = {
	id: React.PropTypes.number,
	name: React.PropTypes.string
};

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({
		onDepartmentWasChosen: departmentId => dispatch({
			type: "DEPARTMENT_WAS_CHOSEN",
			departmentId
		})
	})
)(Department);