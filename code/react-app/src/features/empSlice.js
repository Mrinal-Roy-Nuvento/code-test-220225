import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        isLoading: false,
        selectedEmployee: {},
        allEmployees: []
    },
    reducers: {
        allEmployees: (state, action) => {
            console.log('inside allEmployees reducer: ', action.payload)
            state.allEmployees = action.payload
        },
        selectEmployee: (state, action) => {
            console.log('inside employeeSlice selectOption: ', 'state: ',state, 'action: ', action)
            state.selectedEmployee = state.allEmployees[action.payload];
            state.isLoading = false
        },
        unselectEmployee: (state, action) => {
            state.selectedEmployee = {};
            state.isLoading= false

        },
    },
    extraReducers: {
    }
    })

export const {selectEmployee, unselectEmployee, allEmployees} = employeeSlice.actions

export default employeeSlice.reducer