import React from 'react'
import '../../style/Keys.css';

const nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util')

export function sign(data, privateKey) {
    const result = Buffer.from(nacl.sign.detached(Buffer.from(data), Buffer.from(privateKey, 'hex'))).toString('hex')
    document.getElementsByName('result')[0].value=`${result}`;
    return result;
  }

function Sign() {
  return (
    <div>
        <div className="before">
            <textarea placeholder="Texto plano" className="textArea2" id="message"/><br/>
            <input className="input2" placeholder="Chave privada do remetente" id="password"/><br/> 
            <button type="button" className="button2" onClick={() => sign(document.getElementById("message").value, document.getElementById("password").value)}>Assinar</button>
        </div>
        <div className="after">
        <textarea placeholder="Mensagem assinada" className="textArea2" name="result"/><br/>
        </div>
    </div>
  );
}

export default Sign;

