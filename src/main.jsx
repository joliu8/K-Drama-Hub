import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "../routes/Layout.jsx"
import CreatePage from "../routes/CreatePage.jsx"
import EditPage from '../routes/EditPage.jsx'
import HomeFeed from '../routes/HomeFeed.jsx'
import PostPage from '../routes/PostPage.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeFeed />} />
        <Route path="/create" element = {<CreatePage/>} />
        <Route path="/post/:id" element={<PostPage/>} />
        <Route path="/edit/:id" element={<EditPage/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)
