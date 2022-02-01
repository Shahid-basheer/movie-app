
import './Posts.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link,useHistory } from 'react-router-dom'
import { Context } from '../../Context/Context'
import { useContext } from 'react'
import {Spinner} from 'react-bootstrap'
const Posts = () => {
    const history = useHistory()
    const [state, setState] = useState([])
    const [view, setView] = useState(false)
    const { setVideo } = useContext(Context)
    const [loading, setLoading] = useState(true)
    var data;
    useEffect(() => {

        axios.get('/admin/retrive-of-movie-data').then((res) => {
            setState(res.data)
              setLoading(false)
        })

    }, [])

    const checkPath = (e) => {
        const path = e.target.href
        const url = path.split('/')[3]

        axios.get('/admin/get-movie/' + url).then((res) => {
            data = JSON.stringify(res.data)
            setVideo({ type: 'video_player_success', payload: data })
            history.push('/player')
        }).catch((err) => {
            setVideo({ type: 'video_player_failure' })

        })
    }

    const Download = (url,name) => {        
            alert('wait for some second to download '+name)
        axios({url:url,method:'GET',responseType: 'blob'}).then((res)=>{
            console.log(res.data)
            
            
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.mp4');
            document.body.appendChild(link);
            link.click();
        }).catch((e)=>{
            console.log(e.response.data)
        })
    }



    const hide = () => {
        document.querySelector('#view').style.display = 'none'
    }

    return (
        <>
        {loading?(<div id='loading-post'>Loading..<Spinner animation="border" variant="warning" /></div>):
        <>
        <div className="header" id='leatest'>
                <hr />
                <span>Leatest Movies</span>
                <hr />
            </div>
          <div className='p-wrapper'>

                {
                    state &&
                    state.map((value, index) => {
                        {
                            if (index < 6) {
                                return (
                                    <div>
                                        <img src={value.images} alt="" />
                                        <h5>{value.MovieName}</h5>
                                        <p>Actor: {value.ActorName}</p>
                                        <p>Producer: {value.ProducerName}</p>
                                        <p>ReleaseDate: {value.ReleaseDate}</p>
                                        <p>Review: {value.Des}</p>
                                        <Link to={value._id} className='btn btn-danger mt-3  btn-posts ' onClick={checkPath}>Watch now</Link>
                                        <Link  className='btn btn-primary mt-3  btn-posts ' onClick={() => {
                                            Download(value.movies,value.MovieName)
                                        }}>Download</Link>

                                    </div>

                                )

                            }

                        }
                    })
                }
                {
                    state.map((value, index) => {
                        {
                            if (view && index > 6) {

                                return (
                                    <div>
                                        <img src={value.images} alt="" />
                                        <h5>{value.MovieName}</h5>
                                        <p>Actor: {value.ActorName}</p>
                                        <p>Producer: {value.ProducerName}</p>
                                        <p>ReleaseDate: {value.ReleaseDate}</p>
                                        <p>Review: {value.Des}</p>
                                        <Link className='btn btn-danger mt-3  btn-posts ' to={value._id} onClick={checkPath}>Watch now</Link>
                                        <Link className='btn btn-primary mt-3  btn-posts ' to={value._id} onClick={checkPath}>Download</Link>
                                    </div>

                                )

                            }



                        }
                    })
                }

                <button id='view' onClick={(e) => {
                    setView(true)
                    hide()
                }
                } >View all</button>
            </div>
        
        </>}
            
            
            <div className="parent-skew">
                <div className="skew">
                    <span id='greetings'>welcome to movie hub!!!</span>
                    <span id='greetings1'>enjoy your life</span>
                </div>
            </div>
            <div className="diagonal" id='about'>
                <img src="https://wallpaperbat.com/img/260945-free-download-hd-wallpaper-search-more-hollywood-movies-high.jpg" alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repudiandae neque molestiae adipisci a facilis, quibusdam perspiciatis
                    eum voluptates! Cupiditate modi obcaecati nulla fugiat dignissimos non illum
                    nemo nobis aut ullam! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
                    inventore recusandae temporibus minus eaque
                    error omnis?repudiandae?</p>
                <hr />
                <i className="fab fa-facebook space-i"></i>
                <i className="fab fa-linkedin "></i>
                <i className="fab fa-instagram "></i>
            </div>

        </>
    )
}

export default Posts
