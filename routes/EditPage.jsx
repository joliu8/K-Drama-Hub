import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../src/App.css'
import { supabase } from '../client'
import { Link } from "react-router-dom"

const EditPage = () => {
    const { id } = useParams()
    const [oldInfo, setOldInfo] = useState([])
    const [newPost, setNewPost] = useState({ title: "", content: "", image_url: "" })
    const [password, setPassword] = useState("")
    // const [newPost, setNewPost] = useState({ title: oldInfo[0]?.title || "", content: oldInfo[0]?.content || "", image_url: oldInfo[0]?.image_url || "" })

    useEffect(() => {
        const getInfo = async () => {

            const { data, error } = await supabase
                .from('Posts')
                .select('title, content, image_url, password')
                .eq('id', id)


            if (error) {
                console.error('Error fetching data:', error.message);
                return null;
            }

            setOldInfo(data)
            console.log(data)

            // window.location = "/gallery";

        };
        getInfo();
    }, [])

    useEffect(() => {
        if (oldInfo.length > 0) {
            setNewPost({
                title: oldInfo[0].title,
                content: oldInfo[0].content,
                image_url: oldInfo[0].image_url
            });
        }
    }, [oldInfo]);

    const updatePost = async (event) => {
        event.preventDefault()
        if (password === oldInfo[0].password) {
            const { data, error } = await supabase
                .from('Posts')
                .update({ title: newPost.title, content: newPost.content, image_url: newPost.image_url })
                .eq('id', id)

            if (error) {
                console.error(error);
                alert("Update failed.");
            } else {
                console.log("Update success:", data);
                alert("Post updated successfully.");
                window.location = "/";
            }
        }
        else{
            alert("Password incorrect.")
        }

    }

    const deletePost = async (event) => {
        event.preventDefault();
        if (password === oldInfo[0].password) {
            const { data, error } = await supabase
                .from('Posts')
                .delete()
                .eq('id', id)

            if (error) {
                console.error(error);
                alert("Delete failed.");
            } else {
                console.log("Delete success:", data);
                alert("Post deleted successfully.");
                window.location = "/";
            }
        }
        else{
            alert("Password incorrect.")
        }



    }
    const handleChange = (event) => {
        const { name, value } = event.target
        console.log(name)
        console.log(value)
        setNewPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const passwordCheck = (event) => {
        setPassword(event.target.value)
    }


    return (<>
        <div style={{ display: 'flex', alignContent: 'center' }}>
            <h1>Edit/Delete Post</h1>
        </div>
        {oldInfo && oldInfo.length > 0 ?
            //             <form>
            //     <label htmlFor="title">Title</label> <br />
            //     <input className='text-input'type="text" id="title" name="title" onChange={handleChange} />
            //     <br />
            //     <br/>

            //     <label htmlFor="content">Content (Optional)</label><br />
            //     <textarea className='text-area' id="content" name="content" onChange={handleChange}></textarea>
            //     <br />
            //     <br/>

            //     <label htmlFor="image_url">Image URL (Optional)</label><br />
            //     <input className='text-input'type="text" id="image_url" name="image_url" onChange={handleChange} /><br />
            //     <br />
            //     <input className="submit-button" type="submit" value="Create Post" onClick={createPost} />
            // </form>




            <form>
                <label htmlFor="title">New Title</label> <br />
                <input
                    className='text-input'
                    type="text"
                    name="title"
                    value={newPost.title}
                    onChange={handleChange}
                />
                <br />
                <br />

                <label>New Content (Optional) </label> <br />
                <textarea className='text-area' value={newPost.content !== undefined ? newPost.content : oldInfo[0].content} rows="5" cols="50" id="content" name="content" onChange={handleChange}></textarea>
                <br />
                <br />

                <label>New Image URL (Optional)</label><br />
                <input
                    className='text-input'
                    type="text"
                    name="image_url"
                    value={newPost.image_url !== undefined ? newPost.image_url : oldInfo[0].image_url}
                    onChange={handleChange}
                />

                <br />
                <br />

                <label >Password</label><br />
                <input className='text-input' type="password" id="password" name="password" onChange={passwordCheck} /><br />
                <br />

                <input className="submit-button" type="submit" value="Submit" onClick={updatePost}></input>
                <input className="submit-button delete-button" type="submit" value="Delete" onClick={deletePost} />

            </form>
            : <p>Loading</p>}

    </>)
}

export default EditPage

// import { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import '../App.css'
// import { supabase } from '../client'
// import rainbow from "../assets/rainbow.gif"


// const EditPage = ({ data }) => {

//     const { id } = useParams()
//     const [crewmate, setCrewmate] = useState({ id: null, name: "", speed: 0, color: "" })
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

//     const updateCrewmate = async (event) => {
//         event.preventDefault()
//         await supabase
//             .from('Data')
//             .update({ name: crewmate.name, speed: crewmate.speed, color: crewmate.color })
//             .eq('id', id)
//         window.location = "/gallery";


//     }

//     const deleteCrewmate = async (event) => {
//         event.preventDefault();
//         await supabase
//             .from('Data')
//             .delete()
//             .eq('id', id)
//         window.location = "/gallery";


//     }
//     const handleChange = (event) => {
//         const { name, value } = event.target
//         setCrewmate((prev) => {
//             return {
//                 ...prev,
//                 [name]: value,
//             }
//         })
//     }

//     return (
//         <div>
//             <div style={{display:'flex', alignContent:'center'}}>
//             <h1>Edit/Delete Crewmate</h1>
//             <img style={{width:"120px"}} src={rainbow} />
//             </div>

//             <div className="current-info" style={{ backgroundColor: oldInfo[0] ? oldInfo[0].color : "nah" }}>
//                 <h3>Current Crewmate Info:</h3>
//                 {oldInfo && oldInfo.length > 0 ? (<>
//                     <p>Name: {oldInfo[0].name}</p>
//                     <p>Speed: {oldInfo[0].speed}</p>
//                     <p>Color: {oldInfo[0].color}</p>
//                 </>) : (<p>oop</p>)
//                 }
//             </div>
//             <form>
//                 <label>New Name:
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder={oldInfo[0] ? oldInfo[0].name : "nah"}
//                         style={{ "width": "400px", "margin": "10px" }}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br></br>
//                 <label>New Speed(mph):
//                     <input
//                         type="number"
//                         name="speed"
//                         placeholder={oldInfo[0] ? oldInfo[0].speed : "nah"}
//                         style={{ "width": "400px", "margin": "10px" }}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br></br>
//                 <label>
//                     New Color:
//                     <select style={{ "margin": "10px", width:"200px" }} name="color" onChange={handleChange}>
//                         <option value="" disabled selected>
//                             {oldInfo[0] ? oldInfo[0].color : "nah"}
//                         </option>
//                         <option value="Pink">Pink</option>
//                         <option value="Red">Red</option>
//                         <option value="Orange">Orange</option>
//                         <option value="Yellow">Yellow</option>
//                         <option value="Lime">Lime</option>
//                         <option value="Green">Green</option>
//                         <option value="Cyan">Cyan</option>
//                         <option value="Blue">Blue</option>
//                         <option value="Purple">Purple</option>
//                         <option value="Black">Black</option>
//                         <option value="Brown">Brown</option>
//                         <option value="White">White</option>
//                     </select>
//                 </label>
//                 <br></br>
//                 <input type="submit" onClick={updateCrewmate}></input>
//                 <input className="delete-button" type="submit" value="Delete" onClick={deleteCrewmate} />

//             </form>

//         </div >
//     )
// }

// export default EditPage