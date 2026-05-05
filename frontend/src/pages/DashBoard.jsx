import { useToast } from "../hooks/useToast";
import BlogForm from "./BlogForm";
import '../style/dashboard.css'
import api from "../api/api";
import { useEffect, useState } from "react";

const DashBoard = () => {
  const { showToast } = useToast();
  const [isModal, setIsModal] = useState(false)
  const [userBlog, setUserBlog] = useState([])
  const [selectedBlog, setSelectedBlog] = useState(null)

  async function userBlogs() {
    try {
      const { data } = await api.get('/api/blog/user')
      setUserBlog(data)
    } catch (error) {
      showToast(error.response.data.message, 'error')
    }
  }

  async function deleteBlog(id) {
    await api.delete(`/api/blog/${id}`)
    userBlogs()
  }

  useEffect(() => {
    userBlogs();
  }, [])

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1 className="dashboard-title">
          {userBlog.length > 0 ? 'Your Blogs': 'No Blogs Found'}
        </h1>

        <button
          onClick={() => {
            setSelectedBlog(null)
            setIsModal(true)
          }}
          className="add-btn"
        >
          +
        </button>
      </div>

      <div className="dashboard-grid">
        {userBlog.map((blog) => (
          <div key={blog._id} className="dashboard-card">
            <div className="card-actions">
              <button className="edit-btn" onClick={() => {
                setSelectedBlog(blog)
                setIsModal(true)
              }}>
                ✏️
              </button>

              <button className="delete-btn" onClick={() => deleteBlog(blog._id)}>
                🗑
              </button>
            </div>

            <div className="card-image-wrapper">
              <img src={blog.image} alt={blog.title} className="card-image" />
            </div>

            <div className="card-content">
              <h3 className="card-title">{blog.title}</h3>
              <p className="card-desc">{blog.description}</p>

              <span className="card-category">{blog.category}</span>
            </div>

          </div>
        ))}
      </div>

      {isModal && <BlogForm blog={selectedBlog} setIsModal={setIsModal} refetch={userBlogs} />}

    </div>
  )
}

export default DashBoard