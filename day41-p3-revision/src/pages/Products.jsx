import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Products() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res => setUsers(res.data))
    }, []);

  return (
    <div>
        <h2>User List</h2>

        {
            users.map(data => (
                <div key={data.id}>
                    <h4>{data.username}</h4>
                    <p>{data.email}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Products