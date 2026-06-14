const prisma = require("../../config/prisma");

const getDashboard = async (ownerId) => {
  const stores = await prisma.store.findMany({
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

    orderBy: {
      name: "asc",
    },
  });

  if (!stores.length) {
    throw new Error("No stores found for this owner.");
  }

  const dashboardStores = stores.map((store) => {
    const averageRating =
      store.ratings.length > 0
        ? Number(
            (
              store.ratings.reduce(
                (sum, rating) => sum + rating.rating,
                0
              ) / store.ratings.length
            ).toFixed(1)
          )
        : 0;

    return {
      storeId: store.id,
      storeName: store.name,
      email: store.email,
      address: store.address,
      averageRating,

      totalRatings: store.ratings.length,

      ratedUsers: store.ratings.map((rating) => ({
        userId: rating.user.id,
        name: rating.user.name,
        email: rating.user.email,
        rating: rating.rating,
      })),
    };
  });

  return {
    totalStores: dashboardStores.length,
    stores: dashboardStores,
  };
};

module.exports = {
  getDashboard,
};
