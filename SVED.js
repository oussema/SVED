
const crypto=require('crypto');
const IV_LENGTH = 16; // For AES, this is always 16

function signMessage(message,privateKey){
    const sign = crypto.createSign('SHA256');
    sign.write(message);
    sign.end();
    const signature = sign.sign(privateKey, 'hex');
     return signature;
  }
  function verifySignedMessage(message,publicKey,signature){
    const verify = crypto.createVerify('SHA256');
    verify.write(message);
    verify.end();
    return verify.verify(publicKey, signature,'hex'); //return true or false
  }
    
  
  
  
    function encryptMessage(message,encryptionKey) {
      let iv = crypto.randomBytes(IV_LENGTH);
      let cipher = crypto.createCipheriv('aes-256-cbc',encryptionKey, iv);
      let encrypted = cipher.update(message);
    
      encrypted = Buffer.concat([encrypted, cipher.final()]);
    
      return iv.toString('hex') + ':' + encrypted.toString('hex');
    }
    
    function decryptMessage(message,encryptionKey) {
      let textParts = message.split(':');
      let iv = new Buffer(textParts.shift(), 'hex');
      let encryptedText = new Buffer(textParts.join(':'), 'hex');
      let decipher = crypto.createDecipheriv('aes-256-cbc',encryptionKey, iv);
      let decrypted = decipher.update(encryptedText);
    
      decrypted = Buffer.concat([decrypted, decipher.final()]);
    
      return decrypted.toString();
    }
    module.exports = { signMessage,verifySignedMessage,decryptMessage, encryptMessage };
