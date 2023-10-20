import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const loadData = createAsyncThunk(
    "load/employeeData",
    async (data, thunkAPI) => {
      try {
        const response = await axios.get(`sample-data.json`);
        // console.log('response in verifyToken: ', response)
        return response;
      } catch (err) {
        console.log(err);
        thunkAPI.rejectWithValue(err);
      }
    }
  );

export const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        isLoading: false,
        selectedEmployee: {},
        allEmployees: [],
        searchedEmployee: []
    },
    reducers: {
        allEmployees: (state, action) => {
            console.log('inside allEmployees reducer: ', action.payload)
            state.allEmployees = action.payload
        },
        selectEmployee: (state, action) => {
            console.log('inside employeeSlice selectOption: ', 'state: ',state, 'action: ', action)
            state.selectedEmployee = state?.employee?.empdata[action.payload];
            state.isLoading = false
        },
        unselectEmployee: (state, action) => {
            state.selectedEmployee = {};
            state.isLoading= false
        },
        searchFunction: (state, action) => {
            console.log('searchFunction: ', action)
            const searchItems = action?.payload?.dataToSearch?.filter((each) => {
                console.log(each.firstName, each.lastName, each.firstName.includes(action.payload.searchFor) || each.lastName.includes(action.payload.searchFor))
                return (each.firstName.includes(action.payload.searchFor) || each.firstName.includes(action.payload.searchFor))
            });
            console.log('searchItems: ', searchItems)
            state.searchedEmployee = searchItems
        }
    },
    extraReducers: {
          [loadData.pending]: (state, action) => {
            state.isLoading = true;
            state.empData = false;
          },
          [loadData.fulfilled]: (state, action) => {
            state.empData = action?.payload?.data;
            state.isLoading = false;
          },
          [loadData.rejected]: (state, action) => {
            state.isError = true;
          },
    }
    })

export const {selectEmployee, unselectEmployee, allEmployees, searchFunction} = employeeSlice.actions

export default employeeSlice.reducer