import React, { useEffect, useContext, useState } from "react";
import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import VideoInfo from "../components/VideoInfo";
import { Web3Storage } from "web3.storage";

import "./Videoplayer.css";

const Videoplayer = () => {
  const [file, getFile] = useState("");

  function getAccessToken() {
    // If you're just testing, you can paste in a token
    // and uncomment the following line:
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGYxNUYxNzFBMDcyOTY2OEI5OGU2YjU3NTA2NUYyNzNiNjQwN0IwOTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTk3MTYwMjcyMjUsIm5hbWUiOiJqdXN0In0.dM-xTV6s8bcBPCssiUwNE8FVU0xOjnQQnjzUz1khmFs";

    // In a real app, it's better to read an access token from an
    // environement variable or other configuration that's kept outside of
    // your code base. For this to work, you need to set the
    // WEB3STORAGE_TOKEN environment variable before you run your code.
  }

  function getFiles(event) {
    event.preventDefault();
    const fileInput = event.target;
    storeFiles(fileInput.files);
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  //   function makeFileObjects () {
  //     // You can create File objects from a Blob of binary data
  //     // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
  //     // Here we're just storing a JSON object, but you can store images,
  //     // audio, or whatever you want!
  //     const obj = { hello: 'world' }
  //     const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })

  //     const files = [
  //       new File(['contents-of-file-1'], 'plain-utf8.txt'),
  //       new File([blob], 'hello.json')
  //     ]
  //     return files
  //   }

  async function storeFiles(files) {
    const client = makeStorageClient();
    const cid = await client.put(files);
    console.log("stored files with cid:", cid);
    return cid;
  }

  //   const captureFile = async (event) => {
  //     event.preventDefault();
  //     console.log("file captured : ", event.target.files);

  //     const API_TOKEN =
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGYxNUYxNzFBMDcyOTY2OEI5OGU2YjU3NTA2NUYyNzNiNjQwN0IwOTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTk3MTQxNTM0MDIsIm5hbWUiOiJwYWxwYWwifQ.sYk9iFPmbpdU6aHe8yWCN2SPSA - hRMyCb2cI96lClis";

  //     // Construct with token and endpoint
  //     const client = new Web3Storage({ token: API_TOKEN });

  //     // Pack files into a CAR and send to web3.storage
  //     const rootCid = await client.put(event.target.files); // Promise<CIDString>

  //     // Get info on the Filecoin deals that the CID is stored in
  //     const info = await client.status(rootCid); // Promise<Status | undefined>

  //     // Fetch and verify files from web3.storage
  //     const res = await client.get(rootCid); // Promise<Web3Response | null>
  //     const files = await res.files(); // Promise<Web3File[]>
  //     for (const file of files) {
  //       console.log(`${file.cid} ${file.name} ${file.size}`);
  //     }
  //   };

  //   const fileUpload = async () => {
  //     const API_TOKEN =
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGYxNUYxNzFBMDcyOTY2OEI5OGU2YjU3NTA2NUYyNzNiNjQwN0IwOTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTk3MTQxNTM0MDIsIm5hbWUiOiJwYWxwYWwifQ.sYk9iFPmbpdU6aHe8yWCN2SPSA - hRMyCb2cI96lClis";

  //     // Construct with token and endpoint
  //     const client = new Web3Storage({ token: API_TOKEN });

  //     // Pack files into a CAR and send to web3.storage
  //     const rootCid = await client.put(fileInput.files); // Promise<CIDString>

  //     // Get info on the Filecoin deals that the CID is stored in
  //     const info = await client.status(rootCid); // Promise<Status | undefined>

  //     // Fetch and verify files from web3.storage
  //     const res = await client.get(rootCid); // Promise<Web3Response | null>
  //     const files = await res.files(); // Promise<Web3File[]>
  //     for (const file of files) {
  //       console.log(`${file.cid} ${file.name} ${file.size}`);
  //     }
  //   };
  return (
    <>
      <Header />
      <div className="singleVideo">
        <div>
          <iframe
            title="video-player"
            width="853"
            height="480"
            autoPlay
            src={`https://ipfs.io/ipfs/QmRbk54WHHAaTQKWRfgofreMww4sgxVgxosC6f7Z42Kh9Z`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <VideoInfo
          title={"Demo Video"}
          date={[2007, 0, 29]}
          likes={10}
          dislikes={0}
        />

        <input type="file" name="video" onChange={getFiles}></input>
      </div>
    </>
  );
};

export default Videoplayer;
