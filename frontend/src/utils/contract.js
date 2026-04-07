import { ethers } from "ethers";
import abi from "../abi.json";

const contractAddress = "0xa06Ce051ed9F69898CBA7d85049dA1A78A5FAeb2";

export const getContract = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask");
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