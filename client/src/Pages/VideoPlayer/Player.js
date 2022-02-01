import './Player.css'
import ReactPlayer from 'react-player'
import { Context } from '../../Context/Context'
import { useContext, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link,useHistory } from 'react-router-dom'
import {Alert} from 'react-bootstrap'
import {format} from 'timeago.js'


const Player = (data) => {
    const comment = useRef()
    const history = useHistory()
    const { video, user } = useContext(Context)
    const video_details = JSON.parse(video)

    const [state, setState] = useState([])
    const [comments, setComments] = useState([])
    const [status, setStatus] = useState('')
    

    const { setVideo } = useContext(Context)
    var data;

    useEffect(() => {
         window.scroll(0,0)
        axios.get('/admin/retrive-of-movie-data').then((res) => {
            setState(res.data)

        })
        axios.get('/get-comment/' + video_details._id).then((res) => {
            console.log(res.data)
            setComments(res.data)

        })

    }, [status])

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


    const Download = (e,url) => {
        e.preventDefault()
        // axios({
        //     url: url, //your url
        //     method: 'GET',
        //     responseType: 'blob', // important
        // }).then((response) => {
        //     const url = window.URL.createObjectURL(new Blob([response.data]));
        //     const link = document.createElement('a');
        //     link.href = url;
        //     link.setAttribute('download', 'file.mp4'); //or any other extension
        //     document.body.appendChild(link);
        //     link.click();
        // });
        window.location.href = url
        window.location.href.delete(url)
    }





    const Publish = (e) => {
        e.preventDefault()
        
        var btn = document.querySelector('#publish-comment')
        document.querySelector('#publish-btn')        
        const users = JSON.parse(user)
        const userD = {
            videoId: video_details._id,
            userName: users.userName,
            email: users.email,
            comment: comment.current.value
        }
        document.querySelector('#comment-box').value=''
        
        if(userD.comment){
        btn.classList.add('fa','fa-circle-o-notch','fa-spin','color-publish')
        axios.post('/register-comment', userD).then((res) => {
            setStatus(res.data)
            document.querySelector('#alert-comment').style.display='block'
            document.querySelector('#publish-comment').classList.remove('fa','fa-circle-o-notch','fa-spin','color-publish')
            setTimeout(() => {
                document.querySelector('#alert-comment').style.display='none'
            }, 3000);
        })
            
        }

    }

    return (
        <>
            <div className="player-wrapper">
                <div className='player'>
                    <ReactPlayer url={video_details.movies}
                        width='100%'
                        height='50vh'
                        playing={true}
                        volume='1'
                        controls='true'
                    />

                    <h3 className='player-details'>Movies Name : {video_details.MovieName}</h3>
                    <p className='player-details'>Actor : {video_details.ActorName}</p>
                    <p className='player-details'>Producer : {video_details.ProducerName}</p>
                    <p className='player-details'>Release Year : {video_details.ReleaseDate}</p>
                    <p className='player-details'>Category : {video_details.Des}</p>
                    <Alert style={{ width: '90%', left: '4%', display:"none", transition: '0.9s' }} id='alert-comment' variant='success'>
                            Successfully Commented...
                        </Alert>
                    <div className="comment-box">
                        <form onSubmit={Publish}>
                            <textarea name="comments" id="comment-box" cols="30" rows="1" placeholder='Type your comment ...'  ref={comment}></textarea>
                            <button id='publish-btn'><i id='publish-comment'></i> Publish</button>
                        </form>
                    </div>

                    <div className="comment-list">
                        {comments && comments.map((value) => {
                            return (
                                <div className='comment-loop'>
                                    <h4>{value.userName}</h4>
                                    <span id='date-comment-box'>{format(value.createdAt)}</span>
                                    <p style={{ color: '#fff' }}>{value.comment}</p>
                                </div>
                            )
                        })}
                    </div>

                </div>
                <div className='recommend-video'>

                    {
                        state &&
                        state.map((value, index) => {
                            {
                                if (index < 6) {
                                    return (
                                        <div>
                                            <img src={value.images} alt="" />
                                            <h5>Movies Name : {value.MovieName}</h5>
                                            <p>Actor : {value.ActorName}</p>
                                            <p>Producer : {value.ProducerName}</p>
                                            <p>ReleaseDate : {value.ReleaseDate}</p>
                                            <p>Review : {value.Des}</p>
                                            <Link to={value._id} className='btn btn-danger mt-3 player-watch-btn ' onClick={checkPath}>Watch now</Link>
                                            <Link className='btn btn-primary mt-3 player-watch-btn ' onClick={
                                                (e) => {
                                                    Download(e,value.movies)
                                                }
                                            }>Download</Link>
                                        </div>

                                    )

                                }

                            }
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default Player
