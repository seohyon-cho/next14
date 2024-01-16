const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		desc: { type: String, required: true },
		img: { type: String, required: false }
	},
	{ timestamps: true }
);

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
