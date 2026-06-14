const AuthService = require("./auth.service");
const { registerSchema, loginSchema, changePasswordSchema } = require("./auth.validator");

const register = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const user = await AuthService.register(req.body);

        return res.status(201).json({
            success: true,
            message: "Registration successful....!",
            data: user,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


const login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const result = await AuthService.login(req.body);

        return res.status(200).json({
            success: true,
            message: "Login successful...!",
            data: result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


const changePassword = async (req, res) => {
    try {
        const { error } = changePasswordSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        await AuthService.changePassword(req.user.id, req.body.oldPassword, req.body.newPassword);
        return res.json({
            success: true,
            message: "Password updated successfully...!",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    register,
    login,
    changePassword,
};