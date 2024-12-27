const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    create: async (req, res) => {
        try {
            const book = await prisma.book.findFirst({
                where: {
                    isbn: req.body.isbn
                }
            });

            if (!book) return res.status(500).json({ message: 'Book not found' });

            await prisma.saleOrder.create({
                data: {
                    bookId: book.id,
                    price: book.price
                }
            });

            res.send({ message: 'success' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    list: async (req, res) => {
        try {
            const saleOrders = await prisma.saleOrder.findMany({
                include: {
                    book: {
                        select: {
                            name: true,
                            isbn: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
            res.json(saleOrders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    remove: async (req, res) => {
        try {
            await prisma.saleOrder.delete({
                where: {
                    id: parseInt(req.params.id)
                }
            });

            res.send({ message: 'success' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}