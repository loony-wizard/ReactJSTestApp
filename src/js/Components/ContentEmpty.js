import React from "react";
import { connect } from "react-redux";

class ContentEmpty extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="content content-empty">
				<h1>ReactJS TestApplication</h1>
				<p>Choose department or employee and start editing</p>
				<button 
					onClick={this.props.onNewDepartmentButtonWasPressed}
					type="button"
					className="btn btn-secondary"
				>
					Create new department
				</button>
				<button 
					onClick={this.props.onNewEmployeeButtonWasPressed}
					type="button"
					className="btn btn-secondary"
				>
					Create new employee
				</button>
			</div>
		)
	}
}

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({
		onNewDepartmentButtonWasPressed: () => dispatch({
			type: "DEPARTMENT_WAS_CHOSEN",
			departmentId: -1
		}),
		onNewEmployeeButtonWasPressed: () => dispatch({
			type: "EMPLOYEE_WAS_CHOSEN",
			employeeId: -1
		})
	})
)(ContentEmpty);