import { useState } from 'react';
import './App.css';

import Login from './components/auth/Login';
import Home from './components/home/Home';
import Header from './components/navbar/Header';
import DataProvider from './context/DataProvider';
import DetailView from './components/details/DeatilView';
import {BrowserRouter,Routes,Route, Navigate, Outlet} from 'react-router-dom'
import CreatePost from './components/create/CreatePost';
import UpdatePost from './components/create/UpdatePost';

const PrivateRoute=({isAuthenticated,...props})=>{
  return isAuthenticated?
    <>
      <Header/>
      <Outlet/>
    </>
    :
    <>
      <Navigate replace to='/login'/>
    </>
}



function App() {
  const [isAuthenticated,isUserAuthenticated]=useState(false)
  return (
    <div>
      <BrowserRouter>
        <DataProvider>
          <div style={{marginTop:64}}>
            <Routes>
              <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>}/>

              {/* to home */}
              <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                <Route path='/' element={<Home/>}/>
              </Route>
              {/* to create post */}
              <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                <Route path='/create' element={<CreatePost/>}/>
              </Route>

              {/* to see details of paticular post */}
              <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                <Route path='/details/:id' element={<DetailView/>}/>
              </Route>

              {/* to update a post */}
              <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                <Route path='/update/:id' element={<UpdatePost/>}/>
              </Route>

            </Routes>
          </div>
        </DataProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
