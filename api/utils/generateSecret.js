const cryptoRandomStringPromise = import("crypto-random-string");
const generateSecret = async(value)=>{
 // const cryptoRandomString = await cryptoRandomStringPromise;
 const { default: cryptoRandomString } = await cryptoRandomStringPromise;
 return cryptoRandomString({length:value})
}

module.exports = generateSecret