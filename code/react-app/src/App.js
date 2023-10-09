import './App.css';
import EmployeeCard from './components/employeeCard';
import EmployeeSummary from './components/employeeSummary';
import data from '../src/data/sample-data.json'

function App() {

  const loadedData = JSON.stringify(data);
  const companyData = JSON.parse(loadedData);
  return (
    <div className="App">
      <div className='top-nav'>
        <div className='company-name'>{companyData?.companyInfo?.companyName}</div>
        <div className='top-nav-bottom-text'>
          <div>{companyData?.companyInfo?.companyMotto}</div>
          <div>{companyData?.companyInfo?.companyEst.slice(0,10)}</div>
        </div>
      </div>
      <div className='side-nav'></div>
      <EmployeeCard />
      <EmployeeSummary />
    </div>
  );
}

export default App;
