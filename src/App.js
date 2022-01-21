
import { BrowserRouter as Router, Route, HashRouter, BrowserRouter, Routes,  } from "react-router-dom"
import './App.css';
import Home from './Pages/Home';

import Account from './Pages/Account'
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import SignOut from "./Pages/SignOut";
import UserProfile from "./Pages/UserProfile";
import CompanyRegistration from "./Pages/CompanyRegistration";
import CompanyProfile from './Pages/CompanyProfile';
import { AuthProvider } from '../src/Contexts/AuthContext'




function App() {


  return (
    <div className="App">

      
        <HashRouter>
        <AuthProvider>

          <Routes>
            
            <Route exact path="/"  element={<Home />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/SignOut" element={<SignOut />} />
            <Route path="/UserProfile/:id" element={<UserProfile />} />
            <Route path="/CompanyRegistration" element={<CompanyRegistration />}/>
            <Route path="/CompanyProfile/:id" element={<CompanyProfile />}/>
            
          </Routes>
        </AuthProvider>
        </HashRouter>
      




    </div>
  );
}

export default App;
