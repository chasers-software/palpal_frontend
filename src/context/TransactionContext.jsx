import React, { useEffect, useState } from "react";

import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const palpalContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return palpalContract;
};

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [videosData, setVideosData] = useState([]);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      localStorage.setItem("loggedIn", JSON.stringify({ entry: true }));

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        const logged = JSON.parse(localStorage.getItem("loggedIn")).entry;
        logged && setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadVideoData = async (_videoHash, _thumbnailHash, _detailsHash) => {
    try {
      if (ethereum) {
        const palpalContract = createEthereumContract();
        const uploadTxn = await palpalContract.uploadContent(
          _videoHash,
          _thumbnailHash,
          _detailsHash
        );
        console.log("Mining...", uploadTxn.hash);
        await uploadTxn.wait();
        console.log("Mined --", uploadTxn.hash);
        console.log("Successfully uploaded");
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      window.alert("Upload Unsuccessful");
    }
  };

  const getAllVideos = async () => {
    try {
      if (ethereum) {
        const palpalContract = createEthereumContract();
        const totalVideosCount = await palpalContract.contentCount();
        const parsedCount = parseInt(totalVideosCount._hex, 16);
        console.log("Videos Count", parsedCount);
        const video = [];
        for (let i = 1; i <= parsedCount; i++) {
          const {
            creator,
            contentHash,
            thumbnailHash,
            detailsHash,
            likesCount,
            tipsCount,
            commentsCount,
          } = await palpalContract.contents(i);
          const commentCount = parseInt(commentsCount._hex, 16);
          const likeCount = parseInt(likesCount._hex, 16);
          const tipCount = parseInt(tipsCount._hex, 16);
          const detailsJSON = `'` + detailsHash + `'`;
          console.log(typeof detailsHash);
          //JSON.parse(detailsJSON);
          //console.log(JSON.parse(detailsJSON));
          console.log("our details ", JSON.parse(`'` + detailsHash + `'`));
          video.push({
            creator,
            contentHash,
            thumbnailHash,
            detailsHash,
            commentCount,
            tipCount,
            likeCount,
          });
        }

        setVideosData(video);
        console.log("videos data", video);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      window.alert("Unable to fetch videos");
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    window.location.reload();
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        logout,
        uploadVideoData,
        getAllVideos,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
