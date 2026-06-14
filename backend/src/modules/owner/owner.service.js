const prisma = require("../../config/prisma");

const getDashboard = async (ownerId) => {
    const store = await prisma.store.findFirst({
        where: {
            ownerId,
        },

        include: {
            ratings: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            },
        },
    });

    if (!store) {
        throw new Error(
            "Store not found"
        );
    }

    const averageRating =
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

    return {
        storeId: store.id,
        storeName: store.name,
        averageRating,
        ratedUsers: store.ratings.map((rating) => ({
            userId: rating.user.id,
            name: rating.user.name,
            email: rating.user.email,
            rating: rating.rating,
        })),
    };
};

module.exports = {
    getDashboard,
};