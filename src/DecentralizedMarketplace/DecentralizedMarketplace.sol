// DecentralizedMarketplace.sol
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/SafeERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/drafts/Counters.sol";

contract DecentralizedMarketplace {
    address private owner;
    mapping (address => mapping (uint256 => ERC721Token)) public listings;
    mapping (address => uint256) public balances;
    Counters.Counter public listingCount;

    constructor() public {
        owner = msg.sender;
    }

    function createListing(uint256 _tokenId, ERC721Token _token) public {
        require(msg.sender == owner, "Only the owner can create listings");
        listings[msg.sender][_tokenId] = _token;
        listingCount.increment();
    }

    function purchaseListing(uint256 _tokenId) public payable {
        require(listings[msg.sender][_tokenId]!= 0, "Listing does not exist");
        ERC721Token token = listings[msg.sender][_tokenId];
        balances[msg.sender] -= token.price;
        token.transfer(msg.sender, _tokenId);
    }

    function withdrawBalance() public {
        require(balances[msg.sender] > 0, "No balance to withdraw");
        msg.sender.transfer(balances[msg.sender]);
    }

    function getListingCount() public view returns (uint256) {
        return listingCount.current();
    }
}
