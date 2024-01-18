const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		desc: { type: String, required: true },
		img: { type: String, required: false },
		userid: { type: String, required: false }
	},
	{ timestamps: true }
);

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: false },
		img: { type: String, required: false }
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
