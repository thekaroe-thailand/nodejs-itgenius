const jwt = require('jsonwebtoken');

module.exports = {
    login: (req, res) => {
        const users = [
            { id: 1, username: 'kob', password: '1234' },
            { id: 2, username: 'mali', password: '1234' }
        ];
        const user = users.find(user =>
            user.username === req.body.username
            && user.password === req.body.password
        );

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