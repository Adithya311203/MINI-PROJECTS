import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient;
const mongo_username=process.env['MONGO_USERNAME']
const mongo_password=process.env['MONGO_PASSWORD']