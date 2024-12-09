import mongoose, { Document, Schema } from "mongoose";

export interface Blog extends Document {
  title: string;
  description: string;
  isDeleted: boolean;
  image?: string;
}

const blogSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  image: {
    type: String,
  },
});

const BlogModel = mongoose.model<Blog>("Blog", blogSchema);
export default BlogModel;
