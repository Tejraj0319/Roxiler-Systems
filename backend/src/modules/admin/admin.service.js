const prisma = require("../../config/prisma");
const bcrypt = require("bcryptjs");

const createUser = async (data) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (existingUser) {
        throw new Error("Email already exists...!");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            address: data.address,
            password: hashedPassword,
            role: data.role,
        },
    });
    return user;
};


const getDashboardStats = async () => {
    const totalUsers = await prisma.user.count();
    const totalStores = await prisma.store.count();
    const totalRatings = await prisma.rating.count();
    return {
        totalUsers,
        totalStores,
        totalRatings,
    };
};


const getUsers = async (query) => {
    const { name, email, address, role, sortBy = "name", order = "asc", } = query;

    const users = await prisma.user.findMany({
        where: {
            ...(name && {
                name: {
                    contains: name,
                },
            }),

            ...(email && {
                email: {
                    contains: email,
                },
            }),

            ...(address && {
                address: {
                    contains: address,
                },
            }),

            ...(role && { role }),
        },

        select: {
            id: true,
            name: true,
            email: true,
            address: true,
            role: true,
        },

        orderBy: {
            [sortBy]: order,
        },
    });

    return users;
};


const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            stores: {
                include: {
                    ratings: true,
                },
            },
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    let averageRating = null;

    if (
        user.role === "STORE_OWNER" &&
        user.stores.length
    ) {
        const ratings =
            user.stores[0].ratings;

        averageRating =
            ratings.length > 0
                ? Number(
                    (
                        ratings.reduce(
                            (sum, rating) =>
                                sum + rating.rating,
                            0
                        ) / ratings.length
                    ).toFixed(1)
                )
                : 0;
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
        averageRating,
    };
};


const createStore = async (data) => {
    const owner = await prisma.user.findUnique({
        where: {
            id: data.ownerId,
        },
    });

    if (!owner || owner.role !== "STORE_OWNER") {
        throw new Error(
            "Invalid store owner..!"
        );
    }

    return prisma.store.create({
        data: {
            name: data.name,
            email: data.email,
            address: data.address,
            ownerId: data.ownerId,
        },
    });
};


const getStores = async (query) => {
    const { name, email, address, sortBy = "name", order = "asc", } = query;

    const stores = await prisma.store.findMany({
        where: {
            ...(name && {
                name: {
                    contains: name,
                },
            }),

            ...(email && {
                email: {
                    contains: email,
                },
            }),

            ...(address && {
                address: {
                    contains: address,
                },
            }),
        },

        include: {
            ratings: true,
        },

        orderBy: {
            [sortBy]: order,
        },
    });

    return stores.map((store) => {
        const avgRating =
            store.ratings.length > 0
                ? (
                    store.ratings.reduce(
                        (sum, rating) =>
                            sum + rating.rating,
                        0
                    ) / store.ratings.length
                ).toFixed(1)
                : 0;

        return {
            id: store.id,
            name: store.name,
            email: store.email,
            address: store.address,
            rating: Number(avgRating),
        };
    });
};


const getStoreById = async (id) => {
    const store = await prisma.store.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            owner: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            ratings: true,
        },
    });

    if (!store) {
        throw new Error("Store not found");
    }

    const averageRating =
        store.ratings.length > 0
            ? (
                store.ratings.reduce(
                    (sum, rating) =>
                        sum + rating.rating,
                    0
                ) / store.ratings.length
            ).toFixed(1)
            : 0;

    return {
        ...store,
        averageRating,
    };
};

module.exports = {
    createUser,
    getDashboardStats,
    getUsers,
    getUserById,
    createStore,
    getStores,
    getStoreById,
};