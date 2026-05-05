const express = require('express');
const router = express.Router();

const upload = require('../config/multer');
const verifyToken = require('../middleware/verifyToken');
const {
  getAllBlog,
  getBlog,
  getUserBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

router.get('/', getAllBlog);
router.get('/user', verifyToken, getUserBlogs);
router.get('/:id', getBlog);
router.post('/', verifyToken, upload.single('image'), createBlog);
router.put('/:id', verifyToken, upload.single('image'), updateBlog);
router.delete('/:id', verifyToken, deleteBlog);

module.exports = router;
