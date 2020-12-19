import React from 'react'
import '../../style/Keys.css';

const nacl = require('tweetnacl')
const bs58check = require('bs58check')
const ed2curve = require('ed2curve')
nacl.util = require('tweetnacl-util')

function decodeBase58Check(str) {
    return bs58check.decode(str)
}

export function encrypt(msg, publicKey) {
    const ephemeralKeyPair = nacl.box.keyPair()
    const pubKeyUInt8Array = decodeBase58Check(publicKey)
    let nonce = nacl.randomBytes(nacl.box.nonceLength)
  
    const encryptedMessage = nacl.box(
      Buffer.from(msg),
      nonce,
      ed2curve.convertPublicKey(pubKeyUInt8Array),
      ephemeralKeyPair.secretKey
    )
    let ciphertext = Buffer.from(encryptedMessage).toString('hex');
    let ephemPubKey = Buffer.from(ephemeralKeyPair.publicKey).toString('hex');
    nonce = Buffer.from(nonce).toString('hex');
    let version = 'x25519-xsalsa20-poly1305';
    document.getElementsByName('encrypted')[0].value=`${ciphertext}`;
    document.getElementsByName('ephemPubKey')[0].value=`${ephemPubKey}`;
    document.getElementsByName('nonce')[0].value= `${nonce}`;
    document.getElementsByName('version')[0].value= `${version}`;
  }


function Encryption() {
  return (
    <div>
        <div className="before">
            <textarea placeholder="Texto plano" className="textArea2" id="message"/><br/>
            <input className="fields" className="publicKey" placeholder="Chave pública" id="password"/><br/> 
            <button type="button" className="button2" onClick={() => encrypt(document.getElementById("message").value, document.getElementById("password").value)}>Encriptar</button>
        </div>
        <div className="after">
          Texto:
          <input placeholder="Texto encriptado" name="encrypted" className="output"/><br/>
          Key:
          <input placeholder="Ephem Public Key" name="ephemPubKey" className="output"/><br/>
          Nonce:
          <input placeholder="Nonce" name="nonce" className="output"/><br/>
          Version:
          <input placeholder="Version" name="version" className="output"/><br/>
        </div>
    </div>
  );
}

export default Encryption;

