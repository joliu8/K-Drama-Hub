import Card from '../components/Card'
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { Link } from "react-router-dom"
import "../src/App.css"
const HomeFeed = (props) => {

    const [allPosts, setAllPosts] = useState([])
    const [filteredResults, setFilteredResults] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [sortNewest, setSortNewest] = useState(false)
    const [sortPopular, setSortPopular] = useState(false)
    const [sortLeastPopular, setSortLeastPopular] = useState(false)

    useEffect(() => {

        const fetchPosts = async () => {
            let query = supabase.from('Posts').select()

            if (sortNewest) {
                query = query.order('created_at', { ascending: false })
            }

            if (sortPopular) {
                query = query.order('upvotes', { ascending: false })
            }
            if (sortLeastPopular) {
                query = query.order('upvotes', { ascending: true })
            }

            const { data } = await query

            setAllPosts(data)
            console.log(data)

        }
        fetchPosts();

    }, [sortNewest, sortPopular, sortLeastPopular])

    const toggleNewestButton = () => {
        setSortNewest(!sortNewest)
        setSortLeastPopular(false)
        setSortPopular(false)
        // console.log(sortNewest)
    }
    const togglePopularButton = () => {
        setSortPopular(!sortPopular)
        setSortLeastPopular(false)
        setSortNewest(false)
        // console.log(sortPopular)
    }

    const toggleLeastPopularButton = () => {
        setSortLeastPopular(!sortLeastPopular)
        setSortPopular(false)
        setSortNewest(false)
        // console.log(sortLeastPopular)
    }
    const searchItems = searchValue => {
        setSearchInput(searchValue)
        if (searchValue !== "") {
            const filteredData = allPosts.filter((post) =>
                post.title
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            )
            setFilteredResults(filteredData)
        } else {
            setFilteredResults(allPosts)
        }
    }

    return (<>
        <div className="homefeed">
            <input className="search" type="text" placeholder='Search by title...' onChange={(inputString) => searchItems(inputString.target.value)} />
            <div className='sort-container'>
                <h3>Order by:</h3>
                <button className={`sort-button ${sortNewest ? "active" : ""}`} onClick={toggleNewestButton}>Newest</button>
                <button className={`sort-button ${sortPopular ? "active" : ""}`} onClick={togglePopularButton}>Most Popular</button>
                <button className={`sort-button ${sortLeastPopular ? "active" : ""}`} onClick={toggleLeastPopularButton}>Least Popular</button>
            </div>

            {searchInput.length > 0
                ? // what happens if we have search input? what list do we use to display coins?  
                filteredResults
                    .map((post) => (
                        <Card
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            created_at={post.created_at}
                            content={post.content}
                            image_url={post.image_url}
                            upvotes={post.upvotes}
                            comments={post.comments}
                        />
                    ))
                :
                allPosts.map(post => (
                    <Card
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        created_at={post.created_at}
                        content={post.content}
                        image_url={post.image_url}
                        upvotes={post.upvotes}
                        comments={post.comments}
                    />
                ))
            }

            {/* {
                searchInput && filteredResults.length > 0 ?
                    [...filteredResults]
                        // .sort((a, b) => b.id - a.id)
                        .map((post, index) =>
                            <Card
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                created_at={post.created_at}
                                content={post.content}
                                image_url={post.image_url}
                                upvotes={post.upvotes}
                                comments={post.comments}
                            />
                        ) : <><h2>Be the first post!</h2>
                        <br />
                        <br />
                        <Link style={{ padding: "5px", border: "solid", color: "white" }} to="/create">Click here to create a new post!</Link>
                    </>
            } */}
        </div>
    </>)
}

export default HomeFeed

// import { useState, useEffect } from 'react'
// import Card from '../components/Card'
// import { supabase } from '../client'
// import missing from '../assets/missing.gif'
// import {Link} from "react-router-dom"

// const HomeFeed = (props) => {

//     const [allMates, setAllMates] = useState([])

//     useEffect(() => {
//         // setPosts(props.data)

//         const fetchPosts = async () => {
//             const { data } = await supabase
//                 .from('Data')
//                 .select()
//                 .order('created_at', { ascending: true })

//             // set state of posts
//             setAllMates(data)
//             // console.log(data)

//         }
//         fetchPosts()
//     }, [props])



//     return (
//         <div className="crewmates">
//             <h1>Your Crewmate Gallery</h1>
//             {
//                 allMates && allMates.length > 0 ?
//                     [...allMates]
//                         .sort((a, b) => b.id - a.id)
//                         .map((post, index) =>
//                             <Card
//                                 key={post.id}
//                                 id={post.id}
//                                 name={post.name}
//                                 speed={post.speed}
//                                 color={post.color}
//                             />
//                         ) : <><h2>You haven't made a crewmate yet!</h2>
//                         <img src={missing}/>
//                         <br/>
//                         <br/>
//                         <Link style={{padding:"5px", border:"solid", color:"white"}} to="/create">Click here to create a new crewmate!</Link>
//                         </>
//             }
//         </div>
//     )
// }

// export default HomeFeed