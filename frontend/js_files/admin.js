//initialize Moralis on RRRinkeby
const serverUrl = "https://ujwb1som3llq.usemoralis.com:2053/server" 
const appId = "TPzse1a4T6YsxrbB5Em4weILu5cR0AUplKU43QsZ"
Moralis.start({ serverUrl, appId });

const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"BODList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidatesList","outputs":[{"internalType":"uint256","name":"candidateID","type":"uint256"},{"internalType":"bytes","name":"candidateName","type":"bytes"},{"internalType":"uint8","name":"votesReceived","type":"uint8"},{"internalType":"address","name":"registeredAddress","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"chairman","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_candidateName","type":"string"}],"name":"createCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"enum SimpleVoting.Role","name":"_role","type":"uint8"}],"name":"createStakeHolder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"isAStakeholder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"resultsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakeholders","outputs":[{"internalType":"enum SimpleVoting.Role","name":"role","type":"uint8"},{"internalType":"bool","name":"voted","type":"bool"},{"internalType":"uint256","name":"candidateChosen","type":"uint256"},{"internalType":"address","name":"registeredAddress","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakeholdersList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"studentList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"teachersList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"toBytes","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"toggleResult","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"toggleVoting","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_candidateID","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"votingActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]
const CHAIN = "rinkeby"
const CONTRACTADDRESS = "0xdcff7B8067082c89773759BC931F60c34030a3C2"

async function login() {
    let user = Moralis.User.current();
    if (!user) {
        await Moralis.enableWeb3();
        user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
            console.log("logged in user:", user);
            console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}


//DISPLAY THE CURRENT WALLET ADDRESS AT THE TOP
//DISPLAY THE CURRENT WALLET ADDRESS AT THE TOP
//DISPLAY THE CURRENT WALLET ADDRESS AT THE TOP
async function displayWalletAddress() {
    const walletAddress = document.getElementById("wallet-address")
    let user = Moralis.User.current();
    await Moralis.enableWeb3();
    walletAddress.innerText = user.get("ethAddress")
}

displayWalletAddress()

//TOGGLE THE STATUS BAR FOR VOTING STATUS
//TOGGLE THE STATUS BAR FOR VOTING STATUS
//TOGGLE THE STATUS BAR FOR VOTING STATUS
document.getElementById("btn-voting-open").onclick = votingOpen
document.getElementById("btn-voting-close").onclick = votingClose


async function votingOpen() {
    const votingActive = await toggleVoting()
    if (votingActive){
        displayVotingStatusActive()
    }
}

function displayVotingStatusActive(){
    document.getElementById("voting-status").style.backgroundColor = 'green';
    document.getElementById("votingStatusText").innerHTML = "Voting Active";
}

async function votingClose() {
    const votingActive = await toggleVoting()
    if (votingActive){
        displayVotingStatusInactive()
    }
}

function displayVotingStatusInactive(){
    document.getElementById("voting-status").style.backgroundColor = 'red';
    document.getElementById("votingStatusText").innerHTML = "Voting Inactive";
}

async function toggleVoting() {
    const options = {
        chain: CHAIN, 
        contractAddress: CONTRACTADDRESS, 
        functionName: "toggleVoting", 
        abi: ABI,
    };
    return await Moralis.executeFunction(options);
}


//TOGGLE THE STATUS BAR FOR RESULTS STATUS
//TOGGLE THE STATUS BAR FOR RESULTS STATUS
//TOGGLE THE STATUS BAR FOR RESULTS STATUS
document.getElementById("btn-result-open").onclick = resultOpen
document.getElementById("btn-result-close").onclick = resultClose


async function resultOpen() {
    const resultsActive = await toggleResult()
    if (resultsActive){
        displayResultsStatusActive()
    }
}

function displayResultsStatusActive(){
    document.getElementById("result-status").style.backgroundColor = 'green';
    document.getElementById("resultStatusText").innerHTML = "Result Active";
}

async function resultClose() {
    const resultsActive = await toggleResult()
    if (resultsActive){
        displayResultsStatusInactive()
    }
}

function displayResultsStatusInactive(){
    document.getElementById("result-status").style.backgroundColor = 'red';
    document.getElementById("resultStatusText").innerHTML = "Result Inactive";
}

async function toggleResult() {
    const options = {
        chain: CHAIN, 
        contractAddress: CONTRACTADDRESS, 
        functionName: "toggleResult", 
        abi: ABI,
    };
    return await Moralis.executeFunction(options);
}
