const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    login: async (req, res) => {
        const user = await prisma.user.findFirst({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        });

        if (!user) return res.json({ message: 'Invalid username or password' });

        const key = process.env.SECRET_KEY;
        const token = jwt.sign({ id: user.id }, key, { expiresIn: '1d' });

        res.json({ token: token });
    },
    verifyToken: (req, res) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1MDk2NDk1LCJleHAiOjE3MzUxODI4OTV9.3LLHtbdhjq_qkUUO9Q-P8whhKWmSN7vhVVlzWaWmvcg'
        const key = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, key);

        res.json(decoded);
    }
}