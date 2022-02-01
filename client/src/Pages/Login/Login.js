import './Login.css'
import { useState, useEffect,useRef,useContext } from 'react'
import axios from 'axios'
import {Context} from '../../Context/Context'
const Login = () => {
    const {user,dispatch} = useContext(Context)
    const [error, setError] = useState('')
    const email = useRef()
    const password = useRef()
    const [disabled, setdisabled] = useState(true)
    const user_details = JSON.parse(user)
    
    useEffect(() => {
       
    }, [disabled,password,email])
    
    
    const CheckFiled = (e) => {
        
        
        if (email.current.value.trim() && password.current.value.trim()) {
           
            setdisabled(false)
            
        } else {
            setdisabled(true)
        }
    }
    
    
    
        const Submit = (e) => {
            e.preventDefault()
            var i = document.querySelector('#btn-loading')
            i.className = 'fa fa-circle-o-notch fa-spin'
            const data = {
                email:email.current.value+'@gmail.com',
                password:password.current.value
            }
    
            axios.post('/user-login',data).then((res)=>{
                let response = JSON.stringify(res.data)
                dispatch({type:'user_login_success',user:response})
            }).catch((e)=>{
                i.classList.remove('fa','fa-circle-o-notch','fa-spin')
                setError(e.response.data)
                console.log(e.response.data)
            })
            
        }
    

    return (
        <>

            <div className='login-wrapper'>
                <div className="login">
                    <span id="login-text">Login</span>
                   {error && <p id='error-login'>{error}</p>}
                    <form onSubmit={Submit} autoComplete="on">
                        <input type="text" id='eml' ref={email} onKeyDown={(e)=>{if(e.key=='@' ||e.key== '.' || e.which==229){e.preventDefault() 
                            e.preventDefault()}}} onChange={(e) => {CheckFiled() }} style={{ fontFamily: 'FontAwesome' }} placeholder='&#xf0e0; Email ' required />
                        <span id='gmail'>@gmail.com</span>
                        <input type="password" id='pas' ref={password} onChange={(e) => {CheckFiled()}} style={{ fontFamily: 'FontAwesome' }} placeholder='&#xf023; Password' />
                        <button type="submit" id='login-btn' className="button button__text" disabled={disabled}>
                            <i id='btn-loading'></i> Login
                        </button>


                    </form>
                    <span id='forgote-text'>Forgot Password? </span>
                </div>
            </div>
        </>
    )
}

export default Login
