import React from 'react'
import '../../style/Keys.css';

const nacl = require('tweetnacl')
const bs58check = require('bs58check')
const signer = require('nacl-signature')
nacl.util = require('tweetnacl-util')


function decodeBase58Check(str) {
  return bs58check.decode(str)
}

export function verify(message, signature, publicKey) {
  signature = Buffer.from(signature, 'hex')
  publicKey = decodeBase58Check(publicKey)
  return signer.verify(message, signature, publicKey)
}

function Verify() {
  return (
    <div>
        <div className="before">
            <textarea placeholder="Mensagem assinada" className="textArea2" id="message"/><br/>
            <input className="input2" placeholder="Chave pública do remetente" id="password"/><br/> 
        </div>
        <div className="after">
        <textarea placeholder="Texto plano" className="textArea2" name="result"/><br/>
        <button type="button" className="button2" onClick={() => verify(document.getElementById("message").value, document.getElementById("password").value)}>Assinar</button>
        </div>
    </div>
  );
}

export default Verify;

