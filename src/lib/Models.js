const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true },
		password: { type: String },
		img: { type: String },
		owner: { type: Boolean, default: false }
	},
	{ timestamps: true }
);

const postSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		desc: { type: String, required: true },
		img: { type: String },
		email: { type: String, required: true }
	},
	{ timestamps: true }
);
export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export const User = mongoose.models.User || mongoose.model('User', userSchema);

/*
  DB 의 종류는 크게 2가지가 있음. 
  - DBMS (database management system) : table 형식으로 저장하는 구조 - Oracle, MySQL, MsSQL, MariaDB ...
      SQL 문으로 DB 입출력

  - NoSQL : javascript의 JSON 객체 형식으로 저장하는 구조 - MongoDB

  MongoDB 형식 
    Database - collection(배열) - document (모델 객체)
*/
