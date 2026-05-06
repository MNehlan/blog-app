import { useState } from "react"
import api from "../api/api"
// import { useToast } from "../hooks/useToast"
import '../style/blogform.css'
import { useToast } from "../hooks/useToast"


const BlogForm = ({ blog, setIsModal, refetch }) => {
  const [title, setTitle] = useState(blog?.title || '')
  const [description, setDescription] = useState(blog?.description || '')
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState(blog?.category || '')
  const { showToast } = useToast()

  async function handleAddBlog(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title)
    formData.append('description', description)
    if (image) {
      formData.append('image', image);
    } else if (blog?.image) {
      formData.append('image', blog.image);
    }
    formData.append('category', category)

    try {
      if (blog) {
        const { data } = await api.put(`/api/blog/${blog._id}`, formData)
        showToast(data.message)
      } else {
        const { data } = await api.post('/api/blog', formData)
        showToast(data.message)
      }
      refetch();
      setIsModal(false)
    } catch (error) {
      showToast(error.response.data.message, 'error')
    }
  }


  return (
    <div className="modal-overlay" onClick={() => setIsModal(false)}>
      <div className="container-blogform"
        onClick={(e) => e.stopPropagation()}>
        <div className="blog-form">
          <h2 className="modal-title">
            {blog ? 'Update Blog' : 'Create Blog'}
          </h2>
          <label className="label-form">
            Title
          </label>
          <input type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} className="input-blog"
          />
          <label className="label-form">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)} className="input-blog"
            rows={4}
          />
          <label className="label-form">
            Image
          </label>
          <input type="file"
            onChange={(e) => setImage(e.target.files[0])} className="input-blog blog-image-input"
          />
          <label className="label-form">
            Category
          </label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-blog">
            <option value="">Select category</option>
            <option value="Technology">Technology</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
          <div className="button-group">
            <button onClick={() => setIsModal(false)} className="button-form">
              Cancel
            </button>
            <button onClick={handleAddBlog} className="button-form">
              {blog ? 'Update Blog' : 'Create Blog'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogForm