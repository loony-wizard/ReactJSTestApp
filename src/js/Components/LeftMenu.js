import React from "react";
import { connect } from "react-redux";

import Department from "./Department";
import Employee from "./Employee";

class LeftMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		const departments = this.props.store.departments.map(department =>
			<Department 
				id={department.id}
				name={department.name}
				key={department.id.toString()}
			/>
		);

		const employees = this.props.store.employees.map(employee =>
			<Employee
				id={employee.id}
				firstName={employee.firstName}
				lastName={employee.lastName}
				departmentId={employee.departmentId}
				key={employee.id.toString()}
			/>
		);

		return (
			<div className="left-menu col-sm-4 col-12">
				<h3>Departments</h3>
				<p>Choose department to edit</p>
				<ul className="departments list-group">
					{departments}
				</ul>
				<h3>Employees</h3>
				<p>Choose employee to edit</p>
				<ul className="employees list-group">
					{employees}
				</ul>
			</div>
		)
	}
}

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({})
)(LeftMenu);