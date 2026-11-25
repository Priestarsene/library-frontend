import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import LibraryFooter from './components/LibraryFooter'
import LibraryButton from './components/LibraryButton'
import LibraryBooks from './components/LibraryBooks'
import LibraryHeader from './components/LibraryHeader'
import LibraryLogin from './components/LibraryLogin'
import Office from './components/Office'
import OfficeList from './components/OfficeList';
import { Route, Routes } from "react-router";
import Appointment from './components/Appointment'
import Doctor from './components/Doctor'
function App() {

  const [page, setPage] = useState('office');
  

  return (
    // <div>
    //   <LibraryHeader />
    //   <main>
    //        <LibraryBooks />
    //        <LibraryButton />
    //   </main>
    //   <LibraryFooter />
    // </div>
    //<LibraryLogin>
     //<Office />
     <div>
        <nav style={{ marginBottom: '1rem' }}>
        <button onClick={() => setPage('office')}>Manage Office</button>{' '}
        <button onClick={() => setPage('list')}>All Offices</button>
      </nav>

      {page === 'office' && <Office />}
      {page === 'list' && <OfficeList />} 

      <Routes>

        <Route path="/" element={<LibraryLogin/>}/>
        <Route path="/office" element={<Office/>}/>
        <Route path="/books" element={<LibraryBooks/>}/>
        <Route path="*" element={<LibraryLogin/>}/>
        <Route path="/doctor" element={<Doctor/>}/>
        <Route path="/appointment" element={<Appointment/>}/>
      </Routes>
    </div>

  );
}

export default App
