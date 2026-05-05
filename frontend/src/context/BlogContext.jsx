import { createContext, useState } from "react";
import api from "../api/api";

export const BlogContext = createContext()

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  async function fetchBlogs() {
    setBlogs([])
    const { data } = await api.get('/api/blog')
    setBlogs(data)
  }

  return (
    <BlogContext.Provider value={{ blogs, setBlogs, fetchBlogs }}>
      {children}
    </BlogContext.Provider>
  )
}