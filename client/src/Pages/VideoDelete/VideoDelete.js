import './VideoDelete.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const VideoDelete = () => {
    const [state, setstate] = useState([])
    const [loading, setloading] = useState(true)



    useEffect(() => {
        axios.get('/admin/retrive-of-movie-data').then((res) => {
            setstate(res.data)

        })
        setTimeout(() => {
            setloading(false)
        }, 3000);
               window.scroll(0,0)

    }, [])

    const EditMovie = (e) => {
        const path = e.target.href
        const url = path.split('#')[1]
        console.log(url)


    }


    const DeleteMovie = (e, index) => {
        const path = e.target.href
        const url = path.split('#')[1]
        console.log(url)

        axios.post('/admin/delete-movie/' + url).then((res) => {
            document.querySelector('#my-table').deleteRow(index + 1)
            document.querySelector('#alert-delete').style.display='block'
            console.log(res.data)
            
            setTimeout(() => {
                document.querySelector('#alert-delete').style.display = 'none'
            }, 2000);
        }).catch((err) => {
        })


    }

    const style = { margin: '10px' }

    return (
        <div className='video-delete'>
        {loading ? <div className='loading'><h1>Loading...</h1></div> : (
            <div>
            <Alert style={{width:'90%', position:'fixed',left:'4%',display:'none',transition:'0.9s'}} id='alert-delete' variant='success'>
                        Successfully Deleted...
                    </Alert>
                    <h3 style={{ textAlign: 'center', backgroundColor: 'green', fontFamily: 'sans-serif', transition: 'ease-out 0.9s', display: 'none' }}>Successfully Deleted</h3>
                    <div className="video-table">
                        <Table striped bordered hover className='container' id='my-table'>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Movie Image</th>
                                    <th>Movie Name</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.map((value, key) => {
                                    return (
                                        <tr>
                                            <td>{key + 1}</td>
                                            <td>
                                                <img src={value.images} alt="" />
                                            </td>
                                            <td>{value.MovieName}</td>
                                            <td> <Link to={'/movieUpdate/' + value._id} style={style} className='btn btn-primary delete-update'>Edit</Link></td>
                                            <td >
                                                <Link to={'#' + value._id} onClick={(e) => {
                                                    if (window.confirm(`Are you sure delete ${value.MovieName}?`)) { DeleteMovie(e, key) }
                                                }} style={style} className='btn btn-danger  delete-update'>Delete</Link></td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            )}

        </div>
    )
}

export default VideoDelete
