import { useEffect } from "react";
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useBlog } from '../hooks/useBlog'
import '../style/home.css'

const Home = () => {
  const { isLogged } = useAuth();
  const { blogs, fetchBlogs } = useBlog()


  useEffect(() => {
    fetchBlogs();
  }, [isLogged])

  return (
    <div className="home-container">
      {blogs.map((blog) => (
        <div key={blog._id} className="blog-card">

          <div className="blog-image-wrapper">
            <img
              src={blog.image}
              alt={blog.title}
              className="blog-image"
            />
          </div>

          <div className="blog-content">
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-desc">{blog.description}</p>

            <div className="blog-footer">
              <span className="blog-category">{blog.category}</span>
              <button className="read-more"><Link to={`/blog/${blog._id}`}>
                Read
              </Link>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home