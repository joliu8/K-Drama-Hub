import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from '../client';
import { formatDistanceToNow } from 'date-fns';
import "../src/App.css"
import edit from "../src/assets/edit.png"
import thumbsup from "../src/assets/thumbsup.png"

const PostPage = () => {
    const { id } = useParams()
    const [oldInfo, setOldInfo] = useState([])
    const [count, setCount] = useState(0)
    const [commentInfo, setCommentInfo] = useState([])
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const getInfo = async () => {

            const { data, error } = await supabase
                .from('Posts')
                .select()
                .eq('id', id)


            if (error) {
                console.error('Error fetching data:', error.message);
                return null;
            }

            setOldInfo(data)
            // console.log(data)
            setCount(data[0].upvotes)
            setCommentInfo(data[0].comments)
            console.log(data[0].comments)

            // window.location = "/gallery";

        };
        getInfo();
    }, [])



    const updateCount = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .update({ upvotes: count + 1 })
            .eq('id', oldInfo[0].id)

        setCount((count) => count + 1);

    }

    const submitComment = async (event) => {
        event.preventDefault();
        // console.log(comments)

        const updatedComments = [...commentInfo, newComment];
        setCommentInfo(updatedComments);

        await supabase
            .from('Posts')
            .update({ comments: updatedComments })
            .eq('id', oldInfo[0].id)

        setNewComment("")

    }

    const handleChange = (e) => {
        setNewComment(e.target.value);
    }

    const iso = oldInfo[0] ? oldInfo[0].created_at : null
    const createdAt = (new Date(iso));
    const elapsedTime = formatDistanceToNow(createdAt, { addSuffix: true });

    return (<>
        <h1>Current Post Info</h1>
        {oldInfo && oldInfo.length > 0 ? (
            <div className='card'>
                <div className='edit'>
                    <p>Posted {elapsedTime}</p>
                    <Link to={'/edit/' + oldInfo[0].id}><img style={{ width: "2.5vw" }} src={edit} /></Link>
                </div>
                <h2>{oldInfo[0].title}</h2>
                <h4>{oldInfo[0].content ? oldInfo[0].content : "No content"}</h4>
                {oldInfo[0].image_url ? <img style={{ maxWidth: "50vw", maxHeight:"50vh" }} src={oldInfo[0].image_url} alt={'Image of Post #' + oldInfo[0].id} /> : <p>[No image]</p>}
                <br />
                <br />
                <label><button className="upvoteButton" onClick={updateCount} ><img style={{ width: "2vw", paddingRight: "0.5vw" }} src={thumbsup}/> {count} upvotes</button></label>
                <br />
                <br />
                {/* <Link className="link" to={'/edit/' + oldInfo[0].id}>Edit/Delete Post</Link> */}
            </div>
        ) : (<p>oop</p>)}

        <div className="comment-container">
            <h2 htmlFor="comments">Comments</h2>
            <ul>
                {Array.isArray(commentInfo) && commentInfo.length > 0 ? commentInfo.map((c, index) => (<li key={index} className="comment">{c}</li>)) : <p>[No comments]</p>}
            </ul>
            <input className="text-input" type="text" id="comment-input" name="comments" onChange={(e) => setNewComment(e.target.value)} value={newComment}></input>
            <input className="submit-button" type="submit" value="Post Comment" onClick={submitComment} />

        </div>

    </>);
}

export default PostPage

// import { Link, useParams } from "react-router-dom"
// import { useState, useEffect } from "react"
// import { supabase } from '../client'
// import meme1 from '../assets/meme1.png'
// import meme2 from '../assets/meme2.jpg'

// function PostPage() {
//     const { id } = useParams()
//     const [oldInfo, setOldInfo] = useState([])

//     useEffect(() => {
//         const getInfo = async () => {

//             const { data, error } = await supabase
//                 .from('Data')
//                 .select('name, speed, color')
//                 .eq('id', id)


//             if (error) {
//                 console.error('Error fetching data:', error.message);
//                 return null;
//             }

//             setOldInfo(data)
//             console.log(data)
//             // window.location = "/gallery";

//         };
//         getInfo();
//     }, [])

//     return (
//         <>
//             <h1>Current Crewmate Info:</h1>
//             <div className="current-info" style={{ backgroundColor: oldInfo[0] ? oldInfo[0].color : "nah" }}>
//                 {oldInfo && oldInfo.length > 0 ? (<>
//                     <h2>Name: {oldInfo[0].name}</h2>
//                     <h2>Speed: {oldInfo[0].speed}</h2>
//                     <h2>Color: {oldInfo[0].color}</h2>
//                 </>) : (<p>oop</p>)
//                 }
//             </div>
//             <img style={{ width: "500px" }} src={meme1} />
//             <img style={{ width: "500px" }} src={meme2} />
//         </>
//     )
// }

// export default PostPage;