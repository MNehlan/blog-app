import { useState } from "react";
import BlogForm from "./BlogForm";
import { useBlog } from '../hooks/useBlog'
import '../style/dashboard.css'

const DashBoard = () => {
  const { userBlog, deleteBlog } = useBlog();
  const [isModal, setIsModal] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState(null)


  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1 className="dashboard-title">
          {userBlog.length > 0 ? 'Your Blogs' : 'No Blogs Found'}
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
              <span className="blog-date">
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>

          </div>
        ))}
      </div>

      {isModal && <BlogForm blog={selectedBlog} setIsModal={setIsModal} />}

    </div>
  )
}

export default DashBoard