pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract AIModelRegistry is Ownable {
    // Mapping of AI model IDs to metadata
    mapping (uint256 => AIModel) public aiModels;

    // Event emitted when a new AI model is registered
    event NewAIModel(uint256 indexed aiModelId, address indexed owner, string name, string description);

    // Event emitted when an AI model is updated
    event UpdateAIModel(uint256 indexed aiModelId, address indexed owner, string name, string description);

    // Event emitted when an AI model is transferred
    event TransferAIModel(uint256 indexed aiModelId, address indexed from, address indexed to);

    // Struct to represent an AI model
    struct AIModel {
        uint256 id;
        address owner;
        string name;
        string description;
        uint256 createdAt;
        uint256 updatedAt;
    }

    // Function to register a new AI model
    function registerAIModel(string memory _name, string memory _description) public {
        require(msg.sender != address(0), "Invalid address.");

        uint256 aiModelId = uint256(keccak256(abi.encodePacked(_name, _description)));
        aiModels[aiModelId] = AIModel(aiModelId, msg.sender, _name, _description, block.timestamp, block.timestamp);

        emit NewAIModel(aiModelId, msg.sender, _name, _description);
    }

    // Function to update an AI model
    function updateAIModel(uint256 _aiModelId, string memory _name, string memory _description) public {
        require(msg.sender != address(0), "Invalid address.");
        require(aiModels[_aiModelId].owner == msg.sender, "Only the owner can update the AI model.");

        aiModels[_aiModelId].name = _name;
        aiModels[_aiModelId].description = _description;
        aiModels[_aiModelId].updatedAt = block.timestamp;

        emit UpdateAIModel(_aiModelId, msg.sender, _name, _description);
    }

    // Function to transfer an AI model
    function transferAIModel(uint256 _aiModelId, address _to) public {
        require(msg.sender != address(0), "Invalid address.");
        require(aiModels[_aiModelId].owner == msg.sender, "Only the owner can transfer the AI model.");

        aiModels[_aiModelId].owner = _to;

        emit TransferAIModel(_aiModelId, msg.sender, _to);
    }
}
