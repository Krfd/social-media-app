import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default:
                "https://toppng.com/public/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png",
        },
    },
    { timestamp: true }
);

const User = mongoose.model("User", userSchema);

export default User;
