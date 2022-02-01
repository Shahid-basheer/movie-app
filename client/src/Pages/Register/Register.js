import './Register.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const Register = () => {
    const uName = useRef()
    const email = useRef()
    const phone = useRef()
    const pass = useRef()
    const cPass = useRef()
    const [status, setStatus] = useState(false)
    const [checkName, setCheckName] = useState('')
    const [checkEmail, setCheckEmail] = useState('')
    const [checkNumber, setCheckNumber] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [nameError, setNameError] = useState(false)
    const [numberError, setNumberError] = useState(false)
    const [regError, setRegError] = useState('')



    useEffect(() => {
        console.log('rendering...')


    }, [status, disabled, checkName, checkEmail, checkNumber, phone])

    const CheckFiled = (e) => {
        if (email.current.value.trim() && pass.current.value.trim() && phone.current.value.trim()
            && cPass.current.value.trim() && uName.current.value.trim()) {
            if (pass.current.value == cPass.current.value && checkName == null && checkEmail == null && checkNumber == null && uName.current.value.length > 5 && phone.current.value.length > 9) {
                console.log('kkkkkkkk')
                console.log('inside if...')
                setDisabled(false)
            } else {
                setDisabled(true)
                console.log('outside if...')
            }

            if (pass.current.value == cPass.current.value) {
                setStatus(false)
            } else {
                setStatus(true)
            }


        }


    }

    const CheckName = (e) => {
        if (e.target.value.trim()) {
            if (e.target.value.length < 6) {
                setNameError(true)

            } else {
                setNameError(false)
            }
            axios.get('/checkname/' + e.target.value).then((res) => {
                setCheckName(res.data)

            })


        }

    }

    const CheckEmail = (e) => {
        if (e.target.value.trim()) {
            axios.get('/checkemail/' + e.target.value + "@gmail.com").then((res) => {
                setCheckEmail(res.data)

            })


        }
    }
    const CheckNumber = (e) => {
        if (e.target.value.trim()) {
            if (e.target.value.length <= 9) {
                setNumberError(true)
            } else {
                setNumberError(false)
            }
            axios.get('/checknumber/' + e.target.value).then((res) => {
                setCheckNumber(res.data)
            })


        }
    }




    const Submit = (e) => {
        e.preventDefault()
        var loading = document.querySelector('#btn-loading-register')
        loading.className = 'fa fa-circle-o-notch fa-spin'
        const gmail = '@gmail.com';

        const data = {
            userName: uName.current.value,
            email: email.current.value + gmail,
            phone: phone.current.value,
            password: pass.current.value,
        }
        console.log(data)
        axios.post('/user-register', data).then((res) => {
            window.location.replace('/login')
        }).catch((e) => {
            console.log(e.response.data)
            setRegError(e.response.data)
        })



    }

    const style = {
        fontFamily: 'FontAwesome'
    }



    return (
        <>
            <div className="wrapper-register">
                <div className='register'>
                    <span id='form-heading'>Register</span>

                   {
                       regError && <p id='err'>{regError}</p>
                   } 
                   
                    {checkName && <h1 className='check-name'>This username is alredy exist.<br /> try another word</h1>}
                    {checkEmail && <h1 className='check-name'>Sorry!!! This email is alredy exist.</h1>}
                    {checkNumber && <h1 className='check-name'>This number is alredy exist.<br /> try another number</h1>}
                    {status ? <h1 className='check-name'>Password not match</h1> : ''}
                    {nameError && <h1 className='check-name'>Please enter atleast 6 character!</h1>}
                    {numberError && <h1 className='check-name'>Please enter atleast 10 digit!</h1>}

                    <form onSubmit={Submit}>
                        <input type="text" style={style} placeholder='&#xf007; User Name' ref={uName} required onChange={(e) => {
                            CheckFiled(e)
                            CheckName(e)
                        }} />
                        <input type="text" style={style} placeholder='&#xf0e0; Email' ref={email} required onChange={(e) => {
                            CheckFiled(e)
                            CheckEmail(e)
                        }} onKeyPress={(e) => { if (e.key == '@' || e.key == '.') { e.preventDefault() } }} />
                        <span id='form-gmail'>@gmail.com</span>
                        <input type="number" style={style} placeholder='&#xf095; Phone' ref={phone} required onChange={(e) => {
                            CheckFiled(e)
                            CheckNumber(e)
                        }} />
                        <input type="password" style={style} placeholder='&#xf023; Password' ref={pass} required onChange={(e) => { CheckFiled(e) }} />
                        <input type="password" style={style} placeholder='&#xf023; Confirm Password' ref={cPass} required onChange={(e) => { CheckFiled(e) }} />
                        <button type='submit' disabled={disabled} id='btn-reg'>
                            <i id='btn-loading-register'></i>
                            Register
                        </button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Register
