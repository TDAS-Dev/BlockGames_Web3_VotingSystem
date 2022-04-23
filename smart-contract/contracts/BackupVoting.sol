// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
/** 
 * @title Voting
 * @dev Implements voting process along with vote delegation
 */
contract Voting {

    //store whether an account has a role or not
    //role => account => bool
    mapping(bytes32 => mapping(address => bool)) public roles;

    mapping(bytes32 => address[]) public students;

    mapping(bytes32 => address[]) public teachers;

    mapping(bytes32 => address[]) public BODS;

    address[] public studentsList;

    address[] public BodList;

    address[] public teachersList;

    uint[] public results;

    bool public votingStatus;

    bool public publicResultStatus;

    
     //we put index on these parameters so we can quickly filter through the logs
    event GrantRole(bytes32 indexed role, address indexed account);
    event RevokeRole(bytes32 indexed role, address indexed account);

    ///ROLES
    bytes32 private constant CHAIRMAN = keccak256(abi.encodePacked("CHAIRMAN"));

    bytes32 private constant BOD = keccak256(abi.encodePacked("BOD"));

    bytes32 private constant TEACHER = keccak256(abi.encodePacked("TEACHER"));

    bytes32 private constant STUDENT = keccak256(abi.encodePacked("STUDENT"));
   
    struct Voter {
        //uint weight; // weight is accumulated by delegation, this is how many votes a person has, inluding the number that has been delegated to him, everybody has one weight by default
        bool voted;  // if true, that person already voted
        //address delegate; // person delegated to
        uint vote;   // index of the voted proposal
    }

    struct Candidate {
        // If you can limit the length to a certain number of bytes, 
        // always use one of bytes1 to bytes32 because they are much cheaper
        bytes32 name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }

    address public chairman;

    mapping(address => Voter) public voters;

    Candidate[] public candidates;

    modifier onlyChairmanRole(bytes32 _role) {
        require(roles[_role][msg.sender], "not authorized");
        _;
    }

    modifier specialRole(bytes32 _role, bytes32 _otherRole) {
        // if(_role == BOD || _role == TEACHER) {
        //     return true;
        // }
        (bool isSpecial) = isSpecialRole(_role, _otherRole);
        require(isSpecial, "not authorized");
        _;
    }

    // modifier teacherRole(bytes32 _role) {
    //     require(_role == TEACHER, "you are not a board of director");
    //     _;
    // }

    modifier bodRole(bytes32 _role) {
        require(_role == BOD, "not authorized");
        _;
    }

    modifier studentRole(bytes32 _role) {
        require(_role == STUDENT, "you are not a student");
        _;
    }

    function isSpecialRole(bytes32 _role, bytes32 _otherRole) internal pure returns(bool){
        if(_role == CHAIRMAN && _otherRole == TEACHER) {
            return true;
        }else{
            return false;
        }
    }

    

    /** 
     * @dev Create a new ballot to choose one of 'proposalNames'.
     * @param candidateNames names of proposals
     */

     //we created the internal function _grantRole so that we can 
    //grant role to msg.sender, the deployer of this contract

    //we'll grant admin role to the deployer of the contract
    constructor(bytes32[] memory candidateNames) {
        _grantRole(CHAIRMAN, msg.sender);
        chairman = msg.sender;
        votingStatus = true;
        publicResultStatus = false;
        //voters[chairman].weight = 1;
        //voters[voter].weight = 1;

        for (uint i = 0; i < candidateNames.length; i++) {
            // 'Proposal({...})' creates a temporary
            // Proposal object and 'proposals.push(...)'
            // appends it to the end of 'proposals'.
            candidates.push(Candidate({
                name: candidateNames[i],
                voteCount: 0
            }));
        }
    }
    
  
    function assignRoles(address[] memory _accounts, bytes32 _role) external onlyChairmanRole(CHAIRMAN) {
        if(_role == BOD)
        {
            for(uint i = 0; i < _accounts.length; i++)
            {
            roles[_role][_accounts[i]] = true;
            BodList.push(_accounts[i]);
            }
        }

        if(_role == STUDENT)
        {
            for(uint i = 0; i < _accounts.length; i++)
            {
            roles[_role][_accounts[i]] = true;
            studentsList.push(_accounts[i]);
            }
        }

        if(_role == TEACHER)
        {
            for(uint i = 0; i < _accounts.length; i++)
            {
            roles[_role][_accounts[i]] = true;
            teachersList.push(_accounts[i]);
            }
        }
    }

    function revokeRoles() public {
        for(uint i = 0; i < BodList.length; i++) {
            roles[TEACHER][BodList[i]] = false;
        }

        for(uint i = 0; i < studentsList.length; i++) {
            roles[STUDENT][studentsList[i]] = false;
        }

        for(uint i = 0; i < teachersList.length; i++) {
            roles[TEACHER][teachersList[i]] = false;
        }
    }

    /**
     * @dev Give your vote (including votes delegated to you) to proposal 'proposals[proposal].name'.
     * @param _candidate index of candidate in the proposals array
     */
    function vote(uint _candidate) public specialRole(CHAIRMAN, TEACHER) bodRole(BOD) studentRole(STUDENT){
        Voter storage sender = voters[msg.sender];
        //require(sender.weight != 0, "Has no right to vote");
        require(votingStatus, "Voting not enabled");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = _candidate;

        // If 'proposal' is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        candidates[_candidate].voteCount += 1;
    }

    /** 
     * @dev Computes the winning proposal taking all previous votes into account.
     * @return winningCandidate_ index of winning proposal in the proposals array
     */
    function winningProposal() public view
            returns (uint winningCandidate_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < candidates.length; p++) {
            if (candidates[p].voteCount > winningVoteCount) {
                winningVoteCount = candidates[p].voteCount;
                winningCandidate_ = p;
            }
        }
    }

    /** 
     * @dev Calls winningProposal() function to get the index of the winner contained in the proposals array and then
     * @return winnerName_ the name of the winner
     */
    function winnerName() public view
            returns (bytes32 winnerName_)
    {
        winnerName_ = candidates[winningProposal()].name;
    }

    function compileResults() public onlyChairmanRole(CHAIRMAN) returns(uint[] memory) {
        for(uint i = 0; i < candidates.length; i++) {
        results.push(candidates[i].voteCount);
        }
        return results;
    }

    function toggleVoting() public onlyChairmanRole(CHAIRMAN) returns (bool) {

         if (votingStatus) {
            votingStatus = false;
            return votingStatus;
        } else {
            votingStatus = true;
            return votingStatus;
        }
    }


      function setPublicResultStatus() public specialRole(CHAIRMAN, TEACHER) bodRole(BOD)returns (bool) {

         if (publicResultStatus) {
            publicResultStatus = false;
            return publicResultStatus;
        } else {
            publicResultStatus = true;
            return publicResultStatus;
        }
    }

    function toggleResultsStatus() public view specialRole(CHAIRMAN, TEACHER) bodRole(BOD) returns (uint[] memory) {

         if (!publicResultStatus)
         {
            return  restrictedViewResults();
        } else 
        {
            return publicViewResults();
        }
    }

    function publicViewResults() public view specialRole(CHAIRMAN, TEACHER) bodRole(BOD) studentRole(STUDENT) returns(uint[] memory) {
        return results;
    }

    function restrictedViewResults() public view specialRole(CHAIRMAN, TEACHER) bodRole(BOD) returns(uint[] memory) {
        return results;
    }

     function _grantRole(bytes32 _role, address _account) internal {
        roles[_role][_account] = true; //this code here means that for this role, to this account, set it to true
        //in other words, grant roles to this account

        //emit GrantRole(_role, _account);
    }

    function grantRole(bytes32 _role, address _account) external onlyChairmanRole(CHAIRMAN) {
        _grantRole(_role, _account);
    }

   
    // function hash(string memory text, uint num, address addr) external pure returns(bytes32) {
    //     return keccak256(abi.encodePacked(text, num, addr));
    // }
    

    // function encode(string memory _string1, uint _uint, string memory _string2) public pure returns (bytes memory) {
    //     return (abi.encode(_string1, _uint, _string2));
    // }
    // function decode(bytes memory data) public pure returns (string memory _str1, uint _number, string memory _str2) {
    //     (_str1, _number, _str2) = abi.decode(data, (string, uint, string));            
    // }

    /*
    How to sign and verify messages

    #Signing
    1. create message to sign
    2. Hash the message
    3. Sign the hash (off chain, keep your private key secret)
    
    
    #Verify
    1. Recreate hash from  the original message
    2. Recover signer from signature and hash
    3. Compare recovered signer to claimed signer

    */

    //function that hashes the inputs passed in together
    function getMessageHash(address _to, uint _amount, string memory _message, uint _nonce) 
    public
    pure
    returns(bytes32)
    {
        return keccak256(abi.encodePacked(_to, _amount, _message, _nonce));
    }

    /**
    when we sign a message hash, it's actually not the message hash itself that is being signed,
    what is signed is this format below

    Signature is produced by signing a keccak256 hash with the following format:
    "\x19Ethereum Signed Message\n" + len(msg) + msg
    
    keccak256(
    \x19Ethereum Signed Message\n32, ...message hash goes here...
    )
     */

    //messageHash - hash of the message to be signed
    //function that recreates the hash that is actually being signed
    function getEthSignedMessageHash(bytes32 _messageHash)
    public
    pure
    returns(bytes32) {
        return keccak256(abi.encodePacked("x19Ethereum Signed Message\n32", _messageHash));
    } 

    //to actually sign a message will be shown later

    // signer - address that claims to be the signer of the message
    // _to, _amount, _message, _nonce - parameters that were used to create the message hash
    // _signature - the signature itself

    //function to verify our signature given a message hash
    function verify(
        address _signer, 
        address _to, uint _amount, string memory _message, uint _nonce,
        bytes memory _signature        
    )
        public pure returns (bool) 
    {
        bytes32 messageHash = getMessageHash(_to, _amount, _message, _nonce);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

        return recoverSigner(ethSignedMessageHash, _signature) == _signer;
    }

    function recoverSigner(
        bytes32 _ethSignedMessageHash, bytes memory _signature
    ) public pure returns (address) {
        //to recover the signer, we first need to split the signature into three parameters r, s ,v
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
    
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(bytes memory _sig) 
        public pure returns (bytes32 r, bytes32 s, uint8 v) 
    {
        require(_sig.length == 65, "invalid signature length");

        assembly {
            //we skip the first 32 bytes because dynamic arrays store the length of the array in the first 32
            //bytes, so the signature itself starts after skipping the first 32 bytes
            r := mload(add(_sig, 32)) //this line of code will skip the first 32 bytes and then load the next 32 bytes and then assign it to the variable r
            s := mload(add(_sig, 64)) //this line of code will skip the first 64 bytes, the first 32 that stores _sig, and the next 32 that stores r and and so the value for s starts after skipping the first 64 bytes
            v := byte(0, mload(add(_sig, 96))) //to get the value v, we need to skip the first 96 bytes and then get the first byte after it
            // add(x, y) --> x + y
            // add(_sig, 32) --> ?
            // add(_sig, 32) --> skips first 32 bytes
            // mload(p) loads next 32 bytes starting at the memory address p

            //we're not going to be adding 32 to the actual signature, signature is a dynamic datatype
            //what's being stored in the variable _sig is a pointer to where the actual signature is stored
            //in other words, it is the starting point of the signature being stored in memory and when you add 32
            //you move the starting position by 32 bytes effectively skipping the first 32 bytes
            //we skip the first 32 bytes because dynamic arrays store the length of the array in the first 32
            //bytes, so the signature itself starts after skipping the first 32 bytes
        }
    }

}


