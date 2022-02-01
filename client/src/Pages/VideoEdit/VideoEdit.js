import  './VideoEdit.css'
import  {useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'



const VideoEdit = () => {
    
    const [state, setstate] = useState([])
    const [mname, setmname] = useState('')
    const [aname, setaname] = useState('')
    const [pname, setpname] = useState('')
    const [rd, setrd] = useState('')
    const [md, setmd] = useState('')
    const location =  useLocation()
    const path = location.pathname.split('/')[2]



    useEffect(() => {
        axios.get('/admin/get-movie/'+path).then((res)=>{
                setmname(res.data.MovieName)
                setaname(res.data.ActorName)
                setpname(res.data.ProducerName)
                setrd(res.data.ReleaseDate)
                setmd(res.data.Des)
                })
        

               window.scroll(0,0)

    }, [])


    
    const Update = (e) => {
        e.preventDefault()
        let btn = document.querySelector('#btn-reg')
        let err = document.querySelector('#err')
        let success = document.querySelector('#succ')
        btn.innerHTML='Updating...'
        success.innerHTML=''
        err.innerHTML=''
        btn.disabled=true
      
        if(mname.trim()==null){
         btn.disabled=true
         console.log('btn disabled')

        }
        const data = new FormData()
        data.append('MovieName', mname)
        data.append('ActorName', aname)
        data.append('ProducerName', pname)
        data.append('ReleaseDate', rd)
        data.append('Des', md)
        

   
        axios.put('/admin/edit-movie/'+path,data).then((res) => {
            console.log(res)
            success.innerHTML=res.data
            btn.innerHTML='Update'
            btn.disabled=false
        }).catch((error) => {
            btn.innerHTML='Update'
            btn.disabled=false
            console.log(error.response.data)
        err.innerHTML=error.response.data
        })
    }


    return (
        <div className='video-edit'>
        <div className='video-edit-form'>
        <form onSubmit={Update}>
        <span>Update your video description</span>
        <input type="text" placeholder='&#xf008; Movie Name ' value={mname} className='icon-video-upload' onChange={e => setmname(e.target.value)} required />
        <input type="text" placeholder='&#xf183; Actor Name' value={aname} className='icon-video-upload' onChange={e => setaname(e.target.value)}required />
        <input type="text" placeholder='&#xf155; Producer Name' value={pname} className='icon-video-upload' onChange={e => setpname(e.target.value)}required />
        <input type="number" placeholder='&#xf017; Release Date' value={rd} className='icon-video-upload' onChange={e => setrd(e.target.value)}required />
        <input type="text" placeholder='&#xf086; Description' value={md} className='icon-video-upload' onChange={e => setmd(e.target.value)}required />
        <button  type='submit' id='btn-reg'>
        Update
        </button>
        <p id='err'></p>
        <p id='succ'></p>
    </form>
        </div>
        </div>
    )
}

export default VideoEdit
