import React, { useState, useEffect } from "react";
import Web3 from "web3";
import HelloWorldContract from "./../../contracts/";

function App() {
  const [message, setMessage] = useState("Loading...");
  const [account, setAccount] = useState("");

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const networkData = HelloWorldContract.networks[networkId];

        if (networkData) {
          const contract = new web3.eth.Contract(
            HelloWorldContract.abi,
            networkData.address
          );

          const message = await contract.methods.message().call();
          setMessage(message);
        } else {
          alert("Smart contract not deployed to the detected network.");
        }
      } else {
        alert("Please install MetaMask!");
      }
    };

    loadBlockchainData();
  }, []);

  return (
    <div>
      <h1>Decentralized Hello World DApp</h1>
      <p>Connected Account: {account}</p>
      <h2>Message from Smart Contract: {message}</h2>
    </div>
  );
}

export default App;
