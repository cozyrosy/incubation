import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ApplicationPage from './pages/ApplicationPage';
import SignUp from './pages/SignUp';
import AdminLogin from './pages/Admin/AdminLogin';
import Sidebar from './pages/Admin/Sidebar';
import ListApplications from './pages/Admin/ListApplications';
import Approved from './pages/Admin/Approved';
import Declined from './pages/Admin/Declined';
import Booking from './pages/Admin/Booking';
import Record from './pages/Admin/Record';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
         
          
            <Routes>
              <Route element={<HomePage/>} path="/home" />
              <Route element={<LoginPage/>} exact path="/"/>
              <Route element={<ApplicationPage/>}  path="/application"/>
              <Route element={<SignUp/>}  path="/signup"/>
            </Routes>
              {/* Admin  */}
            <Routes>
              <Route element={<AdminLogin/>} path="/adminLogin" />
              <Route element={<Sidebar/>} path="/sidebar">
              <Route element={<Approved/>} path="approved" />
              <Route element={<Declined/>} path="declined" />
              <Route element={<Booking/>} path="booking" />
              <Route element={<Record/>} path="record" />

              <Route element={<ListApplications/>} path="listapplications" />
              </Route>

            </Routes>
           
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
