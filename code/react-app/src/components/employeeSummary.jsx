import React, {useState, useEffect, useRef} from 'react';
import Table from 'react-bootstrap/Table';
import employeeData from '../data/sample-data.json'
import EmployeeDetails from './employeeDetails';


const EmployeeSummary = () => {
    const tableRef = useRef()
    const [empData, setEmpData] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [employeeToShow, setEmployeeToShow] = useState(0)

    useEffect(() => {
        const loadedData = JSON.stringify(employeeData);
        const tableData = JSON.parse(loadedData);
        // console.log('loadedData: ', loadedData)
        // console.log('tableData: ', tableData)
        setEmpData((oldData) => {
            // console.log('inside setEmpData: ', tableData)
            return (tableData)})
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
            console.log('empData: ', empData)
            console.log('arg: ', arg)
            setEmployeeToShow((x) => arg)
            setOpenModal(true)
        }
        if(openModal){
            setOpenModal(false)
        }
     }

  return (
    <>
    {openModal && 
        <EmployeeDetails 
            className='employeeModalContainer'
            empDetailData={empData?.employees} indx={employeeToShow}  
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
            empData?.employees?.map((each, indx) => {
                return (
                    <>
                    {/* <Card body> */}
                        {/* <div> */}
                    <tr 
                        key={indx}
                        onClick={() => getEmployeeDetail(indx)}
                        >
                        <td onClick={(each) => console.log(each.id, each.address)}>{each.id}</td>
                        <td><img src={each.avatar} />{each.firstName} {each.lastName}</td>
                        <td>{each.contactNo}</td>
                        <td>{each.address}</td>
                        
                        
                    </tr>
                    {/* </Card> */}
                    {/* </div> */}
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