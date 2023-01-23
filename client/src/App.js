import {createBrowserRouter, Outlet, RouterProvider, Navigate } from "react-router-dom";
import './styles/style.scss'

import Navbar from './components/Navbar/Navbar'
import Rightbar from './components/Rightbar/Rightbar'
import Header from "./components/Header/Header";

import Connexion from './pages/Connexion';
import Home from './pages/Home';
import Posted from "./pages/Posted";
import Contacts from "./pages/Contacts";
import Profil from "./pages/Profil";




import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'



function App() {

  const {currentUser} = useContext(AuthContext)

  const queryClient = new QueryClient()


  const RouteProtected = ({children}) => {
      if(!currentUser){
          return <Navigate to='/login' />
      }
      return children;
  }
  
  const Layout =() => {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <Header />
          <div style={{display:'flex'}}>
            <Navbar />
            <div style={{flex: 6}}>
              <Outlet />
            </div>  
            <Rightbar />
          </div>
        </div>
      </QueryClientProvider>
      
    )
  }

  const router = createBrowserRouter([
    {
      path:'/',
      element: <Layout />,
      children:[
        {
          path:'/',
          element:<RouteProtected><Home/></RouteProtected>,
        },
        {
          path:'/mespublications',
          element:<RouteProtected><Posted/></RouteProtected>,
        },
        {
          path:'/contacts',
          element:<RouteProtected><Contacts/></RouteProtected>,
        },
        {
          path:'/profil/:id',
          element:<RouteProtected><Profil/></RouteProtected>,
        },
        
        
      ]
    },
    {
      path:'/login',
      element: <Connexion />
    }
  ]);
  return (
    <div className="App">
          <RouterProvider router={router} />
    </div>
  );
}

export default App;
