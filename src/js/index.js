import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./Reducers/index";

import { Router, Route, IndexRoute, hashHistory } from "react-router";

import App from "./Components/App";
import ContentEmpty from "./Components/ContentEmpty";
import DepartmentEditor from "./Components/DepartmentEditor";
import EmployeeEditor from "./Components/EmployeeEditor";

const store = createStore(reducer);

const root = document.getElementById("root");

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={ContentEmpty} />
				<Route path="department_editor" component={DepartmentEditor} />
				<Route path="employee_editor" component={EmployeeEditor} />
			</Route>
		</Router>
	</Provider>,
	root
);