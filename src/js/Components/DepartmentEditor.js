import React from "react";

import { connect } from "react-redux";

class DepartmentEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: this.getDefaultInputValue()
		};
	}

	save() {
		const value = this.input.value;
		this.props.onDepartmentWasEdited(value);
	}

	onChangeHandler() {
		this.setState({
			inputValue: this.input.value
		})
	}

	getDefaultInputValue() {
		let departmentId = this.props.store.selectedDepartmentId;
		let department;
		let inputDefaultValue;
		if (departmentId !== -1) {
			department = this.props.store.departments[departmentId];
			return department.name;
		} else {
			return "";
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props !== prevProps) {
			this.setState({
				inputValue: this.getDefaultInputValue()
			});
		}
	}

	render() {
		return (
			<div className="content">
				<h2>Department editing</h2>
				<div className="input-group">
					<span
						className="input-group-addon"
					>Department Name</span>
					<input
						type="text"
						className="form-control"
						ref={input => this.input = input}
						value={this.state.inputValue}
						onChange={this.onChangeHandler.bind(this)}
					/>
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
		onDepartmentWasEdited: value => dispatch({
			type: "DEPARTMENT_WAS_EDITED",
			value
		})    
	})
)(DepartmentEditor);