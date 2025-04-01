"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = require("./models/index");
const index_2 = __importDefault(require("./routes/api/index"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3002;
// Debug logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// CORS middleware for development
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
// API Routes
app.use("/api", index_2.default);
app.use("/auth", auth_routes_1.default);
// Serves static files in production
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(process.cwd(), "dist/client")));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(process.cwd(), "dist/client/index.html"));
    });
}
// Basic test route
app.get("/test", (req, res) => {
    res.json({ message: "Server is running" });
});
const forceDatabaseRefresh = true;
index_1.sequelize
    .sync({ force: forceDatabaseRefresh })
    .then(async () => {
    // Create test user
    try {
        await index_1.User.findOrCreate({
            where: { username: "test" },
            defaults: {
                username: "test",
                password: await bcryptjs_1.default.hash("password123", 10),
                email: "test@example.com",
            },
        });
    }
    catch (error) {
        console.error("Error creating test user:", error);
    }
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
});
