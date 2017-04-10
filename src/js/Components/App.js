import React from "react";
import { connect } from "react-redux";

import LeftMenu from "./LeftMenu";

import makeAjaxRequest from "../ajax";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.loadDataFromDB();
	}

	loadDataFromDB() {
		makeAjaxRequest("/departments")
			.then(json => {
				const data = JSON.parse(json);
				this.props.onDepartmentsWereLoaded(data);
			}, error => {
				console.log(error)
			});
		makeAjaxRequest("/employees")
			.then(json => {
				const data = JSON.parse(json);
				this.props.onEmployeesWereLoaded(data);
			}, error => {
				console.log(error)
			});
	}

	render() {
		return (
			<div className="app container">
				<div className="row">
					<LeftMenu />
					<div className="col-sm-8 col-12">
						{this.props.children}
					</div>
				</div>				
			</div>
		)
	}
}

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({
		onDepartmentsWereLoaded: data => dispatch({
            type: "DEPARTMENTS_WERE_LOADED",
            data
        }),
        onEmployeesWereLoaded: data => dispatch({
            type: "EMPLOYEES_WERE_LOADED",
            data
        })
	})
)(App);