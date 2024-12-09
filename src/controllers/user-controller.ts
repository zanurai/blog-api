import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import User from "../models/user";
import generateToken from "../utils/generate-token";

import multer from "multer";

declare global {
  namespace Express {
    interface Request {
      user?: any;
      _id?: string;
      file?: Express.Multer.File;
    }
  }
}

const authUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id as string);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  }
);

const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({ name, email, password });

    if (user) {
      generateToken(res, user._id as string);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("User not created");
    }
  }
);

const logoutUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User logged Out" });
  }
);

const getUserProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profileImage: req.user.profileImage,
    };

    res.status(200).json(user);
  }
);

const updateUserProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.profileImage = req.body.profileImage || user.profileImage;

      if (req.body.password) {
        user.password = req.body.password;
      }

      if (req.file) {
        console.log("Saving file:", req.file);
        user.profileImage = `/uploads/${req.file.filename}`;
      } else {
        console.log("No file uploaded");
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profileImage: updatedUser.profileImage,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
