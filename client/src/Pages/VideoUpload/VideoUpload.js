import './VideoUpload.css'
import { useState, useEffect } from 'react'
import { ProgressBar } from 'react-bootstrap'
import axios from 'axios'
import convertSize from "convert-size";


const VideoUpload = () => {
    const [mname, setmname] = useState('')
    const [aname, setaname] = useState('')
    const [pname, setpname] = useState('')
    const [rd, setrd] = useState('')
    const [md, setmd] = useState('')
    const [mi, setmi] = useState(null)
    const [mv, setmv] = useState(null)
    const [percent, setpercent] = useState(0)
    const [fileSize, setFileSize] = useState(null)
    const [fileSizeLoaded, setFileSizeLoaded] = useState(null)


    useEffect(() => {
    window.scroll(0,0)

    }, [percent])

    const Submit = (e) => {
        e.preventDefault()
        let btn = document.querySelector('#btn-reg')
        let err = document.querySelector('#err')
        let success = document.querySelector('#succ')
        let progress_bar = document.querySelector('#video-upload-progress-bar')
        progress_bar.style.display = 'block'
        btn.innerHTML = 'Uploading...'
        success.innerHTML = ''
        err.innerHTML = ''
        btn.disabled = true

        if (mname.trim() == null) {
            btn.disabled = true
            console.log('btn disabled')

        }
        const file = {
            images: null,
            movies: null
        }
        const data = new FormData()
        data.append('file', mi)
        data.append('upload_preset', 'movie-images')

        console.log(mi)
        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                setpercent(Math.floor((loaded * 100) / total))
                setFileSize(convertSize(total))

                setFileSizeLoaded(convertSize(loaded))
                
                console.log(`${loaded}kb of ${total}kb | ${percent}%`);
            }
        }

        axios.post('https://api.cloudinary.com/v1_1/dyaqiakqz/image/upload', data, options).then((res) => {
            console.log(res.data)
            file.images = res.data.secure_url
            setpercent(0)
            data.append('file', mv)
            data.append('upload_preset', 'movie-video')
            axios.post('https://api.cloudinary.com/v1_1/dyaqiakqz/video/upload', data, options).then((res) => {
                console.log(res.data)
                file.movies = res.data.secure_url
            }).catch((e) => {
                console.log(e)
            })
        }).catch((e) => {
            console.log(e)
        })

        const FileCheck = () => {
            if (file.images != null && file.movies != null) {
                clearInterval(interval)
                data.append('MovieName', mname)
                data.append('ActorName', aname)
                data.append('ProducerName', pname)
                data.append('ReleaseDate', rd)
                data.append('Des', md)
                data.append('images', file.images)
                data.append('movies', file.movies)
                axios.post('/admin/upload-of-movie-data', data).then((res) => {
                    console.log(res.data)
                    success.innerHTML = res.data
                    btn.innerHTML = 'Upload'
                    btn.disabled = false
                    progress_bar.style.display = 'none'
                    setFileSize(null)
                    setFileSizeLoaded(null)
                    setpercent(0)
                    document.querySelector('.icon-video-upload').value('')
                }).catch((error) => {
                    btn.innerHTML = 'Upload'
                    btn.disabled = false
                    progress_bar.style.display = 'none'
                    err.innerHTML = error.response.data
                })
            }
        }

        var a = 0
        const interval = setInterval(() => {
            FileCheck()
            console.log(a = a + 1)
        }, 2000);




    }



    return (
        <div className='videoupload'>
            <div className='form-vupload'>
                <form onSubmit={Submit}>
                    <span>Upload your video</span>
                    <ProgressBar id='video-upload-progress-bar' variant="success" style={{ display: 'none' }} animated now={percent} label={`${percent}%`} />
                    {fileSize &&
                        <p>{fileSizeLoaded + "  " + fileSize + " "}</p>
                    }
                    <p id='err'></p>
                    <p id='succ'></p>
                    <input type="text" placeholder='&#xf008; Movie Name' className='icon-video-upload' onChange={e => setmname(e.target.value)} required />
                    <input type="text" placeholder='&#xf183; Actor Name' className='icon-video-upload' onChange={e => setaname(e.target.value)} required />
                    <input type="text" placeholder='&#xf155; Producer Name' className='icon-video-upload' onChange={e => setpname(e.target.value)} required />
                    <input type="number" placeholder='&#xf017; Release Date' className='icon-video-upload' onChange={e => setrd(e.target.value)} required />
                    <input type="text" placeholder='&#xf086; Description' className='icon-video-upload' onChange={e => setmd(e.target.value)} required />
                    <label htmlFor="image">Choose your image <i className="fas fa-plus"></i></label>
                    <input type="file" id='image' name='image' placeholder='Select Video' style={{ display: 'none' }} onChange={(e) => { 
                    if (
                      e.target.files[0].type == "image/png" ||
                      e.target.files[0].type == "image/jpg" ||
                      e.target.files[0].type == "image/jpeg"
                    ) {
                      setmi(e.target.files[0]);
                      console.log(e.target.files[0]);
                    } else {
                      alert("Please upload type of image [jpg,png,jpeg]");
                    } }} required />
                    {
                        mi && (<div className='files'> <img src={URL.createObjectURL(mi)} alt="" />
                            <span>{mi.name}</span><span>Size: {convertSize(mi.size)}</span></div>)
                    }
                    <label htmlFor="video">Choose your video <i className="fas fa-video"></i></label>
                    {
                        mv && (<div className='files'> <video muted={true} autoplay="autoplay" src={URL.createObjectURL(mv)} alt="" /> <span>{mv.name}</span><span>Size: {convertSize(mv.size)}</span></div>)
                    }
                    <input type="file" id='video' name='video' placeholder='Select Video' style={{ display: 'none' }} onChange={e =>e.target.files[0].type=='video/mp4'? setmv(e.target.files[0]):alert('Please upload a mp4 type video')} required />
                    <button type='submit' id='btn-reg'>
                        Upload
                    </button>
                </form>
            </div>
        </div>
    )
}

export default VideoUpload
