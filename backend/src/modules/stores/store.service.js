const prisma = require("../../config/prisma");

const getStores = async (userId, query) => {
    const { name, address, sortBy = "name", order = "asc", } = query;

    const stores = await prisma.store.findMany({
        where: {
            ...(name && {
                name: {
                    contains: name,
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
        const overallRating =
            store.ratings.length > 0
                ? Number(
                    (
                        store.ratings.reduce(
                            (sum, rating) =>
                                sum + rating.rating,
                            0
                        ) / store.ratings.length
                    ).toFixed(1)
                )
                : 0;

        const userRating =
            store.ratings.find(
                (rating) =>
                    rating.userId === userId
            );

        return {
            id: store.id,
            storeName: store.name,
            address: store.address,
            overallRating,
            userRating:
                userRating?.rating || null,
        };
    });
};

module.exports = {
    getStores,
};