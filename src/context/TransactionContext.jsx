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
  const [loggedIn, setLoggedIn] = useState(false);
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

      setLoggedIn(true);

      localStorage.setItem("loggedIn", JSON.stringify({ entry: true }));

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {
    localStorage.removeItem("loggedIn");
    document.location.href = "/";
    setLoggedIn(false);
  };

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        logout,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
