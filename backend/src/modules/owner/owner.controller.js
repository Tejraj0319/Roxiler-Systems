const OwnerService = require(
    "./owner.service"
);

const dashboard = async (req, res) => {
    try {
        const data =
            await OwnerService.getDashboard(
                req.user.id
            );

        return res.json({
            success: true,
            data,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    dashboard,
};