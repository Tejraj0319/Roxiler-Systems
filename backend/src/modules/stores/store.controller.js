const StoreService = require("./store.service");

const getStores = async (req, res) => {
    try {
        const stores = await StoreService.getStores(
            req.user.id,
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

module.exports = {
    getStores,
};

