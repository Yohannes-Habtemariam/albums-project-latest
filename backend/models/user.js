import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    emailAddress: { type: String, required: true, unique: true },
    albums: [
        { 
            band: { type: String, required: true },
            albumTitle: { type: String, required: true },
            albumYear: { type: Number, required: true }
        }
    ]
}, {timestamps: true});

userSchema.pre("save", function(next){
    if(!firstName) {
        this.firstName = "John";
    };

    if(!lastName) {
        this.lastName = "Doe"
    };

    next()
})


const User = mongoose.model("User", userSchema);

export default User;