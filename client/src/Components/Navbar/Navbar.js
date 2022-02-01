import './Navbar.css'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/Context'
import { useContext,useState,useEffect } from 'react'
const Navbar = (props) => {
    const {user,dispatch} = useContext(Context)
    const user_details = JSON.parse(user)
    const [state, setstate] = useState(false)
    
    
    useEffect(() => {
        if(user_details){
            if(user_details.userName=='admins'){
                setstate(true)
            }else{
                setstate(false)
            }
        }
       
    }, [state,user_details])

    const Toggle = (e) => {
        
        if(window.outerWidth<=800){
            console.log(window.outerWidth)
            const ul = document.querySelector('.ul-tag')
            const btn = document.querySelector('.toggle')
            if (ul.style.marginLeft === '-100%') {
                ul.style.marginLeft = '0%'
                btn.style.color = 'gray'
            } else {
                ul.style.marginLeft = '-100%'
                btn.style.color='blue'
            }
        }
    }


    const HandleLogout = ()=>{
    dispatch({type:'user_logout'})
    }


    return (
        <>
            <div className='Navbar'>
            <nav>
            <i className="fab fa-facebook social-icon "></i>
            <i className="fab fa-linkedin social-icon "></i>
            <i className="fab fa-instagram social-icon"></i> 
            <ul className='ul-tag'>
            <Link to='/#home' onClick={Toggle}  className='decoration'><li>Home</li></Link>
            <a href='/#leatest' onClick={Toggle} className='decoration'><li>Category</li></a>
            <a href='/#about' onClick={Toggle} className='decoration'><li>About</li></a>
            {state &&(<div style={{display:'inline'}}> <Link to='/movieUpload' onClick={Toggle} className='decoration'><li>Upload</li></Link>
            <Link to='/get-users' onClick={Toggle} className='decoration'><li>Users</li></Link>
             <Link to='/movieDelete' onClick={Toggle} className='decoration'><li>Delete</li></Link></div>)}
            {user_details? <li onClick={Toggle} onClick={HandleLogout}>Logout</li>:
                <div style={{display:'inline'}}>
                <Link to='/register' onClick={Toggle} className='decoration'><li>Register</li></Link>
                <Link to='/login' onClick={Toggle} className='decoration'><li>Login</li></Link>
                    </div>
                }
                    
                    </ul>
                    <i onClick={Toggle} className="fas fa-toggle-off toggle toggle-btn"></i>
                </nav>
          


            </div>
            
             
            
        </>
    )
}

export default Navbar
