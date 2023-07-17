const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
//create user register user
exports.registerController = async (req, res) => {

    try {
        const { username, email, password } = req.body

        //validation
        if (!username || !email || !password)
            return res.status(400).send({
                success: false,
                message: 'Please fill all fields'
            })

        //existing user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(401).send({
                message: 'User already exists',
                success: false
            })
        }

        //hash password,salt levele
        const hashedPassword = await bcrypt.hash(password, 10);

        //save new user
        const user = new userModel({ username, email, password: hashedPassword })
        await user.save()
        return res.status(201).send({
            message: 'New User Created',
            success: true,
            user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: 'Error in Register callback',
            success: false,
            error
        })
    }
};

//get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            usersCount: users.length,
            message: 'All users data',
            success: true,
            users
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: 'Error in Getting All  users',
            success: false,
            error
        })
    }
};

//loginr user
exports.loginController = async (req, res) => {
    try {

        const { email, password } = req.body;

        //validation
        if (!email || !password)
            return res.status(401).send({
                success: false,
                message: 'Please Provide Email or password'
            })

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'Email is not registered'
            })
        }

        //password chk
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid Username or Password'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Login Successful',
            user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: 'Error in Login callback',
            success: false,
            error
        })
    }
};