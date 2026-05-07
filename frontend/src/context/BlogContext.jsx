import { createContext, useState, useEffect } from "react";
import api from "../api/api";
import { useToast } from "../hooks/useToast";

export const BlogContext = createContext()

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('')
  const [userBlog, setUserBlog] = useState([])
  const { showToast } = useToast();

  const filteredBlogs = blogs.filter(blog => blog.title.toLowerCase().includes(search.toLowerCase()))

  async function fetchBlogs() {
    const { data } = await api.get('/api/blog')
    setBlogs(data)
  }

  async function loadBlogs() {
    try {
      const { data } = await api.get('/api/blog/user')
      setUserBlog(data)
    } catch (error) {
      showToast(error.response.data.message, 'error')
    }
  }

  useEffect(() => {
    loadBlogs();
  }, [])


  async function deleteBlog(id) {
    await api.delete(`/api/blog/${id}`)
    loadBlogs()
  }

  return (
    <BlogContext.Provider value={{ blogs, fetchBlogs, search, setSearch, filteredBlogs, userBlog, deleteBlog, loadBlogs }}>
      {children}
    </BlogContext.Provider>
  )
}