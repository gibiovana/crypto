import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import '../style/Symmetric.css';

const aesjs = require('aes-js');
const shajs = require('sha.js');
let finalValue = 'batata';

const CTR = aesjs.ModeOfOperation.ctr;

function Symmetric() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [encrypted, setEncrypted] = useState('');

  /**
   * Calculate SHA256 hash of `input`
   * @rtype (input: String) => hash: String
   * @param {String} input - Data to hash
   * @return {String} Hash
   */
  function sha256hash(input) {
    return shajs('sha256').update(input).digest();
  }

  /**
   * Encrypt given data using `password`
   * @rtype (password: String, binaryData: Buffer) => Uint8Array
   * @param {String} password - Password to encrypt with
   * @param {String} message - Data to encrypt
   * @return {String} Encrypted data
   */

  function encryptData() {
    const binaryData = aesjs.utils.utf8.toBytes(message);
    const hashedPasswordBytes = sha256hash(password);
    const aesCtr = new CTR(hashedPasswordBytes);
    const encryptedBytes = aesCtr.encrypt(binaryData);
    finalValue = aesjs.utils.hex.fromBytes(encryptedBytes);
    setEncrypted(finalValue);
  }

  /**
   * Decrypt given data using `password`
   * @rtype (password: String, encrypted: String) => Uint8Array
   * @param {String} password - Password to decrypt with
   * @param {String} encrypted - Data to decrypt
   * @return {String} Decrypted data
   */
  function decryptData() {
    const encryptedBytes = aesjs.utils.hex.toBytes(encrypted);
    const hashedPasswordBytes = sha256hash(password);
    const aesCTR = new CTR(hashedPasswordBytes);
    const decryptedBytes = aesCTR.decrypt(encryptedBytes);
    finalValue = aesjs.utils.utf8.fromBytes(decryptedBytes);
    setMessage(finalValue);
  }

  const handleTextChange = (e) => {
    switch (e.target.name) {
      case 'password':
        setPassword(e.target.value);
        break;
      case 'message':
        setMessage(e.target.value);
        break;
      case 'encrypted':
        setEncrypted(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <Grid container>
      <Grid item md={12} lg={6} className="upper-grid">
        <input
          className="fields"
          placeholder="Chave secreta"
          name="password"
          onChange={handleTextChange}
          value={password}
        />
        <br />
        <textarea
          placeholder="Texto a ser encriptado"
          className="textArea"
          name="message"
          onChange={handleTextChange}
          value={message}
        />
        <br />
        <button type="button" className="button" onClick={encryptData}>
          Encriptar
        </button>
      </Grid>
      <Grid item md={12} lg={6}>
        <textarea
          placeholder="Texto encriptado"
          className="cypherText"
          name="encrypted"
          onChange={handleTextChange}
          value={encrypted}
        />
        <br />
        <button type="button" className="button" onClick={decryptData}>
          Decriptar
        </button>
      </Grid>
    </Grid>
  );
}

export default Symmetric;
