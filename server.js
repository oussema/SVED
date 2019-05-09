const express = require('express');
const crypto=require('crypto');
const sved=require('./SVED');
const app = express();


// choose the encryption as you like but it must be 256 bytes (32 characters)

const encryptionKey = "oooooooooooooooooooooooooooooooo"; 
    
//To generate privateKey and publicKey to the demo, you could change option 'ec' to 'rsa'

const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
    namedCurve: 'sect239k1',
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
  });
const message="this is an example of message to treat";
const signatureOfMessage=sved.signMessage(message,privateKey);
  var encryptedMessage=sved.encryptMessage(message,encryptionKey);
  console.log('\n=====this is the signature of the message=====\n'+signatureOfMessage);
  console.log('\n====verify this messaeg signature with publickey===\n'+sved.verifySignedMessage(message,publicKey,signatureOfMessage));
  console.log('\n==encryption==\n'+encryptedMessage);
  console.log('\n==decryption==\n'+sved.decryptMessage(encryptedMessage,encryptionKey)+'\n');
