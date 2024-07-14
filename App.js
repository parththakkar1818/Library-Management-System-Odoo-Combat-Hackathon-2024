import React from "react";
import "./App.css";
// import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Books from "./components/Books.jsx";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import DashBoard from "./components/DashBoard.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import UserBooks from "./components/UserBooks.jsx";
import Fine from "./components/Fine.jsx";
import BookDetail from "./components/BookDetail.jsx";

function Layout (){
  // const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  return true ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-[#020926] sticky top-0 hidden md:block'>
        <Sidebar/>
      </div>
      <div className='flex-1 overflow-y-auto no-scrollbar'>
        <Navbar/>
        <div className='p-4 2xl:px-10'>
          <Outlet /> 
        </div>
      </div>
    </div>
  ):(
    // <Navigate to='/log-in' state={{ from: location }} replace />
    null
  );
}

function App() {
  return (
    <>
    <main className='w-full min-h-screen bg-[#f3f4f6]'>
    <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<Navigate to='/home'/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/books' element={<Books/>}/>
          <Route path='user/books' element={<UserBooks/>}/>
          <Route path='/phsp' element={<Books/>}/>
          <Route path='/scifi' element={<Books/>}/>
          <Route path='/fantasy' element={<Books/>}/>
          <Route path='/mystery' element={<Books/>}/>
          <Route path='/romance' element={<Books/>}/>
          <Route path='/horror' element={<Books/>}/>
          <Route path='/thriller' element={<Books/>}/>
          <Route path='/book/:status' element={<BookDetail/>}/>

          <Route path='/fine/:status' element={<Fine/>}/>


        </Route>
        {/* <Route path='/log-in' element={<Login/>}/> */}
    </Routes>
        {/* <Toaster richColors  /> */}
  </main>
  </>
  );
}

export default App;
