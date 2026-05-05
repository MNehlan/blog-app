import { useState } from "react"
import api from "../api/api"
// import { useToast } from "../hooks/useToast"
import '../style/blogform.css'


const BlogForm = ({ blog, setIsModal, refetch }) => {
  const [title, setTitle] = useState(blog?.title || '')
  const [description, setDescription] = useState(blog?.description || '')
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState(blog?.category || '')

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


    if (blog) {
      await api.put(`/api/blog/${blog._id}`, formData)
    } else {
      await api.post('/api/blog', formData)
    }

    refetch();
    setIsModal(false)
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
          <input type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)} className="input-blog"
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
          <input type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)} className="input-blog"
          />
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