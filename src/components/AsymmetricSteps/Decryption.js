import React from 'react'
import '../../style/Keys.css';

const nacl = require('tweetnacl')
const ed2curve = require('ed2curve')
nacl.util = require('tweetnacl-util')

function substring(encryptedData){
    let encryptedText = encryptedData.search(`{"cipherText": `);
    let ephemPubKey = encryptedData.search(`, "ephemPubKey": `);
    let nonce = encryptedData.search(`, "nonce": `);
    let version = encryptedData.search(`, "version": `);
    let toGetCipher = encryptedData.substring(encryptedText, ephemPubKey);
    let toGetPubKey = encryptedData.substring(ephemPubKey, ephemPubKey);
}

export function decrypt(encryptedData, secretKey) {
    substring(encryptedData);
    const receiverSecretKeyUint8Array = ed2curve.convertSecretKey(Buffer.from(secretKeyAsString, 'hex'))
    const nonce = Buffer.from(encryptedData.nonce, 'hex')
    const ciphertext = Buffer.from(encryptedData.ciphertext, 'hex')
    const ephemPubKey = Buffer.from(encryptedData.ephemPubKey, 'hex')
    const decrypted = nacl.box.open(
      ciphertext,
      nonce,
      ephemPubKey,
      receiverSecretKeyUint8Array
    )
    const finalDecryption = decrypted ? nacl.util.encodeUTF8(decrypted) : decrypted
    document.getElementsByName('decrypted')[0].value=`${finalDecryption}`;
  }

function Encryption() {
  return (
    <div>
        <div className="before">
            <textarea placeholder="Texto cifrado" className="textArea2" id="message"/><br/>
            <input className="fields" className="input3" placeholder="Chave privada" id="password"/><br/> 
            <button type="button" className="button2" onClick={() => decrypt(document.getElementById("message").value, document.getElementById("password").value)}>Decriptar</button>
        </div>
        <div className="after">
          <textarea placeholder="Texto plano" name="decrypted" className="cypherText2"/><br/>
        </div>
    </div>
  );
}

export default Encryption;

