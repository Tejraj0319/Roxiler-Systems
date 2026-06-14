const prisma = require("../../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (data) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (existingUser) {
        throw new Error("Email already exists!");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            address: data.address,
            password: hashedPassword,
            role: "USER",
        },
    });

    return user;
};


const login = async (data) => {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (!user) {
        throw new Error("Invalid credentials!");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials!");
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );

    return { token, user, };
};


const changePassword = async (userId, oldPassword, newPassword) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
        throw new Error("Old password is incorrect...!");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            password: hashedPassword,
        },
    });
    return true;
};


module.exports = {
    register,
    login,
    changePassword,
};