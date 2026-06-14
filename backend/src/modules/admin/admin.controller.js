const AdminService = require("./admin.service");
const { createUserSchema, createStoreSchema } = require("./admin.validator");

const dashboard = async (req, res) => {
    try {
        const data = await AdminService.getDashboardStats();
        return res.json({
            success: true,
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const createUser = async (req, res) => {
    try {
        const { error } = createUserSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message:
                    error.details[0].message,
            });
        }

        const user = await AdminService.createUser(req.body);

        return res.status(201).json({
            success: true,
            message: "User created successfully...!",
            data: user,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


const getUsers = async (req, res) => {
    try {
        const users = await AdminService.getUsers(req.query);
        return res.json({
            success: true,
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// const getUserById = async (req, res) => {
//     try {
//         const user = await AdminService.getUserById(
//             req.params.id
//         );
//         return res.json({
//             success: true,
//             data: user,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

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


const createStore = async (req, res) => {
    try {
        const { error } = createStoreSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const store = await AdminService.createStore(req.body);

        return res.status(201).json({
            success: true,
            data: store,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


const getStores = async (req, res) => {
    try {
        const stores =
            await AdminService.getStores(
                req.query
            );

        return res.json({
            success: true,
            data: stores,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const getStoreById = async (req, res) => {
    try {
        const store = await AdminService.getStoreById(req.params.id);
        return res.json({
            success: true,
            data: store,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    dashboard,
    createUser,
    getUsers,
    getUserById,
    createStore,
    getStores,
    getStoreById
};