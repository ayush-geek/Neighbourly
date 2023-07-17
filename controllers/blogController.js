const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');

//Get all Users
exports.getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user');

        //chk if blog exists or not
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "No blogs found"
            })
        }

        return res.status(200).send({
            success: true,
            message: "All Blogs List",
            count: blogs.length,
            blogs
        })


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error While Getting Blogs",
            error
        })
    }
}

//Create Blog
exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;

        //validation
        if (!title || !description || !image || !user) {

            return res.status(200).send({
                success: false,
                message: "Please provide all fields",
                error
            })
        }

        const existingUser = await userModel.findById(user);

        //Validation
        if (!existingUser)
            return res.status(404).send({
                success: false,
                message: "Unable to find User",
                error
            })

        const newBlog = new blogModel({ title, description, image, user })

        //to maintain relationship b/w models
        const session = await mongoose.startSession()
        session.startTransaction();
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);
        await existingUser.save({ session });
        await session.commitTransaction();

        await newBlog.save();


        return res.status(201).send({
            success: true,
            message: "Blog Created",
            newBlog
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error While Creating Blog",
            error
        })
    }
}

//Update Blog
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, image } = req.body
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
        return res.status(200).send({
            success: true,
            message: "Blog Updated",
            blog
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error While Updating Blog",
            error
        })
    }
}

//Get Single Blog
exports.getBlogByIdController = async (req, res) => {

    try {
        const { id } = req.params
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog Not found with this id"
            })
        }

        return res.status(200).send({
            success: true,
            message: "fetch single Blog ",
            blog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error While Getting Single Blog",
            error
        })
    }
}

//DELETE blog
exports.deleteBlogController = async (req, res) => {
    try {

        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();

        return res.status(200).send({
            success: true,
            message: "Deleted Blog "

        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error While Deleting Blog",
            error
        })
    }
}

exports.userBlogController = async (req, res) => {

    try {
        const userBlog = await userModel.findById(req.params.id).populate('blogs')
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "Blogs not found with this id"

            })
        }

        return res.status(200).send({
            success: true,
            message: "User Blogs ",
            userBlog

        })


    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error in user Blog",
            error
        })
    }
}