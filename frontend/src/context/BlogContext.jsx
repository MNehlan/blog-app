import { createContext, useState } from "react";
import api from "../api/api";

export const BlogContext = createContext()

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('')

  const filteredBlogs = blogs.filter(blog => blog.title.toLowerCase().includes(search.toLowerCase()))

  async function fetchBlogs() {
    setBlogs([])
    const { data } = await api.get('/api/blog')
    setBlogs(data)
  }

  return (
    <BlogContext.Provider value={{ blogs, setBlogs, fetchBlogs, search, setSearch, filteredBlogs }}>
      {children}
    </BlogContext.Provider>
  )
}