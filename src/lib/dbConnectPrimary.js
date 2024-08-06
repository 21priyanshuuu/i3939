// lib/dbConnectPrimary.js
import mongoose from "mongoose";

const dbConnectPrimary = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(
      "mongodb+srv://priyanshu185si:kgc0RVfKaDsXGrF3@cluster0.hfegnis.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to primary database");
  } catch (error) {
    console.error("Error connecting to primary database:", error);
  }
};

export default dbConnectPrimary;
