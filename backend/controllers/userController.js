

//@desc Register users
//@route Post /api/users
//@access Public
const registerUser = async (req, res) => {
    res.json({message: 'Register User'})

}


//@desc Login
//@route Post /api/users/login
//@access Public
const loginUser = async (req, res) => {
    res.json({message: 'Login User'})

}


//@desc Get User Data
//@route Get /api/users/me
//@access Public
const getMe = async (req, res) => {
    res.json({message: 'User data display'})

}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}