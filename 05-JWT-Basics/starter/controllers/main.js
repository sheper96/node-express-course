const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors')

exports.login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const payload = {
        id: new Date().getDate(),
        username: username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })

    res.status(200).json({ msg: 'user created', token })
}

exports.dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)

    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    })
}

