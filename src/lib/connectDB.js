/*
  DataBase : 데이터를 저장하는 공간 
  Model : 데이터에 저장되는 정보 객체 
  Schema : Model 객체에 저장될 데이터의 자료형, property 구조를 강제하는 시스템적인 틀
  mongoose : MongoDB의 구조에 맞게 Model 객체, Schema 생성 및 모델 데이터 객체를 제어하는 라이브러리 

*/

export const mongoose = require('mongoose');
let isConnected = false;

const connectDB = async () => {
	try {
		if (isConnected) {
			console.log('already connected!');
			return;
		}
		const db = await mongoose.connect(process.env.MONGO_URI);
		isConnected = db.connection[0].readyState;
	} catch (err) {
		console.log(err);
		throw new Error('Fail to connect DB!');
	}
};
