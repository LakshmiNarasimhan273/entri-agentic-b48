// import React from 'react'

// function Courses(props) {
//   return (
//     <div>
//         <h1>{props.title}</h1>
//         <p>{props.desc}</p>
//     </div>
//   )
// }

// export default Courses

import React from 'react'

function Courses({title, desc}) {
  return (
    <div>
        <h1>{title}</h1>
        <p>{desc}</p>
    </div>
  )
}

export default Courses