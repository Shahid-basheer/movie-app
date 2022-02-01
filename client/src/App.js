import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar/Navbar';
import Register from './Pages/Register/Register';

import { Route,Switch} from 'react-router-dom'
import Login from './Pages/Login/Login';
import Player from './Pages/VideoPlayer/Player';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import VideoUpload from './Pages/VideoUpload/VideoUpload';
import {Context} from '../src/Context/Context'
import { useContext,useEffect,useState } from 'react';
import VideoDelete from './Pages/VideoDelete/VideoDelete';
import Users from './Pages/Users/Users';
import VideoEdit from './Pages/VideoEdit/VideoEdit';




function App() {
  const [status, setstatus] = useState(true)
  const {user} = useContext(Context)
  const user_details = JSON.parse(user)
  
  useEffect(() => {
    
      setTimeout(()=>{

        setstatus(false)
      },3000)
    
    
  }, [])
  


  return (
    <div className="App">
      {status ? (
        <div className="loading-component">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route
              path="/register"
              component={user_details ? Home : Register}
            />
            <Route path="/login" component={user_details ? Home : Login} />
            <Route path="/player" component={user_details ? Player : Login} />
            <Route
              path="/movieUpload"
              component={user_details?.userName == "admins" ? VideoUpload :Home }
            />
            <Route path="/movieDelete" component={user_details?.userName == "admins"  ? VideoDelete :Home } />
            <Route path="/get-users" component={user_details?.userName == "admins"  ? Users : Home} />
            <Route path="/movieUpdate/:id" component={user_details?.userName == "admins" ?VideoEdit:Home} />
            <Route path="/:id" component={Home} />
          </Switch>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
