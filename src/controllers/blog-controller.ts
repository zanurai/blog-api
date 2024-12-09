import { Request, Response } from "express";
import BlogModel, { Blog } from "../models/blog";

export const createBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description } = req.body;

  try {
    const newBlog: Blog = new BlogModel({
      title,
      description,

      isDeleted: false,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: "Error creating blog", error });
  }
};

export const getAllBlogs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const blogs = await BlogModel.find({ isDeleted: false });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ message: "Error fetching blogs", error });
  }
};

export const getBlogById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findById(id).where("isDeleted").equals(false);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ message: "Error fetching blog", error });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { title, description, isDeleted } = req.body;

  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { title, description, isDeleted },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: "Error updating blog", error });
  }
};

export const removeBlog = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.isDeleted = true;
    await blog.save();

    res.status(200).json({ message: "Blog removed successfully", blog });
  } catch (error) {
    res.status(400).json({ message: "Error removing blog", error });
  }
};
