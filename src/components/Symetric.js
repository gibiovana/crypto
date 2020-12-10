import React from 'react';
import Alert from '@material-ui/lab/Alert'
import '../style/Symetric.css'
import Dialog from './Dialog'


const  aesjs = require('aes-js')
const  shajs = require('sha.js')
const  { blake2b } = require('blakejs')

const CTR = aesjs.ModeOfOperation.ctr
/**
 * Calculate 256bits Blake2b hash of `input`
 * @rtype (input: String) => hash: String
 * @param {String|Buffer} input - Data to hash
 * @return {Buffer} Hash
 */
function blakeHash (input) {
    return Buffer.from(blake2b(input, null, 32)) // 256 bits
  }

/**
 * Calculate SHA256 hash of `input`
 * @rtype (input: String) => hash: String
 * @param {String} input - Data to hash
 * @return {String} Hash
 */
function sha256hash (input) {
    return shajs('sha256').update(input).digest()
  }
  
function sha256hashStr(input){
  return aesjs.utils.hex.fromBytes(sha256hash(input));
}

/**
 * Encrypt given data using `password`
 * @rtype (password: String, binaryData: Buffer) => Uint8Array
 * @param {String} password - Password to encrypt with
 * @param {String} message - Data to encrypt
 * @return {String} Encrypted data
 */

function encryptData (password, message) {
    const binaryData = aesjs.utils.utf8.toBytes(message)
    const hashedPasswordBytes = sha256hash(password)
    const aesCtr = new CTR(hashedPasswordBytes)
    const encryptedBytes = aesCtr.encrypt(binaryData)
    const finalValue = aesjs.utils.hex.fromBytes(encryptedBytes);
    getEncryptedValue(finalValue);
    showAlert(finalValue);
    return finalValue
  }

/**
 * Decrypt given data using `password`
 * @rtype (password: String, encrypted: String) => Uint8Array
 * @param {String} password - Password to decrypt with
 * @param {String} encrypted - Data to decrypt
 * @return {String} Decrypted data
 */
function decryptData (password, encrypted) {
    const encryptedBytes = aesjs.utils.hex.toBytes(encrypted);
    const hashedPasswordBytes = sha256hash(password)
    const aesCTR = new CTR(hashedPasswordBytes)
    const decryptedBytes = aesCTR.decrypt(encryptedBytes)
    const finalValue = aesjs.utils.utf8.fromBytes(decryptedBytes)
    getEncryptedValue(finalValue);
    showAlert(finalValue);
    return finalValue;
}

function showAlert(){
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

function getEncryptedValue(finalValue){
  return `O código encriptado é `+ finalValue;
}

function Symetric() {
  return (
    <div>
        <div className="before">
            <input className="fields" placeholder="Chave secreta" id="password"/><br/>    
            <textarea placeholder="Texto a ser encriptado" className="textArea" id="message"/><br/>
            <button type="button" className="button" onClick={() => encryptData(document.getElementById("password").value, document.getElementById("message").value )}>Encriptar</button>
        </div>
        <div className="after">
          <textarea placeholder="Texto encriptado" id="encrypted" className="cypherText"/><br/>
          <button type="button" className="button" onClick={() => decryptData(document.getElementById("password").value, document.getElementById("encrypted").value)}>Decriptar</button>
        </div>
    <div id="snackbar">{ getEncryptedValue() }</div>
    </div>


  );
}

export default Symetric;

