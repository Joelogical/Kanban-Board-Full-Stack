const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, '../../config');
require("dotenv").config();

// Add this debug line
console.log("Process running from:", process.cwd());
console.log("Config dir:", process.env.NODE_CONFIG_DIR);

// ... rest of your server code 