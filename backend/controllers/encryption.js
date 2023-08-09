const crypto = require("crypto");
const Collection = require("../model/Collection");
const Profile = require("../model/Profiles");

    const createKey = async (id) => {
        //Generate a random IV for the encryption algorithm
        const secretKey = crypto.randomBytes(32);
        // const token = crypto.randomBytes(32);
        const maskKey = Buffer.from(process.env.MASK_KEY, 'hex');
        //Encrypt string
        const obfuscatedKey = Buffer.from(
        Array.from(secretKey).map((byte, index) => byte ^ maskKey[index])
        );
        //Convert the obfuscated key to a hex string
        const obfuscatedKeyHex = obfuscatedKey.toString('hex');
        const key = await Collection.create({id, okys: obfuscatedKeyHex});
        return key;
    };


    const encrypt = async (data, id) => {
        const jsonData = JSON.stringify(data);
        const key = await Collection.findOne({where: {id: id}});
        const obfuscatedKeyHex = key.okys; 
        const obfuscatedKey = Buffer.from(obfuscatedKeyHex, 'hex');
        const maskKey = Buffer.from(process.env.MASK_KEY, "hex");
        const recoveredKey = Buffer.from(
         Array.from(obfuscatedKey).map((byte, index) => byte ^ maskKey[index])
        );
        const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv('aes-256-cbc', recoveredKey, iv);
      const encrypted = cipher.update(jsonData, 'utf8', 'hex') + cipher.final('hex');
      return `${encrypted}.${iv.toString('hex')}`;
    }


    const decrypt = async (encrypted, id) => {
        const [encrypt, ivHex] = encrypted.split('.');
        const iv = Buffer.from(ivHex, 'hex');
        const key = await Collection.findOne({where: {id: id}});
        const obfuscatedKeyHex = key.okys; 
        const obfuscatedKey = Buffer.from(obfuscatedKeyHex, 'hex');
        const maskKey = Buffer.from(process.env.MASK_KEY, "hex");
        const recoveredKey = Buffer.from(
         Array.from(obfuscatedKey).map((byte, index) => byte ^ maskKey[index])
        );
        // const response = await Profile.findOne({where: {id: id}})
        // const iv = response.iv;
        const decipher = crypto.createDecipheriv('aes-256-cbc', recoveredKey, iv);
        const decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
        
        return JSON.parse(decrypted);
    }

module.exports = {
    createKey,
    encrypt,
    decrypt,
};
