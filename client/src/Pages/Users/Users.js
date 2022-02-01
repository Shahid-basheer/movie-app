import './Users.css'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import { useEffect,useState } from 'react'
const Users = () => {
const [state, setstate] = useState([])
const [loading, setloading] = useState(true)


useEffect(() => {
   axios.get('/admin/get-users').then((res)=>{
    setstate(res.data)
   })
   setTimeout(() => {
     setloading(false)
   }, 3000);
    window.scroll(0, 0);

},[])



    return (
        <div className='users'>
        {loading?(<div className='loading'><h1>Loading...</h1></div>):(<div>
          <div className='users-table'>
            <Table striped bordered hover size="sm" className='container'>
            <thead>
              <tr>
                <th>No.</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
            {state.map((value,key)=>{
                return(

                    <tr>
                    <td>{key+1}</td>
                    <td>{value.userName}</td>
                    <td>{value.email}</td>
                    <td>{value.phone}</td>
                    </tr>
                )
            })

            }
            </tbody>
          </Table>
            </div>
          </div>)
        }
           
        </div>
    )
}

export default Users
