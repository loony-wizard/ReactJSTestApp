import React from "react";

import { connect } from "react-redux";

class DepartmentEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: this.getDefaultInputValue(),
			error_message: null
		};
	}

	save() {
		const value = this.input.value;
		
		if (this.textIsEmpty(value)) {
			const error_message = "Department name is empty!";
			this.setState({
				...this.state,
				error_message
			});
			return;
		}

		if (this.props.store.selectedDepartmentId === -1) {
			this.props.onDepartmentWasCreated(value);
		} else {
			this.props.onDepartmentWasEdited(value);
		}
	}

	onChangeHandler() {
		this.setState({
			...this.state,
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

	textIsEmpty(text) {
        // check if text contains something instead of spaces, new lines and tabs
        return !(/[^ \n\t]/.test(text));
    }

	componentDidUpdate(prevProps, prevState) {
		if (this.props !== prevProps) {
			this.setState({
				...this.state,
				inputValue: this.getDefaultInputValue()
			});
		}
	}

	render() {
		const info = this.props.store.selectedDepartmentId === -1 ?
			"Creating new department" : "Department editing";
		const error_message = this.state.error_message === null ?
			"" : (
				<div className="alert alert-danger" role="alert">
					{this.state.error_message}
				</div>
			);
		return (
			<div className="content">
				<h2>{info}</h2>
				{error_message}
				<div className="input-group">
					<span
						className="input-group-addon"
					>{info}</span>
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
		}),
		onDepartmentWasCreated: value => dispatch({
			type: "NEW_DEPARTMENT",
			value
		})    
	})
)(DepartmentEditor);