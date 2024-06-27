// AIModelOwnership.sol
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/SafeERC721.sol";

contract AIModelOwnership {
    // Mapping of AI model IDs to their respective owners
    mapping (uint256 => address) public aiModelOwners;

    // Mapping of AI model IDs to their respective licenses
    mapping (uint256 => License) public aiModelLicenses;

    // Event emitted when an AI model is created
    event AIModelCreated(uint256 aiModelId, address owner);

    // Event emitted when an AI model is licensed
    event AIModelLicensed(uint256 aiModelId, address licensee, License license);

    // Struct to represent an AI model license
    struct License {
        address licensee;
        uint256 expirationDate;
        uint256 royaltyRate;
    }

    // Function to create a new AI model
    function createAIModel(uint256 aiModelId, address owner) public {
        aiModelOwners[aiModelId] = owner;
        emit AIModelCreated(aiModelId, owner);
    }

    // Function to license an AI model
    function licenseAIModel(uint256 aiModelId, address licensee, License license) public {
        require(aiModelOwners[aiModelId] == msg.sender, "Only the owner can license the AI model");
        aiModelLicenses[aiModelId] = license;
        emit AIModelLicensed(aiModelId, licensee, license);
    }

    // Function to get the owner of an AI model
    function getAIModelOwner(uint256 aiModelId) public view returns (address) {
        return aiModelOwners[aiModelId];
    }

    // Function to get the license of an AI model
    function getAIModelLicense(uint256 aiModelId) public view returns (License) {
        return aiModelLicenses[aiModelId];
    }
}
