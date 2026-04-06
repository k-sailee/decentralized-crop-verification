const CropVerification = artifacts.require("CropVerification");

module.exports = function (deployer) {
  deployer.deploy(CropVerification);
};