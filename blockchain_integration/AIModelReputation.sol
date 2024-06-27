// AIModelReputation.sol
pragma solidity ^0.8.0;

import "https://github.com/ipfs/ipfs-solidity/contracts/IPFS.sol";

contract AIModelReputation {
    // Mapping of AI model IDs to their respective reputations
    mapping (uint256 => Reputation) public aiModelReputations;

    // Struct to represent an AI model's reputation
    struct Reputation {
        uint256 rating;
        uint256 numRatings;
        bytes32[] ratings;
    }

    // Event emitted when an AI model's reputation is updated
    event AIModelReputationUpdated(uint256 aiModelId, uint256 rating);

    // Update an AI model's reputation based on user ratings
    function updateAIModelReputation(uint256 aiModelId, uint256 rating) public {
        // Get the current reputation of the AI model
        Reputation storage reputation = aiModelReputations[aiModelId];

        // Update the rating and number of ratings
        reputation.rating = (reputation.rating * reputation.numRatings + rating) / (reputation.numRatings + 1);
        reputation.numRatings++;

        // Store the rating on IPFS
        IPFS ipfs = IPFS("https://ipfs.infura.io");
        bytes32 ratingHash = ipfs.add(rating);

        // Add the rating hash to the AI model's reputation
        reputation.ratings.push(ratingHash);

        emit AIModelReputationUpdated(aiModelId, reputation.rating);
    }

    // Get an AI model's reputation
    function getAIModelReputation(uint256 aiModelId) public view returns (Reputation) {
        return aiModelReputations[aiModelId];
    }
}
