import { ethers } from "ethers";
import abi from "../qualityAbi.json";

const contractAddress = "0x022A81CdE7D25Ba657c204d5e76087B0659aC4d2";

export const getQualityContract = async () => {
  if (!window.ethereum) {
    alert("Install MetaMask");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    contractAddress,
    abi.abi,
    signer
  );

  return contract;
};