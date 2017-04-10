import React from "react";
import { connect } from "react-redux";

class Employee extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const department = this.props.store.departments[this.props.departmentId].name;
		const employeeInfo = `${this.props.firstName} ${this.props.lastName} (${department})`;
		return (
			<li
				onClick={this.props.onEmployeeWasChosen.bind(this, this.props.id)}
				className="list-group-item employee"
			>
				{employeeInfo}
			</li>
		)
	}
}

Employee.propTypes = {
	id: React.PropTypes.number,
	firstName: React.PropTypes.string,
	lastName: React.PropTypes.string,
	departmentId: React.PropTypes.number
};


export default connect(
	state => ({
		store: state
	}),
	dispatch => ({
		onEmployeeWasChosen: employeeId => dispatch({
			type: "EMPLOYEE_WAS_CHOSEN",
			employeeId
		})
	})
)(Employee);