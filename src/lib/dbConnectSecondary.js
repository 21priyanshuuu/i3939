import mongoose from "mongoose";

const dbConnectSecondary = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(
    "mongodb+srv://priyanshu185si:kgc0RVfKaDsXGrF3@cluster0.hfegnis.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

export default dbConnectSecondary;
