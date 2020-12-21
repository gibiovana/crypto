import React from 'react';
import '../../style/Keys.css';

const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
const bs58check = require('bs58check');

function encodeBase58Check(input) {
  return bs58check.encode(Buffer.from(input));
}

export function generateKeyPair() {
  const keyPair = nacl.sign.keyPair();
  const publicBuffer = Buffer.from(keyPair.publicKey);
  const secretBuffer = Buffer.from(keyPair.secretKey);
  let publicKey = encodeBase58Check(publicBuffer);
  let secretKey = secretBuffer.toString('hex');
  document.getElementsByName('PublicKey')[0].value = `${publicKey}`;
  document.getElementsByName('PrivateKey')[0].value = `${secretKey}`;
}

function Keys() {
  return (
    <div>
      <button className="button2" onClick={() => generateKeyPair()}>
        Gerar par
      </button>
      <br />
      Public Key: <input className="input2" disabled="true" name="PublicKey"></input> <br />
      Private Key: <input className="input2" disabled="true" name="PrivateKey"></input>
    </div>
  );
}

export default Keys;
