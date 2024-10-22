import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`Successfully connected to db`);
    app.listen(config.port, () => {
      console.log(
        `University management app is listening on port ${config.port}`
      );
    });
  } catch (err) {
    console.log(`Failed to connect to db`, err);
  }
}

main();
