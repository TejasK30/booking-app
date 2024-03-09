import bcrypt from 'bcrypt';
import { Schema, model } from "mongoose";
import { UserType } from '../shared/types';

const userSchema = new Schema<UserType>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
    unique: true
  },
  lastname: {
    type: String,
    required: true,
    unique: true
  },
})

userSchema.pre("save", async function(next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

const User = model<UserType>("User", userSchema)

export default User