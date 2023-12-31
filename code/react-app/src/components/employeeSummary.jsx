import React, {useState, useEffect, useRef} from 'react';
import Table from 'react-bootstrap/Table';
import employeeData from '../data/sample-data.json'
import EmployeeDetails from './employeeDetails';
import { useDispatch, useSelector } from 'react-redux';
import { allEmployees, selectEmployee, searchFunction } from '../features/empSlice';
import { loadData } from '../features/empSlice';
import axios from 'axios'

const EmployeeSummary = () => {
    const employeeReduxStore = useSelector((state) => state)
    const dispatch = useDispatch();
    const tableRef = useRef()
    const [empData, setEmpData] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [employeeToShow, setEmployeeToShow] = useState(0)

    useEffect(() => {
        dispatch(loadData())  //used redux dispatch for laoding data from local
        
        const loadedData = JSON.stringify(employeeData);
        const tableData = JSON.parse(loadedData);
        // console.log('loadedData: ', loadedData)
        // console.log('tableData: ', tableData)
        setEmpData((oldData) => {
            
            // console.log('inside setEmpData: ', tableData)
            dispatch(allEmployees(employeeReduxStore?.employee?.empData?.employees))
            return (employeeReduxStore?.employee?.empData)})
    }, [])

    const handleTableClick = (e) => { 
        if(openModal){
            if(tableRef.current || (!tableRef.current).contains(e.target)){
                setOpenModal(false)
            }
        } 
     }

    const getEmployeeDetail = (arg) => {
        if(!openModal)
        {
            console.log('empData: ', employeeReduxStore?.employee?.empData)
            console.log('arg: ', arg)
            dispatch(selectEmployee(arg))
            setEmployeeToShow((x) => arg)
            setOpenModal(true)
        }
        if(openModal){
            setOpenModal(false)
        }
     }

    const handleSearch = (e) => {
        console.log(e.target.value)
        dispatch(searchFunction({searchFor: e.target.value, dataToSearch: employeeReduxStore?.employee?.empData?.employees}))
    }

  return (
    <>
    <div><input 
            type="search" 
            placeholder='Search' 
            style={{position: "absolute",border: "2px red solid",top: "90px", right:"50px", width: "200px", height: "40px"}}
            onChange={handleSearch}
            >
                </input></div>
    {openModal && 
        <EmployeeDetails 
            className='employeeModalContainer'
            empDetailData={employeeReduxStore?.employee?.empData?.employees} indx={employeeToShow}  
            setOpenModal={setOpenModal}
            />}
            <div ref={tableRef} onClick={(e) => handleTableClick(e)} className='table-data'>
        <table >
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Contact No</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody hover>
        
        {
            employeeReduxStore?.employee?.searchedEmployee.length===0 ? employeeReduxStore?.employee?.empData?.employees?.map((each, indx) => {
                return (
                    <>
                    <tr 
                        key={indx}
                        onClick={() => getEmployeeDetail(indx)}
                        >
                        <td onClick={(each) => console.log(each.id, each.address)}>{each.id}</td>
                        <td><img src={each.avatar} />{each.firstName} {each.lastName}</td>
                        <td>{each.contactNo}</td>
                        <td>{each.address}</td>
                    </tr>
                    </>
                    
                )
            }) : employeeReduxStore?.employee?.searchedEmployee?.map((each, indx) => {
                return (
                    <>
                    <tr 
                        key={indx}
                        onClick={() => getEmployeeDetail(indx)}
                        >
                        <td onClick={(each) => console.log(each.id, each.address)}>{each.id}</td>
                        <td><img src={each.avatar} />{each.firstName} {each.lastName}</td>
                        <td>{each.contactNo}</td>
                        <td>{each.address}</td>
                    </tr>
                    </>
                    
                )
            })
        }
        
        
      </tbody>
    </table>
    </div>

    </>
  )
}

export default EmployeeSummary