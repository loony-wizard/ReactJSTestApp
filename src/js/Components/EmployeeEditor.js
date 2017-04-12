import React from "react";

import { connect } from "react-redux";

class EmployeeEditor extends React.Component {
	constructor(props) {
		super(props);
		const { firstName, lastName, departmentId } = this.getDefaultInputValues();
		this.state = {
			firstNameInputValue: firstName,
			lastNameInputValue: lastName,
			departmentId: departmentId,
			error_message: null
		};
	}

	save() {
		const firstName = this.firstNameInput.value;
		const lastName = this.lastNameInput.value;
		const departmentId = this.state.departmentId;
		
		if (this.textIsEmpty(firstName)) {
			const error_message = "First Name is empty!";
			this.setState({
				...this.state,
				error_message
			});
			return;
		}

		if (this.textIsEmpty(lastName)) {
			const error_message = "Last Name is empty!";
			this.setState({
				...this.state,
				error_message
			});
			return;
		}

		if (departmentId === -1) {
			const error_message = "Department is not chosen!";
			this.setState({
				...this.state,
				error_message
			});
			return;
		}		


		if (this.props.store.selectedEmployeeId === -1) {
			this.props.onEmployeeWasCreated(firstName, lastName, departmentId);
		} else {
			this.props.onEmployeeWasEdited(firstName, lastName, departmentId);
		}
	}

	textIsEmpty(text) {
        // check if text contains something instead of spaces, new lines and tabs
        return !(/[^ \n\t]/.test(text));
    }

	onChangeHandler() {
		this.setState({
			...this.state,
			firstNameInputValue: this.firstNameInput.value,
			lastNameInputValue: this.lastNameInput.value
		});
	}

	onDepartmentIdWasChosen(departmentId) {
		this.setState({
			...this.state,
			departmentId
		})
	}

	getDefaultInputValues() {
		let employeeId = this.props.store.selectedEmployeeId;
		let employee;
		if (employeeId !== -1) {
			employee = this.props.store.employees[employeeId];
			return {
				firstName: employee.firstName,
				lastName: employee.lastName,
				departmentId: employee.departmentId	
			};
		} else {
			return {
				firstName: "",
				lastName: "",
				departmentId: -1
			};
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props !== prevProps) {
			const { firstName, lastName, departmentId } = this.getDefaultInputValues();
			this.setState({
				firstNameInputValue: firstName,
				lastNameInputValue: lastName,
				departmentId: departmentId
			});
		}
	}

	render() {
		const departments = this.props.store.departments;
		const departmentId = this.state.departmentId;
		const departmentName = departmentId === -1 ?
			"" : departments[departmentId].name;
		const dropdownItems = departments.map(department => {
			return (
				<button
					key={department.id.toString()}
					onClick={this.onDepartmentIdWasChosen.bind(this, department.id)}
					className="dropdown-item"
					type="button"
				>
					{department.name}
				</button>
			);
		});
		const error_message = this.state.error_message === null ?
			"" : (
				<div className="alert alert-danger" role="alert">
					{this.state.error_message}
				</div>
			);
		return (
			<div className="content">
				<h2>Employee editing</h2>
				{error_message}
				<form onChange={this.onChangeHandler.bind(this)}>
					<div className="input-group">
						<span
							className="input-group-addon"
						>Employee First Name</span>
						<input
							type="text"
							className="form-control"
							value={this.state.firstNameInputValue}
							ref={input => this.firstNameInput = input}
						/>
					</div>
					<div className="input-group last-name-input-group">
						<span
							className="input-group-addon"
						>Employee Last Name</span>
						<input
							type="text"
							className="form-control"
							value={this.state.lastNameInputValue}
							ref={input => this.lastNameInput = input}
						/>
					</div>
				</form>
				<div className="dropdown">
					<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Department: {departmentName}
					</button>
					<div className="dropdown-menu" aria-labelledby="dropdownMenu2">
						{dropdownItems}
					</div>
				</div>
				<div
					className="btn btn-primary"
					onClick={this.save.bind(this)}
				>Save</div>
			</div>
		)
	}
}

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({
		onEmployeeWasEdited: (firstName, lastName, departmentId) => dispatch({
			type: "EMPLOYEE_WAS_EDITED",
			firstName, lastName, departmentId
		}),
		onEmployeeWasCreated: (firstName, lastName, departmentId) => dispatch({
			type: "NEW_EMPLOYEE",
			firstName, lastName, departmentId
		})    
	})
)(EmployeeEditor);