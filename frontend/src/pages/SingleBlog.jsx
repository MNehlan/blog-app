import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { useEffect, useState } from "react";
import '../style/singleblog.css'


const SingleBlog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)

  const singleBlog = async () => {
    const { data } = await api.get(`/api/blog/${id}`)
    setBlog(data)
  }

  useEffect(() => {
    singleBlog();
  }, [id])


  if (!blog) return <p>Loading</p>

  return (
    <div className="single-blog">
      <div className="blog-container">
        <button onClick={() => navigate(-1)} className="back-btn">← back</button>

        <h1 className="blog-heading">{blog.title}</h1>

        <div className="blog-meta">
          <span className="blog-category">{blog.category}</span>
        </div>

        <div className="blog-image-wrapper">
          <img src={blog.image} alt={blog.title} className="blog-image" />
        </div>

        <p className="blog-body">
          {blog.description}
        </p>

      </div>
    </div>
  )
}

export default SingleBlog