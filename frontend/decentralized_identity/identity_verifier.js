// identity_verifier.js
import { useState, useEffect } from 'react';
import { uPort } from 'uport-credentials';

const IdentityVerifier = () => {
  const [did, setDid] = useState(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const uport = new uPort();
    const requestCredentials = async () => {
      const credentials = await uport.requestCredentials();
      const did = credentials.did;
      setDid(did);
    };
    requestCredentials();
  }, []);

  const handleVerify = async () => {
    if (did) {
      const verification = await uport.verify(did);
      setVerified(verification);
    }
  };

  return (
    <div>
      {verified ? (
        <p>Identity verified successfully!</p>
      ) : (
        <button onClick={handleVerify}>Verify Identity</button>
      )}
    </div>
  );
};

export default IdentityVerifier;
