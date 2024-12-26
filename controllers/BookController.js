const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    create: async (req, res) => {
        try {
            const book = await prisma.book.create({
                data: {
                    isbn: req.body.isbn,
                    name: req.body.name ?? '',
                    description: req.body.description ?? '',
                    price: req.body.price,
                    categoryId: req.body.categoryId,
                    authorId: req.body.authorId
                }
            });

            res.json(book);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    list: async (req, res) => {
        try {
            const books = await prisma.book.findMany({
                orderBy: {
                    id: 'desc' // asc, desc (asc = น้อยไปมาก, desc = มากไปน้อย)
                },
                where: {
                    status: 'active' // WHERE status = 'active'
                },
                include: {
                    author: {
                        include: {
                            publisher: true
                        }
                    },
                    category: true
                }
            });
            res.json(books);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    findById: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const book = await prisma.book.findUnique({
                where: {
                    id: id
                }
            });
            res.json(book);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    update: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const book = await prisma.book.update({
                where: {
                    id: id
                },
                data: {
                    isbn: req.body.isbn,
                    name: req.body.name,
                    price: req.body.price,
                    categoryId: req.body.categoryId,
                    authorId: req.body.authorId
                }
            });

            res.json(book);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    remove: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await prisma.book.delete({
                where: {
                    id: id
                }
            });
            res.json({ message: 'Book deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    count: async (req, res) => {
        try {
            const count = await prisma.book.count();
            res.json({ count: count });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    search: async (req, res) => {
        try {
            const keyword = req.params.keyword;

            if (!keyword) {
                res.json([]);
                return;
            }

            const books = await prisma.book.findMany({
                where: {
                    name: {
                        contains: keyword // SELECT * FROM Book WHERE name LIKE '%keyword%'
                    }
                }
            });
            res.json(books);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    startsWith: async (req, res) => {
        const books = await prisma.book.findMany({
            where: {
                name: {
                    startsWith: req.params.keyword // SELECT * FROM Book WHERE name LIKE 'keyword%'
                }
            }
        });
        res.json(books);
    },
    endsWith: async (req, res) => {
        const books = await prisma.book.findMany({
            where: {
                name: {
                    endsWith: req.params.keyword // SELECT * FROM Book WHERE name LIKE '%keyword'
                }
            }
        });
        res.json(books);
    },
    removeMany: async (req, res) => {
        await prisma.book.deleteMany({
            where: {
                status: 'inactive'
            }
        });
        res.json({ message: 'Books deleted' });
    },
    priceGt: async (req, res) => {
        // SELECT * FROM Book WHERE price > 100
        const books = await prisma.book.findMany({
            where: {
                price: {
                    gt: 100
                }
            }
        });
        res.json(books);
    },
    priceLt: async (req, res) => {
        // SELECT * FROM Book WHERE price < 100
        const books = await prisma.book.findMany({
            where: {
                price: {
                    lt: 100 // < 100
                }
            }
        });
        res.json(books);
    },
    priceBetween: async (req, res) => {
        // SELECT * FROM Book WHERE (price BETWEEN 100 AND 400) AND status = 'active'
        const books = await prisma.book.findMany({
            where: {
                price: {
                    gte: 100, // >= 100
                    lte: 900 // <= 900
                },
                status: 'active'
            }
        });
        res.json(books);
    },
    priceNot: async (req, res) => {
        // SELECT * FROM Book WHERE price != 100 AND name NOT LIKE '%php%'
        const books = await prisma.book.findMany({
            where: {
                price: {
                    not: 900
                },
                name: {
                    not: {
                        contains: 'php'
                    }
                }
            }
        });
        res.json(books);
    },
    priceIn: async (req, res) => {
        // SELECT * FROM Book WHERE price IN (800, 900, 1200)
        const books = await prisma.book.findMany({
            where: {
                price: {
                    in: [800, 900, 1200]
                }
            }
        });
        res.json(books);
    },
    priceNotIn: async (req, res) => {
        // SELECT * FROM Book WHERE price NOT IN (800, 900, 1200)
        const books = await prisma.book.findMany({
            where: {
                price: {
                    notIn: [800, 900, 1200]
                }
            }
        });
        res.json(books);
    },
    notNull: async (req, res) => {
        // SELECT * FROM Book WHERE name IS NOT NULL
        const books = await prisma.book.findMany({
            where: {
                name: {
                    not: null
                }
            }
        });
        res.json(books);
    },
    isNull: async (req, res) => {
        // SELECT * FROM Book WHERE name IS NULL
        const books = await prisma.book.findMany({
            where: {
                name: null
            }
        });
        res.json(books);
    },
    findMin: async (req, res) => {
        // SELECT MIN(price) FROM Book WHERE status = 'active'
        const books = await prisma.book.aggregate({
            _min: {
                price: true
            },
            where: {
                status: 'active'
            }
        });
        res.json({ min: books._min.price });
    },
    findMax: async (req, res) => {
        // SELECT MAX(price) FROM Book WHERE status = 'active'
        const books = await prisma.book.aggregate({
            _max: {
                price: true
            },
            where: {
                status: 'active'
            }
        });
        res.json({ max: books._max.price });
    },
    findAvg: async (req, res) => {
        // SELECT AVG(price) FROM Book WHERE status = 'active'
        const books = await prisma.book.aggregate({
            _avg: { price: true },
            where: { status: 'active' }
        });
        res.json({ avg: books._avg.price });
    },
    findSum: async (req, res) => {
        // SELECT SUM(price) FROM Book WHERE status = 'active'
        const books = await prisma.book.aggregate({
            _sum: {
                price: true
            },
            where: {
                status: 'active'
            }
        });
        res.json({ sum: books._sum.price });
    },
    findAllStats: async (req, res) => {
        // SELECT MIN(price), MAX(price), AVG(price), SUM(price) FROM Book WHERE status = 'active'
        const stats = await prisma.book.aggregate({
            _min: {
                price: true
            },
            _max: {
                price: true
            },
            _avg: {
                price: true
            },
            _sum: {
                price: true
            },
            where: {
                status: 'active'
            }
        });

        res.json({
            min: stats._min.price,
            max: stats._max.price,
            avg: stats._avg.price,
            sum: stats._sum.price
        });
    },
    listBookAndAuthor: async (req, res) => {
        /**
         * SELECT * FROM Book 
         * JOIN Author ON Book.authorId = Author.id
         */
        const books = await prisma.book.findMany({
            include: {
                author: true,
                category: true
            }
        });
        res.json(books);
    },
    listAuthorAndBook: async (req, res) => {
        // SELECT * FROM Author
        // JOIN Book ON Author.id = Book.authorId
        const authors = await prisma.author.findMany({
            include: {
                books: true
            }
        });
        res.json(authors);
    },
    listPublisher: async (req, res) => {
        // SELECT * FROM Publisher
        // JOIN Author ON Publisher.id = Author.publisherId
        // JOIN Book ON Author.id = Book.authorId
        const publishers = await prisma.publisher.findMany({
            include: {
                authors: {
                    select: {
                        name: true,
                        books: {
                            select: { // SELECT name, price FROM Book WHERE status = 'active'
                                name: true,
                                price: true
                            },
                            where: {
                                status: 'active'
                            }
                        }
                    }
                }
            }
        });
        res.json(publishers);
    },
    list2: async (req, res) => {
        // SELECT * FROM Book
        // JOIN Category ON Book.categoryId = Category.id
        // JOIN Author ON Book.authorId = Author.id
        // JOIN Publisher ON Author.publisherId = Publisher.id
        const books = await prisma.book.findMany({
            include: {
                category: true,
                author: {
                    include: {
                        publisher: true
                    }
                }
            }
        });
        res.json(books);
    },
    publishers: async (req, res) => {
        const publishers = await prisma.publisher.findMany({
            orderBy: {
                name: 'asc'
            },
            include: {
                authors: true
            }
        });
        res.json(publishers);
    },
    categories: async (req, res) => {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        res.json(categories);
    }
}
