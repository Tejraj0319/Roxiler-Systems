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


const updateRating = async (storeId, userId, rating) => {
    const existingRating = await prisma.rating.findFirst({
        where: {
            storeId: Number(storeId),
            userId: Number(userId),
        },
    });
    if (!existingRating) {
        throw new Error("Rating record not found for this store by this user.");
    }
    return prisma.rating.update({
        where: {
            id: existingRating.id,
        },
        data: {
            rating: Number(rating),
        },
    });
};

module.exports = {
    submitRating,
    updateRating,
};