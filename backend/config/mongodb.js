import mongoose from "mongoose";

const connectToDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB Connected Successfully!!!");
  });

  await mongoose.connect(`${process.env.MONGO_URI}/e-commerce-hasanah`);
};

export default connectToDB;
