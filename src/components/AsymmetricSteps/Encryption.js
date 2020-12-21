import React from 'react';
import '../../style/Keys.css';
import { Grid } from '@material-ui/core';

const nacl = require('tweetnacl');
const bs58check = require('bs58check');
const ed2curve = require('ed2curve');
nacl.util = require('tweetnacl-util');

function decodeBase58Check(str) {
  return bs58check.decode(str);
}

export function encrypt(msg, publicKey) {
  const ephemeralKeyPair = nacl.box.keyPair();
  const pubKeyUInt8Array = decodeBase58Check(publicKey);
  const nonce = nacl.randomBytes(nacl.box.nonceLength);

  const encryptedMessage = nacl.box(
    Buffer.from(msg),
    nonce,
    ed2curve.convertPublicKey(pubKeyUInt8Array),
    ephemeralKeyPair.secretKey,
  );

  let ciphertext = Buffer.from(encryptedMessage).toString('hex');
  let ephemPubKey = Buffer.from(ephemeralKeyPair.publicKey).toString('hex');
  let newNonce = Buffer.from(nonce).toString('hex');
  let version = 'x25519-xsalsa20-poly1305';
  document.getElementsByName('encrypted')[0].value = `{"cipherText":"${ciphertext}","ephemPubKey":"${ephemPubKey}","nonce":"${newNonce}","version":"${version}"} `;
}

function Encryption() {
  return (
    <Grid container>
      <Grid item md={12} lg={6} className="upper-grid">
        <input
          className="fields"
          placeholder="Chave pública"
          id="password"
        />
        <br />
        <textarea
          placeholder="Texto a ser encriptado"
          className="textArea"
          id="message"
        />
        <br />
        <button
          type="button"
          className="button"
          onClick={() => encrypt(
            document.getElementById('message').value,
            document.getElementById('password').value)}
        >
          Encriptar
          </button>
      </Grid>
      <Grid item md={12} lg={6}>
        <div>
          <textarea 
            className="cipherText"
            placeholder="Texto cifrado"
            name="encrypted"
          />
        </div>
      </Grid>
    </Grid>
  );
}
export default Encryption;
