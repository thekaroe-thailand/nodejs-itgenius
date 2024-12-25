module.exports = {
    list: (req, res) => {
        const customers = [
            { id: 1, name: 'Kob' },
            { id: 2, name: 'Mali' }
        ];

        res.json(customers);
    },
    findById: (req, res) => {
        const id = parseInt(req.params.id);
        const customers = [
            { id: 1, name: 'Kob' },
            { id: 2, name: 'Mali' }
        ];
        const customer = customers.find(customer => customer.id === id);

        if (!customer) {
            return res.json({ message: 'Customer not found' });
        }

        res.json(customer);
    }
}

