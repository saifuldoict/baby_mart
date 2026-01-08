
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
       
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "data:image/png;base64,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"
    },
    role: {
        type: String,
        enum: ["admin", "user", "deliveryman"],
        default: "user",
    },
    addresses: [
        {
            street: { type: String, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true },
            postalCode: { type: String, required: true },
            isDefault: { type: Boolean, default: false },
        },
    ],
    wishlist: [],
    cart: [],
},{
    timestamps: true
});

// Match user entered password to hashed password in database

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// 🔐 Hash password before save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
   
});


// Ensure only address is default

const User = mongoose.model("User", userSchema);
export default User;