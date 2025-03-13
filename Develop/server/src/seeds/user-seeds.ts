import { User } from "../models/user.js";

export const seedUsers = async () => {
  await User.bulkCreate(
    [
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
    ],
    { individualHooks: true }
  );
};
