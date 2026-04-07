// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract CropQuality {

    struct Quality {
        string productId;
        string quality;
        address inspector;
    }

    mapping(string => Quality) public qualities;

    // Add quality for a product
    function addQuality(string memory _productId, string memory _quality) public {

        // Prevent duplicate entry
        require(bytes(qualities[_productId].productId).length == 0, "Already exists");

        qualities[_productId] = Quality(
            _productId,
            _quality,
            msg.sender
        );
    }

    // Get quality details
    function getQuality(string memory _productId) public view returns (Quality memory) {
        return qualities[_productId];
    }
}