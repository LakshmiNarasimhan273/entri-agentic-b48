import React from 'react'
import useFetch from '../hooks/useFetch'

function Users() {
    const {data, loading, error} = useFetch("https://fakestoreapi.com/users");

    if(loading){
        return <h2>Loading...</h2>
    }

    if(error){
        return <h5>{error}</h5>
    }
  return (
    <div>
        <h4>Users component</h4>

        {
            data.map(user => (
                <div key={user.id}>
                    <p>{user.email}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Users