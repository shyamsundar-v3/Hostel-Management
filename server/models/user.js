import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  // Support both legacy bcrypt hashes and new plaintext passwords for demo purposes
  if (this.password && (this.password.startsWith("$2a$") || this.password.startsWith("$2b$"))) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
  return enteredPassword === this.password;
};

userSchema.pre("save", async function (next) {
  // Removed bcrypt hashing so admin can see plaintext passwords in dashboard (as requested)
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
