import React,{useRef} from 'react'
import './component.css'

const EmployeeDetails = ({empDetailData, indx, setOpenModal}) => {
    const modalRef = useRef()
    
    console.log('empDetailData: ', empDetailData, indx)
  return (
    <>
    {
        empDetailData?.length>0 && <div ref={modalRef} onClick={(e) => {
            console.log('modalRef clicked: ', modalRef.current)
            console.log('e.target clicked: ', e.target)}} className='employeeModalContainer' >
        <div className="top-row">
            <div className='top-image'>
                <img src={empDetailData[indx].avatar} />
            </div>
            <div className='top-text'>
                <div style={{position: 'relative', bottom: '-60%', fontSize: '20px'}}>
                {/* <p style={{position: "relative", bottom: "12%"}}> */}
                    <strong><u>{empDetailData[[indx]].firstName} {empDetailData[[indx]].lastName}</u></strong>
                    {/* </p> */}
                    </div>
            </div>
        </div>
        <div className="bottom-row">
            <div className="bottom-left">
                <p style={{fontSize: '10px'}}>{empDetailData[[indx]].jobTitle}</p>
                <p style={{fontSize: '10px'}}>{empDetailData[[indx]].age}</p>
                <p style={{fontSize: '10px'}}>{empDetailData[[indx]].dateJoined.slice(0,10)}</p>
            </div>
            <div className="bottom-right">
            <p style={{fontSize: '14px'}}>{empDetailData[[indx]].bio}</p>
            </div>
        </div>

        <button style={{ backgroundColor: 'transparent', border: 'none', position: 'absolute', top: '-4%', right: '0%', cursor: 'pointer'}}
                onClick={() => setOpenModal(false)}
            >
            <i class="bi bi-x-lg"></i>
            <p style={{fontSize: '18px'}}>X</p>
            </button>
    </div>}</>
  )
}

export default EmployeeDetails