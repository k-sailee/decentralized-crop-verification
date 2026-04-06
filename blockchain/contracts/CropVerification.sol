// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract CropVerification {

    // Structure to store crop data
    struct Crop {
        string productId;
        address farmer;
        string cropName;
        uint quantity;
        uint timestamp;
    }

    // Mapping to store crops using productId
    mapping(string => Crop) private crops;

    // Mapping to check if product already exists
    mapping(string => bool) private exists;

    // Function to add crop data
    function addCrop(string memory _productId, string memory _cropName, uint _quantity) public {

        // Prevent duplicate product IDs
        require(!exists[_productId], "Product ID already exists");

        // Store crop data
        crops[_productId] = Crop({
            productId: _productId,
            farmer: msg.sender,
            cropName: _cropName,
            quantity: _quantity,
            timestamp: block.timestamp
        });

        // Mark as existing
        exists[_productId] = true;
    }

    // Function to get crop data
    function getCrop(string memory _productId) public view returns (
        string memory,
        address,
        string memory,
        uint,
        uint
    ) {
        require(exists[_productId], "Product not found");

        Crop memory c = crops[_productId];

        return (
            c.productId,
            c.farmer,
            c.cropName,
            c.quantity,
            c.timestamp
        );
    }
}