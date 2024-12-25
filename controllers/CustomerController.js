module.exports = {
    list: (req, res) => {
        const customers = [
            { id: 1, name: 'Kob' },
            { id: 2, name: 'Mali' }
        ];

        res.json(customers);
    },
    findById: (req, res) => {
        const id = req.params.id;
        const customers = [
            { id: 1, name: 'Kob' },
            { id: 2, name: 'Mali' }
        ];
        const customer = customers.find(customer => customer.id === id);
        res.json(customer);
    }
}

