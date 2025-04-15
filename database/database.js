import mongoose from "mongoose";
mongoose.set('strictQuery', true)
const connect = async() => {
    try{
        let connection = await mongoose.connect(process.env.MONGO_URI)
        console.log('✅ Connect mongoose successfully');
        return connection
    } catch(error) {
        const {code} = error
        debugger
        if(error.code === 8000 ){
            throw new Error('Wrong database usename and passrord')
        }else if(error.code === 'ENOTFOUND'){
            throw new Error('Wrong server name/connection string')
        }
        throw new Error('cannot connect to mongodb')
    }
}
export default connect