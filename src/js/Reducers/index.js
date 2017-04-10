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
        // TODO: save to db
        // this is not working as I want
        // it creates new fields in db.json instead of rewriting existing
        // how can I fix it?
        /*
        makeAjaxRequest(`departments`, 'POST', JSON.stringify({
            id: state.selectedDepartmentId,
            name: action.value
        })).catch(error => console.log(error));
        */
        window.location.href = "/#/";
        const departments = state.departments;
        departments[state.selectedDepartmentId].name = action.value;
        return {
            ...state,
            departments
        };
    } else if (action.type === "EMPLOYEE_WAS_EDITED") {
        // TODO: save to db
        // the same story as with department
        window.location.href = "/#/";
        const employees = state.employees;
        employees[state.selectedEmployeeId].firstName = action.firstName;
        employees[state.selectedEmployeeId].lastName = action.lastName;
        employees[state.selectedEmployeeId].departmentId = action.departmentId;
        return {
            ...state,
            employees
        };
    } else {
        return state;
    }
}

export default reducer;