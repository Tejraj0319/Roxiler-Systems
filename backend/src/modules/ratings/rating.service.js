const prisma = require("../../config/prisma");

const submitRating = async (userId, storeId, rating) => {
    const store = await prisma.store.findUnique({
        where: {
            id: storeId,
        },
    });

    if (!store) {
        throw new Error("Store not found");
    }

    const existingRating = await prisma.rating.findUnique({
        where: {
            userId_storeId: {
                userId,
                storeId,
            },
        },
    });

    if (existingRating) {
        throw new Error(
            "Rating already submitted"
        );
    }

    return prisma.rating.create({
        data: {
            userId,
            storeId,
            rating,
        },
    });
};

const updateRating = async (ratingId, userId, rating) => {
    const existingRating = await prisma.rating.findUnique({
        where: {
            id: Number(ratingId),
        },
    });

    if (!existingRating) {
        throw new Error("Rating not found");
    }

    if (existingRating.userId !== userId) {
        throw new Error(
            "Unauthorized update"
        );
    }

    return prisma.rating.update({
        where: {
            id: Number(ratingId),
        },
        data: {
            rating,
        },
    });
};

module.exports = {
    submitRating,
    updateRating,
};