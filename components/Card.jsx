import { formatDistanceToNow } from 'date-fns';
import "../src/App.css"
import { Link } from "react-router-dom"
import edit from "../src/assets/edit.png"
import thumbsup from "../src/assets/thumbsup.png"



const Card = (props) => {

    const createdAt = (new Date(props.created_at));
    const elapsedTime = formatDistanceToNow(createdAt, { addSuffix: true });

    return (<>
        <div className='card'>
            <div className='edit'>
                <p>Posted {elapsedTime}</p>
                <Link to={'edit/' + props.id}><img style={{ width: "2.5vw" }} src={edit} /></Link>
            </div>
            <h2>{props.title}</h2>
            <h4>{props.content}</h4>
            {/* <img src={props.image_url} alt={'Image of Post #' + props.id} /> */}
            <p><img style={{ width: "2vw", paddingRight: "0.5vw" }} src={thumbsup} />{props.upvotes} upvotes</p>
            <br />
            <Link className="link" to={'/post/' + props.id}>More Info</Link>
        </div>

    </>);
}

export default Card;


// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { supabase } from '../client.js'
// import '../App.css'
// import Black from "../assets/black.png"
// import Blue from "../assets/blue.png"
// import Brown from "../assets/brown.png"
// import Cyan from "../assets/cyan.png"
// import Green from "../assets/green.png"
// import Lime from "../assets/lightgreen.png"
// import Orange from "../assets/orange.png"
// import Pink from "../assets/pink.png"
// import Purple from "../assets/purple.png"
// import Red from "../assets/red.png"
// import White from "../assets/white.png"
// import Yellow from "../assets/yellow.png"


// const Card = (props) => {

//     const colorImages = { Black, Blue, Brown, Cyan, Green, Lime, Orange, Pink, Purple, Red, White, Yellow };

//     return (

//         <div className="Card" style={{ backgroundColor: props.color }}>
//             <div className='card-content'>
//                 <img src={colorImages[props.color]} alt={props.color} />
//             <br />
//             <div className='card-info'>
//                 <h3 className="name">{"Name of Crewmate: " + props.name}</h3>
//                 <h3 className="speed">{"Speed of Crewmate: " + props.speed}</h3>
//                 <h3 className="color">{"Color of Crewmate: " + props.color}</h3>
//                 <Link style={{padding:"5px", border:"solid", color:"white"}}to={'/edit/' + props.id}>Edit Crewmate</Link>
//                                 <Link style={{padding:"5px", border:"solid", color:"white"}}to={'/gallery/' + props.id}>More Info</Link>
//                 {/* <Link to={'edit/' + props.id}>Edit Crewmate</Link> */}
//             </div>
//                         </div>
//             <br />

//         </div>
//     );
// };

// export default Card