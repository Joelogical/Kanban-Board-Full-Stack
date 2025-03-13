"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = void 0;
const user_js_1 = require("../models/user.js");
const seedUsers = async () => {
    await user_js_1.User.bulkCreate([
        {
            username: "JollyGuru",
            password: "password",
            email: "jolly@example.com",
        },
        {
            username: "SunnyScribe",
            password: "password",
            email: "sunny@example.com",
        },
        {
            username: "RadiantComet",
            password: "password",
            email: "radiant@example.com",
        },
    ], { individualHooks: true });
};
exports.seedUsers = seedUsers;
