import React, { useEffect, useState } from "react";

import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
import { toast } from "react-toastify";

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
  const [comments, setComments] = useState([]);
  const [tipsData, setTipsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMining, setIsMining] = useState(false);

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
        setIsMining(true);
        await uploadTxn.wait();
        setIsMining(false);
        console.log("Mined --", uploadTxn.hash);
        toast.success("Upload Successful! View your NFT in OpenSea");
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      setIsMining(false);
      console.log(error);
      toast.error("Upload Unsuccessful!");
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    }
  };

  const commentContent = async (videoId, _comment) => {
    try {
      if (ethereum) {
        const palpalContract = createEthereumContract();
        const commentTxn = await palpalContract.commentContent(
          videoId,
          _comment
        );
        setIsMining(true);
        console.log("Mining...", commentTxn.hash);
        await commentTxn.wait();
        console.log("Mined --", commentTxn.hash);
        setIsMining(false);
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      setIsMining(false);
      console.log(error);
      toast.error("Comment Unsuccessful!");
    }
  };

  const getComments = async (videoId) => {
    try {
      if (ethereum) {
        const palpalContract = createEthereumContract();
        const commentData = await palpalContract.getComments(videoId);
        setComments(commentData);
        console.log("Comments fetched", commentData);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      toast.error("Get Comment Unsuccessful!");
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
            id,
            creator,
            contentHash,
            thumbnailHash,
            detailsHash,
            likesCount,
            tipsCount,
            commentsCount,
          } = await palpalContract.contents(i);
          const contentId = parseInt(id._hex, 16);
          const commentCount = parseInt(commentsCount._hex, 16);
          const likeCount = parseInt(likesCount._hex, 16);
          const tipCount = parseInt(tipsCount._hex, 16);
          const detailsJSON = JSON.parse(detailsHash);
          const { title, description, uploadDate } = detailsJSON;
          video.push({
            contentId,
            creator,
            contentHash,
            thumbnailHash,
            title,
            description,
            uploadDate,
            commentCount,
            tipCount,
            likeCount,
          });
        }

        setVideosData(video);
        setLoading(false);
        console.log("videos data", video);
      } else {
        setLoading(false);
        console.log("No ethereum object");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Unable to fetch videos!");
    }
  };

  const getAllTippers = async (_id) => {
    try {
      if (ethereum) {
        const palpalContract = createEthereumContract();
        const Tips = await palpalContract.getTips(_id);
        console.log("All Tips", Tips);
        setTipsData(Tips);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch Tips!");
    }
  };

  const likeContent = async (_address) => {
    try {
      if (ethereum) {
        const palpalContract = createEthereumContract();
        const likeTxn = await palpalContract.likeContent(_address);
        setIsMining(true);
        console.log("Mining...", likeTxn.hash);
        await likeTxn.wait();
        console.log("Mined --", likeTxn.hash);
        setIsMining(false);
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      setIsMining(false);
      console.log(error);
      toast.error("Like Unsuccessful!");
    }
  };

  const giveATip = async (_id) => {
    try {
      if (ethereum) {
        const palpalContract = createEthereumContract();
        const tipTxn = await palpalContract.tipCreator(_id, {
          gasLimit: 300000,
          value: ethers.utils.parseEther("0.01"),
        });
        setIsMining(true);
        console.log("Mining...", tipTxn.hash);
        await tipTxn.wait();
        console.log("Mined --", tipTxn.hash);
        setIsMining(false);
        toast.success("Tip successful!");
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      setIsMining(false);
      console.log(error);
      toast.error("Tip Unsuccessful!");
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
        getAllTippers,
        uploadVideoData,
        getAllVideos,
        videosData,
        likeContent,
        commentContent,
        giveATip,
        getComments,
        comments,
        tipsData,
        loading,
        setLoading,
        isMining,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
