import makeAjaxRequest from "../ajax";

const initialState = {
    departments: [],
    employees: [],
    selectedDepartmentId: -1,
    selectedEmployeeId: -1
};

function reducer(state = initialState, action) {
    if (action.type === "DEPARTMENTS_WERE_LOADED") {
        const departments = action.data.map(department => {
            return {
                id: parseInt(department.id),
                name: department.name
            }
        });
        return {
            ...state,
            departments
        };
    } else if (action.type === "EMPLOYEES_WERE_LOADED") {
        const employees = action.data.map(employee => {
            return {
                id: parseInt(employee.id),
                firstName: employee.firstName,
                lastName: employee.lastName,
                departmentId: parseInt(employee.departmentId)
            }
        });
        return {
            ...state,
            employees
        };
    } else if (action.type === "DEPARTMENT_WAS_CHOSEN") {
        window.location.href = "/#/department_editor/";
        return {
            ...state,
            selectedDepartmentId: action.departmentId
        }
    } else if (action.type === "EMPLOYEE_WAS_CHOSEN") {
        window.location.href = "/#/employee_editor/";
        return {
            ...state,
            selectedEmployeeId: action.employeeId
        }
    } else if (action.type === "DEPARTMENT_WAS_EDITED") {
        // FIXED: We need to use `PUT` query for updating db.json,
        // POST is good here for adding new rows in db.json
        const departments = state.departments;
        const id = state.selectedDepartmentId;
        departments[id].name = action.value;
        const departmentJSON = JSON.stringify({
            id: departments[id].id.toString(),
            name: departments[id].name
        }); 
        makeAjaxRequest(`departments/${id}`, 'PUT', departmentJSON)
            .catch(error => console.log(error));
        window.location.href = "/#/";
        
        return {
            ...state,
            departments
        };
    } else if (action.type === "EMPLOYEE_WAS_EDITED") {
        const employees = state.employees;
        const id = state.selectedEmployeeId;
        employees[id].firstName = action.firstName;
        employees[id].lastName = action.lastName;
        employees[id].departmentId = action.departmentId;
        const departmentJSON = JSON.stringify({
            id: employees[id].id.toString(),
            firstName: employees[id].firstName,
            lastName: employees[id].lastName,
            departmentId: employees[id].departmentId.toString()
        }); 
        makeAjaxRequest(`employees/${id}`, 'PUT', departmentJSON)
            .catch(error => console.log(error));
        window.location.href = "/#/";
        
        return {
            ...state,
            employees
        };
    }  else if (action.type === "NEW_DEPARTMENT") {
        const departments = state.departments;
        const id = departments.length;
        departments.push({
            id,
            name: action.value
        });
        const departmentJSON = JSON.stringify({
            id: id.toString(),
            name: departments[id].name
        }); 
        makeAjaxRequest(`departments/`, 'POST', departmentJSON)
            .catch(error => console.log(error));
        window.location.href = "/#/";
        
        return {
            ...state,
            departments
        };
    } else if (action.type === "NEW_EMPLOYEE") {
        const employees = state.employees;
        const id = employees.length;
        employees.push({
            id,
            firstName: action.firstName,
            lastName: action.lastName,
            departmentId: action.departmentId
        });
        const employeeJSON = JSON.stringify({
            id: id.toString(),
            firstName: action.firstName,
            lastName: action.lastName,
            departmentId: action.departmentId.toString()
        });
        makeAjaxRequest(`employees/`, 'POST', employeeJSON)
            .catch(error => console.log(error));
        window.location.href = "/#/";
        return {
            ...state,
            employees
        };
    } else {
        return state;
    }
}

export default reducer;