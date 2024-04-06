import PropertyDetails from './components/PropertyDetails';
import RoomDetails from "./components/RoomDetails";
import Rooms from "./components/Rooms";
import UploadPhotos from "./components/UploadPhotos"
import Policies from "./components/PropertyPolicies";
import PropertyContext from "./context/PropertyContext";
import { useReducer } from "react";
import FinanceAndLegal from "./components/FinanceLegal";
import RegistartionForm from './Components/userRegistration/RegistrationPage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import OTPVerification from './Components/userRegistration/OtpVerification';
import LoginPage from './Components/userRegistration/LogInPage';
import ForgotPassword from './Components/userRegistration/ForgotPassword';
import OwnerDashBoard from "./Components/DashBoards/ownerDashboard"
import HomePage from './Components/HomePage';

function PropertyReducer(state,action){
  switch(action.type){
      case 'ADD_PROPERTY_DETAILS':{
          return {...state,propertyData:{...state.propertyData,...action.payload}}
      }
      case 'ADD_AMENITIES':{
        return {...state,amenities:action.payload}
      }
      case 'ADD_ROOM_DETAILS':{
        return {...state,roomTypes:[...state.roomTypes,{...action.payload}]}
      }
      case 'ADD_GEOLOCATION':{
        return {...state,geoLocation:{...action.payload}}
      }
      case 'ADD_PACKAGES':{
        return {...state,packages:[...state.packages,action.payload]}
      }
      default :{
          return {...state}
      }
  }
  

}
  const initialState = {
    propertyData:{},
    amenities:[],
    packages:[],
    geoLocation:{},
    roomTypes:[]
  }
  
  
export default function App(){
  const [resort,resortDispatch] = useReducer(PropertyReducer,initialState)
    return(
        <>
        <h2>Resortify</h2>
        <BrowserRouter>
        <PropertyContext.Provider value={{resort, resortDispatch}} >
        <Routes>
      <Route path="/" element={<HomePage />} />
                <Route path='/registration-page' element={<RegistartionForm />}/>
                <Route path='/emailVerification' element={<OTPVerification />} />
                <Route path='/loginPage' element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/owner-dashobard" element={<OwnerDashBoard />} />
           <Route path="/properties-details" element={<PropertyDetails/>}/> 
           <Route path="/room-amenities" element={<RoomDetails />} /> 
          <Route path="/add-rooms" element={<Rooms/>} />
          <Route path="/upload-photos" element={<UploadPhotos />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/finance-and-legal" element={<FinanceAndLegal />} />
          </Routes>
          </PropertyContext.Provider>
        </BrowserRouter>
        </>
    )
}