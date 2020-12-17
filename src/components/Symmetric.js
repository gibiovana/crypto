import React from 'react'
import '../style/Symmetric.css'


const  aesjs = require('aes-js')
const  shajs = require('sha.js')
let finalValue = 'batata';

const CTR = aesjs.ModeOfOperation.ctr

/**
 * Calculate SHA256 hash of `input`
 * @rtype (input: String) => hash: String
 * @param {String} input - Data to hash
 * @return {String} Hash
 */
function sha256hash (input) {
    return shajs('sha256').update(input).digest()
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
    finalValue = aesjs.utils.hex.fromBytes(encryptedBytes);
    alert(`O código encriptado é `+ finalValue);
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
    finalValue = aesjs.utils.utf8.fromBytes(decryptedBytes)
    alert(`O código decriptado é `+ finalValue);
}

function Symmetric() {
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
    </div>


  );
}

export default Symmetric;

