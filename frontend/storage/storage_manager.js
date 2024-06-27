// storage_manager.js
import { useState, useEffect } from 'react';
import * as ipfs from 'ipfs-http-client';
import * as filecoin from 'filecoin.js';

const StorageManager = () => {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState(null);
  const ipfsClient = ipfs('https://ipfs.infura.io:5001');
  const filecoinClient = new filecoin.FilecoinClient('https://filecoin.infura.io:5001');

  useEffect(() => {
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      setFile(file);
    };
  }, []);

  const handleUploadFile = async () => {
    if (file) {
      const added = await ipfsClient.add(file);
      const cid = added.cid.toString();
      setCid(cid);
      const deal = await filecoinClient.createDeal(cid, '0x...storageProviderAddress...');
      console.log(`Deal created: ${deal}`);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadFile}>Upload File</button>
      {cid ? (
        <p>File uploaded successfully! CID: {cid}</p>
      ) : (
        <p>No file uploaded yet.</p>
      )}
    </div>
  );
};

export default StorageManager;
