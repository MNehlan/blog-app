const Blog = require('../models/Blog');
const cloudinary = require('../config/cloudinary');

const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find();

    if (blogs.length === 0) {
      return res.status(404).json({ message: 'No Blogs Found' });
    }

    res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ userId: req.user.id });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(fileStr, {
      folder: 'blog-images',
    });

    const blog = new Blog({
      ...req.body,
      image: result.secure_url,
      userId: req.user.id,
    });
    await blog.save();
    res.status(200).json({blog, message: 'Blog Added'});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (req.file) {
      const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      const result = await cloudinary.uploader.upload(fileStr, {
        folder: 'blog-images',
      });
      updateData.image = result.secure_url;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.status(200).json({ message: 'Blog Updated' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Blog Deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBlog,
  getBlog,
  getUserBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
