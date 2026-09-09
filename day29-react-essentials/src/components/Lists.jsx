import React from 'react'

function Lists() {
    const fruits = ["Apple", "Banana", "Mango"];
  return (
    <div>
        <h1>Lists</h1>

        <ul>
            {
                fruits.map(data => (
                    <li>{data}</li>
                ))
            }
        </ul>
    </div>
  )
}

export default Lists