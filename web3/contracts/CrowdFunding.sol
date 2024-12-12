// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract CrowdFunding {
    using EnumerableSet for EnumerableSet.AddressSet;

    string public name;

    struct Campaign {
        uint256 id;
        string name;
        string description;
        address owner;
        uint256 endDate;
        bool exists;
        uint256 target;
        uint256 amountCollected;
        string image;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    mapping(uint256 => mapping(address => uint256)) public contributions;
    mapping(uint256 => EnumerableSet.AddressSet) private contributors;

    event CampaignCreated(
        uint256 id,
        string name,
        string description,
        address owner,
        uint256 endDate,
        bool exists,
        uint256 amountCollected,
        uint256 target
    );

    event CampaignFunded(
        uint256 id,
        address owner,
        address donator,
        uint256 amount
    );

    event CampaignEnded(uint256 id, string name, uint256 amountCollected);

    // constructor() {
    //     name = "CrowdFunding";
    // }

    modifier OnlyOwner(uint256 id) {
        require(
            msg.sender == campaigns[id].owner,
            "Only owner can close this project"
        );
        _;
    }

    modifier CampaignExists(uint256 id) {
        require(campaigns[id].exists == true, "Project does not exist");
        _;
    }

    function createCampaign(
        string memory _name,
        string memory _description,
        uint256 _target,
        uint256 _endDate,
        string memory _image
    ) public {
        require(bytes(_name).length > 0, "Name is required");
        require(_target > 0, "Target must be greater than 0");
        require(
            _endDate > block.timestamp,
            "The deadline should be a date in the future."
        );

        numberOfCampaigns++;

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = msg.sender;
        campaign.name = _name;
        campaign.description = _description;
        campaign.target = _target;
        campaign.endDate = _endDate;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.exists = true;

        emit CampaignCreated(
            numberOfCampaigns,
            _name,
            _description,
            msg.sender,
            _endDate,
            true,
            0,
            _target
        );
    }

    function donateToCampaign(uint256 _id) public payable CampaignExists(_id) {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];

        require(block.timestamp < campaign.endDate, "Project is closed.");
        require(
            campaign.owner != msg.sender,
            "Owner can't fund the project created by themselves."
        );
        require(amount > 0, "Funding amount must be greater than 0.");

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");
        require(sent, "Failed to send Ether.");

        campaign.amountCollected += amount;
        contributions[_id][msg.sender] += amount;

        if (!contributors[_id].contains(msg.sender)) {
            contributors[_id].add(msg.sender);
        }

        emit CampaignFunded(_id, campaign.owner, msg.sender, amount);
    }

    function closeCampaigns(
        uint256 _id
    ) public OnlyOwner(_id) CampaignExists(_id) {
        Campaign storage campaign = campaigns[_id];
        campaign.exists = false;
        payable(campaign.owner).transfer(campaign.amountCollected);
        emit CampaignEnded(
            campaign.id,
            campaign.name,
            campaign.amountCollected
        );
    }

    function getContributorsCount(uint256 _id) public view returns (uint256) {
        return contributors[_id].length();
    }

    function getContributor(
        uint256 _id,
        uint256 index
    ) public view returns (address) {
        return contributors[_id].at(index);
    }

    function getContribution(
        uint256 _id,
        address contributor
    ) public view returns (uint256) {
        return contributions[_id][contributor];
    }

    function getAllContributors(
        uint256 _id
    ) public view returns (address[] memory) {
        uint256 contributorsCount = contributors[_id].length();
        address[] memory contributorList = new address[](contributorsCount);

        for (uint256 i = 0; i < contributorsCount; i++) {
            contributorList[i] = contributors[_id].at(i);
        }

        return contributorList;
    }

    function balanceOfCampaigns() public view returns (uint256) {
        return address(this).balance;
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }

        return allCampaigns;
    }
}
