import mongoose ,{Schema, Document}from "mongoose";

export interface IUser extends Document{
    username: string;
    hashed_password: string;
}

const User_Schema = new Schema<IUser>({
    username : {
        type: String,
        required: true,
        unique: true
    },

    hashed_password : {
        type: String,
        required: true
    }
});

export const User = mongoose.model<IUser>("User", User_Schema);
