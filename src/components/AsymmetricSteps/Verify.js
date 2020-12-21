import React from 'react'
import '../../style/Keys.css';

const nacl = require('tweetnacl')
const bs58check = require('bs58check')
const signer = require('nacl-signature')
nacl.util = require('tweetnacl-util')


function decodeBase58Check(str) {
  return bs58check.decode(str)
}

export function verify(signature, publicKey, message) {
  signature = Buffer.from(signature, 'hex')
  publicKey = decodeBase58Check(publicKey)
  let verify = signer.verify(message, signature, publicKey);
  alert(verify);
}

function Verify() {
  return (
    <div>
        <div className="before">
            <textarea placeholder="Mensagem assinada" className="textArea2" id="signed"/><br/>
            <input className="input2" placeholder="Chave pública do remetente" id="publicKey"/><br/> 
        </div>
        <div className="after">
        <textarea placeholder="Texto plano" className="textArea2" id="decryptedMessage"/><br/>
        <button type="button" className="button2" onClick={() => verify(document.getElementById("signed").value, document.getElementById("publicKey").value, document.getElementById("decryptedMessage").value)}>Assinar</button>
        </div>
    </div>
  );
}

export default Verify;

