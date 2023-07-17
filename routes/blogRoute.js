const express = require('express');
const { getBlogByIdController, deleteBlogController, updateBlogController, createBlogController, getAllBlogsController, userBlogController } = require('../controllers/blogController');

//router Object
const router = express.Router()

//routes
// GET all blogs || GET
router.get('/all-blog', getAllBlogsController)

// Create Blog || POST
router.post('/create-blog', createBlogController)

// Update Blog || PUT
router.put('/update-blog/:id', updateBlogController)

//Delete Blog || DELETE
router.delete('/delete-blog/:id', deleteBlogController)

//Get Single Blog  || GET
router.get('/get-blog/:id', getBlogByIdController)

//Get User Blog || GET
router.get('/user-blog/:id', userBlogController)

module.exports = router;
