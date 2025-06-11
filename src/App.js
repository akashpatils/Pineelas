import './App.css';
import './css/style.css';
import 'hexalytics-ui-components/lib/style.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Homepage from './components/Homepage';
import Department from './components/Department';
import DepartmentDetail from './components/Department_details';
import VendorsDetail from './components/Vendors_details';
import Vendors from './components/Vendors';
import Categories from './components/Categories';
import CategoriesDetail from './components/Categories_details';
import Payrollexpenses from './components/Payrollexpenses';
import Topnav from "./components/layouts/topnav";

function App() {
  return (
    <Router>
      <HelmetProvider>
        <Toaster />
        <Topnav />
        <Routes>
          {/* <Route path='/' index element={<Login />} /> */}
          <Route path='/' index element={<Homepage />} />
          {/* <Route path='/home' index element={<Homepage />} /> */}
          <Route path='/department' index element={<Department />} />
          <Route path='/department_details' index element={<DepartmentDetail />} />
          <Route path='/vendors' index element={<Vendors />} />
          <Route path='/vendors_details' index element={<VendorsDetail />} />
          <Route path='/categories' index element={<Categories />} />
          <Route path='/categories_details' index element={<CategoriesDetail />} />
          <Route path='/payrollexpenses' index element={<Payrollexpenses />} />
         
        </Routes>
      </HelmetProvider>
    </Router>
  );
}

export default App;
