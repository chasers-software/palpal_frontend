import { Web3Storage } from "web3.storage";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGYxNUYxNzFBMDcyOTY2OEI5OGU2YjU3NTA2NUYyNzNiNjQwN0IwOTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTk3MTQxNTM0MDIsIm5hbWUiOiJwYWxwYWwifQ.sYk9iFPmbpdU6aHe8yWCN2SPSA - hRMyCb2cI96lClis";

// Construct with token and endpoint
const client = new Web3Storage({ token: API_TOKEN });

const fileInput = document.querySelector('input[type="file"]');

// Pack files into a CAR and send to web3.storage
const rootCid = await client.put(fileInput.files); // Promise<CIDString>

// Get info on the Filecoin deals that the CID is stored in
const info = await client.status(rootCid); // Promise<Status | undefined>

// Fetch and verify files from web3.storage
const res = await client.get(rootCid); // Promise<Web3Response | null>
const files = await res.files(); // Promise<Web3File[]>
for (const file of files) {
  console.log(`${file.cid} ${file.name} ${file.size}`);
}
