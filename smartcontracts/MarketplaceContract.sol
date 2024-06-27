pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/access/Ownable.sol";
import "./AIModelContract.sol";

contract MarketplaceContract is Ownable {
    // Mapping of AI model IDs to their listings
    mapping (uint256 => Listing) public aiModelListings;

    // Mapping of AI model IDs to their sales
    mapping (uint256 => Sale) public aiModelSales;

    // Event emitted when an AI model is listed
    event AIModelListed(uint256 indexed _aiModelId, uint256 _price, address indexed _seller);

    // Event emitted when an AI model is sold
    event AIModelSold(uint256 indexed _aiModelId, uint256 _price, address indexed _buyer, address indexed _seller);

    // Struct to represent a listing
    struct Listing {
        uint256 price;
address seller;
    }

    // Struct to represent a sale
    struct Sale {
        uint256 price;
        address buyer;
        address seller;
    }

    // Modifier to check if the caller is the owner of the AI model
    modifier onlyAIModelOwner(uint256 _aiModelId) {
        require(aiModelOwners[_aiModelId] == msg.sender, "Only the owner of the AI model can perform this action");
        _;
    }

    // Modifier to check if the caller is the seller of the AI model
    modifier onlyAIModelSeller(uint256 _aiModelId) {
        require(aiModelSellers[_aiModelId] == msg.sender, "Only the seller of the AI model can perform this action");
        _;
    }

    // Function to list an AI model for sale
    function listAIModelForSale(uint256 _aiModelId, uint256 _price) public onlyAIModelOwner(_aiModelId) {
        aiModelListings[_aiModelId] = Listing(_price, msg.sender);
        emit AIModelListed(_aiModelId, _price, msg.sender);
    }

    // Function to buy an AI model
    function buyAIModel(uint256 _aiModelId) public payable {
        require(aiModelListings[_aiModelId].seller == msg.sender, "The AI model is not listed for sale by the caller");
        require(msg.value == aiModelListings[_aiModelId].price, "The buyer must pay the listed price");

        // Transfer AI model ownership
        AIModelContract(aiModelOwners[_aiModelId]).transferAIModelOwnership(_aiModelId, msg.sender);

        // Record the sale
        aiModelSales[_aiModelId] = Sale(aiModelListings[_aiModelId].price, msg.sender, aiModelListings[_aiModelId].seller);

        // Transfer funds to the seller
        SafeERC20(msg.sender).transfer(address(this), msg.value);

        emit AIModelSold(_aiModelId, aiModelListings[_aiModelId].price, msg.sender, aiModelListings[_aiModelId].seller);
    }

    // Function to cancel an AI model listing
    function cancelAIModelListing(uint256 _aiModelId) public onlyAIModelSeller(_aiModelId) {
        delete aiModelListings[_aiModelId];
    }
}
