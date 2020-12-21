import React from 'react';
import { Grid } from '@material-ui/core';
import '../../style/Keys.css';

const nacl = require('tweetnacl');
const ed2curve = require('ed2curve');
nacl.util = require('tweetnacl-util');

export function decrypt(secretKey, msg) {
  const receiverSecretKeyUint8Array = ed2curve.convertSecretKey(Buffer.from(secretKey, 'hex'))
  var encryptedData = JSON.parse(msg);
  const nonce = Buffer.from(encryptedData.nonce.toString(), 'hex')
  const ciphertext = Buffer.from(encryptedData.cipherText.toString(), 'hex')
  const ephemPubKey = Buffer.from(encryptedData.ephemPubKey.toString(), 'hex')
  const decrypted = nacl.box.open(
    ciphertext,
    nonce,
    ephemPubKey,
    receiverSecretKeyUint8Array
  )
  const finalValue = decrypted ? nacl.util.encodeUTF8(decrypted) : decrypted;
  document.getElementsByName('finalText')[0].value = `${finalValue}`;
  return finalValue;
}


function Encryption() {
  return (
  <Grid container>
    <Grid item md={12} lg={6}className="upper-grid">
    <div>
      <textarea
            placeholder="Texto a ser decifrado"
            className="textArea"
            id="encrypted"
          />
    </div>
  </Grid>

  <Grid item md={12} lg={6} >
    <input
      className="secretKey"
      placeholder="Chave privada"
      id="secretKey"
    />
    <br />
    <textarea
      placeholder="Texto decifrado"
      className="cipherText"
      name="finalText"
    />
    <br />
    <button
      type="button"
      className="button"
      onClick={() => decrypt(
        document.getElementById('secretKey').value,
        document.getElementById('encrypted').value)}>
      Decriptar
      </button>
  </Grid>
</Grid>
  );
}

export default Encryption;
