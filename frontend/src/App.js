import React, { useState } from "react";
import { getContract } from "./utils/contract";
import { getQualityContract } from "./utils/qualityContract";
import "./App.css";
function App() {
  const [account, setAccount] = useState("");
  const [productId, setProductId] = useState("");
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");

  const [verifyId, setVerifyId] = useState("");
  const [result, setResult] = useState("");

  const [qualityId, setQualityId] = useState("");
  const [quality, setQuality] = useState("");
  const [qualityResult, setQualityResult] = useState("");

  // Connect wallet
  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  };

  // Add crop
  const addCrop = async () => {
    try {
      const contract = await getContract();

      const tx = await contract.addCrop(
        productId,
        cropName,
        parseInt(quantity)
      );

      await tx.wait();

      alert("Crop added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding crop");
    }
  };

  // Verify crop
  const handleVerify = async () => {
    try {
      const contract = await getContract();
      const data = await contract.getCrop(verifyId);

      if (!data[0]) {
        setResult("Not Found ❌");
      } else {
        setResult(
          `Product ID: ${data[0]}
Crop Name: ${data[2]}
Quantity: ${data[3]}
Farmer: ${data[1]}`
        );
      }
    } catch (error) {
      console.error(error);
      setResult("Error fetching data");
    }
  };

  // Add Quality
  const addQuality = async () => {
    try {
      const contract = await getQualityContract();

      const tx = await contract.addQuality(qualityId, quality);
      await tx.wait();

      alert("Quality added!");
    } catch (error) {
      console.error(error);
      alert("Error adding quality");
    }
  };

  // Get Quality (MISSING FUNCTION FIXED)
  const getQuality = async () => {
    try {
      const contract = await getQualityContract();
      const data = await contract.getQuality(qualityId);

      setQualityResult(
        `Product ID: ${data[0]}
Quality: ${data[1]}
Inspector: ${data[2]}`
      );
    } catch (error) {
      console.error(error);
      setQualityResult("Error fetching quality");
    }
  };

return (
  <div className="container">
    <h1>Crop Verification System</h1>

    <div className="card">
      <button onClick={connectWallet}>Connect Wallet</button>
      <p>Connected Account: {account}</p>
    </div>

    <div className="card">
      <h2>Add Crop</h2>

      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />

      <input
        type="text"
        placeholder="Crop Name"
        value={cropName}
        onChange={(e) => setCropName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button onClick={addCrop}>Add Crop</button>
    </div>

    <div className="card">
      <h2>Verify Product</h2>

      <input
        type="text"
        placeholder="Enter Product ID"
        value={verifyId}
        onChange={(e) => setVerifyId(e.target.value)}
      />

      <button onClick={handleVerify}>Verify</button>

      <pre>{result}</pre>
    </div>

    <div className="card">
      <h2>Crop Quality</h2>

      <input
        type="text"
        placeholder="Product ID"
        value={qualityId}
        onChange={(e) => setQualityId(e.target.value)}
      />

      <input
        type="text"
        placeholder="Quality"
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
      />

      <button onClick={addQuality}>Add Quality</button>
      <button onClick={getQuality}>Get Quality</button>

      <pre>{qualityResult}</pre>
    </div>
  </div>
);
}

export default App;