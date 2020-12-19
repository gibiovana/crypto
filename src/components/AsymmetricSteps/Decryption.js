import React from 'react'
import '../../style/Keys.css';

const nacl = require('tweetnacl')
const ed2curve = require('ed2curve')
nacl.util = require('tweetnacl-util')


export function decrypt(encrypted, ephemPubKey, originalNonce, version, secretKey) {
    const receiverSecretKeyUint8Array = ed2curve.convertSecretKey(Buffer.from(secretKey, 'hex'))
    const decrypted = nacl.box.open(
      encrypted,
      ephemPubKey,
      originalNonce,
      version,
      receiverSecretKeyUint8Array
    )
    const finalDecryption = decrypted ? nacl.util.encodeUTF8(decrypted) : decrypted
    document.getElementsByName('decrypted')[0].value=`${finalDecryption}`;
  }

function Encryption() {
  return (
    <div>
      <div className="before">
        Texto:
        <input placeholder="Texto encriptado" id="encrypted" className="output"/><br/>
        Key:
        <input placeholder="Ephem Public Key" id="ephemPubKey" className="output"/><br/>
        Nonce:
        <input placeholder="Nonce" id="nonce" className="output"/><br/>
        Version:
        <input placeholder="Version" id="version" className="output"/><br/>
      </div>
      <div className="after">
          <textarea placeholder="Texto plano" className="textArea2" id="message"/><br/>
          <input className="fields" className="publicKey" placeholder="Chave privada" id="password"/><br/> 
          <button type="button" className="button2" onClick={() => decrypt(
            document.getElementById("encrypted").value, 
            document.getElementById("ephemPubKey").value,
            document.getElementById("nonce").value,
            document.getElementById("version").value,
            document.getElementById("password").value)}>Decriptar</button>
      </div>
    </div>
  );
}

export default Encryption;

