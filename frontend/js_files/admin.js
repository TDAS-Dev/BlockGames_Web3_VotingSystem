//initialize Moralis on RRRinkeby
const serverUrl = "https://mrhyy1if02wl.usemoralis.com:2053/server";
const appId = "AuH19PpSEOGZ1g2U08nV6tnNvgTkDMzaS8VqvjyI";
Moralis.start({ serverUrl, appId });

const ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "BODList",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "candidatesList",
    outputs: [
      { internalType: "uint256", name: "candidateID", type: "uint256" },
      { internalType: "string", name: "candidateName", type: "string" },
      { internalType: "address", name: "registeredAddress", type: "address" },
      { internalType: "uint8", name: "totalVotesReceived", type: "uint8" },
      { internalType: "uint8", name: "votesReceivedBOD", type: "uint8" },
      { internalType: "uint8", name: "votesReceivedTeachers", type: "uint8" },
      { internalType: "uint8", name: "votesReceivedStudents", type: "uint8" },
      { internalType: "bool", name: "receivedChairmansVote", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "chairman",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_candidateName", type: "string" },
    ],
    name: "createCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "_addressArray", type: "address[]" },
      { internalType: "uint256", name: "_role", type: "uint256" },
    ],
    name: "createMultipleStakeHolders",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_address", type: "address" },
      { internalType: "uint256", name: "_role", type: "uint256" },
    ],
    name: "createStakeHolder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getListOfBOD",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getListOfCandidates",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "candidateID", type: "uint256" },
          { internalType: "string", name: "candidateName", type: "string" },
          {
            internalType: "address",
            name: "registeredAddress",
            type: "address",
          },
          { internalType: "uint8", name: "totalVotesReceived", type: "uint8" },
          { internalType: "uint8", name: "votesReceivedBOD", type: "uint8" },
          {
            internalType: "uint8",
            name: "votesReceivedTeachers",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "votesReceivedStudents",
            type: "uint8",
          },
          { internalType: "bool", name: "receivedChairmansVote", type: "bool" },
        ],
        internalType: "struct SimpleVoting.Candidate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getListOfStakeHolders",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getListOfStudents",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getListOfTeachers",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "isAStakeholder",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "resultsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakeholders",
    outputs: [
      { internalType: "enum SimpleVoting.Role", name: "role", type: "uint8" },
      { internalType: "bool", name: "hasVoted", type: "bool" },
      { internalType: "uint256", name: "candidateChosen", type: "uint256" },
      { internalType: "address", name: "registeredAddress", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "stakeholdersList",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "studentList",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "teachersList",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_name", type: "string" }],
    name: "toBytes",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "toggleResult",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "toggleVoting",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_candidateID", type: "uint256" },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "votingActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];
const CHAIN = "rinkeby";
const CONTRACTADDRESS = "0xd39f7640739b1AF36d223709C5442e4944595ea1";
// const CONTRACTADDRESS = "0x251e18258E3FcDF32767AFe05b5398D0e51fA6E9";

async function login() {
  let user = Moralis.User.current();
  if (!user) {
    await Moralis.enableWeb3();
    user = await Moralis.authenticate({
      signingMessage: "Log in using Moralis",
    })
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

//TOGGLE THE STATUS BAR FOR VOTING STATUS
//TOGGLE THE STATUS BAR FOR VOTING STATUS
//TOGGLE THE STATUS BAR FOR VOTING STATUS
document.getElementById("btn-voting-open").onclick = votingOpen;
document.getElementById("btn-voting-close").onclick = votingClose;

async function votingOpen(e) {
  e.preventDefault();
  await Moralis.authenticate({ signingMessage: "Log in using Moralis" });
  const votingActive = await toggleVoting();
  if (votingActive) {
    displayVotingStatusActive();
    setState("votingStatus", true);
  }
}

function displayVotingStatusActive() {
  document.getElementById("voting-status").style.backgroundColor = "green";
  document.getElementById("votingStatusText").innerHTML = "Voting Active";
  document.getElementById("modal").classList.replace("hidden", "grid");
  document.getElementById("modal-title").innerHTML = "Voting is active";
  document.getElementById("modal-body").innerHTML = "Voting is now active";
}

if (getStateData("votingStatus")) {
  document.getElementById("voting-status").style.backgroundColor = "green";
  document.getElementById("votingStatusText").innerHTML = "Voting Active";
}

async function votingClose(e) {
  e.preventDefault();
  await Moralis.enableWeb3();
  const votingActive = await toggleVoting();
  if (votingActive) {
    displayVotingStatusInactive();
    setState("votingStatus", false);
  }
}

function displayVotingStatusInactive() {
  document.getElementById("voting-status").style.backgroundColor = "red";
  document.getElementById("votingStatusText").innerHTML = "Voting Inactive";
  document.getElementById("modal").classList.replace("hidden", "grid");
  document.getElementById("modal-title").innerHTML = "Voting is disabled";
  document.getElementById("modal-body").innerHTML = "Voting is NOT active";
}

if (!getStateData("votingStatus")) {
  document.getElementById("voting-status").style.backgroundColor = "red";
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
document.getElementById("btn-result-open").onclick = resultOpen;
document.getElementById("btn-result-close").onclick = resultClose;

async function resultOpen(e) {
  e.preventDefault();
  await Moralis.enableWeb3();
  const resultsActive = await toggleResult();
  if (resultsActive) {
    displayResultsStatusActive();
    setState("resultStatus", true);
  }
}

function displayResultsStatusActive() {
  document.getElementById("result-status").style.backgroundColor = "green";
  document.getElementById("resultStatusText").innerHTML = "Result Active";
  document.getElementById("modal").classList.replace("hidden", "grid");
  document.getElementById("modal-title").innerHTML = "Result is active";
  document.getElementById("modal-body").innerHTML =
    "Students can now view result of voting";
}

if (getStateData("resultStatus")) {
  document.getElementById("result-status").style.backgroundColor = "green";
  document.getElementById("resultStatusText").innerHTML = "Result Active";
}

async function resultClose(e) {
  e.preventDefault();
  await Moralis.enableWeb3();
  const resultsActive = await toggleResult();
  if (resultsActive) {
    displayResultsStatusInactive();
    setState("resultStatus", false);
  }
}

function displayResultsStatusInactive() {
  document.getElementById("result-status").style.backgroundColor = "red";
  document.getElementById("resultStatusText").innerHTML = "Result Inactive";
  document.getElementById("modal").classList.replace("hidden", "grid");
  document.getElementById("modal-title").innerHTML = "Result is disabled";
  document.getElementById("modal-body").innerHTML =
    "Students cannot view results anymore";
}

if (!getStateData("resultStatus")) {
  document.getElementById("result-status").style.backgroundColor = "red";
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

//CREATE A CANDIDATE
//CREATE A CANDIDATE
//CREATE A CANDIDATE
// document.getElementById("btn-addCandidate").onclick = addCandidate;
document
  .getElementById("btn-addCandidate")
  .addEventListener("click", addCandidate);
async function addCandidate(e) {
  e.preventDefault();
  const name = document.getElementById("input-firstname").value;
  await Moralis.authenticate({ signingMessage: "Log in using Moralis" });
  await createCandidate(name);
  document.getElementById("modal").classList.replace("hidden", "grid");
  document.getElementById("modal-header").innerHTML = "Successful";
  document.getElementById("modal-body").innerHTML =
    "The candidate was successfully added";
  document.getElementById("form-addCandidates").reset();
  // setTimeout(updateStatusBar, 10000); //update status bar with candidate number
}

async function createCandidate(_name) {
  const options = {
    chain: CHAIN,
    contractAddress: CONTRACTADDRESS,
    functionName: "createCandidate",
    abi: ABI,
    params: {
      _candidateName: _name,
    },
  };
  return await Moralis.executeFunction(options);
}

//STATE MANAGEMENT FUNCTIONS
//STATE MANAGEMENT FUNCTIONS
//STATE MANAGEMENT FUNCTIONS

// implementation for keeping state
function setState(key, params) {
  localStorage.setItem(key, JSON.stringify(params)); //setState
  console.log("setState", key, params); //setState
}

function getStateData(params) {
  let getData = localStorage.getItem(params);
  return JSON.parse(getData);
}

//DISPLAY MODAL CLOSING MODAL ON SCREEN
//DISPLAY MODAL CLOSING MODAL ON SCREEN
//DISPLAY MODAL CLOSING MODAL ON SCREEN

document.getElementById("close").onclick = function () {
  document.getElementById("modal").classList.replace("grid", "hidden");
};
document.getElementById("closeBtn").onclick = function () {
  document.getElementById("modal").classList.replace("grid", "hidden");
};

//DISPLAY ADDRES STATE EVEN ON RELOAD
//DISPLAY ADDRES STATE EVEN ON RELOAD
//DISPLAY ADDRES STATE EVEN ON RELOAD
//@abiola
if (getStateData("account")) {
  document.getElementById("wallet-address").innerHTML = getStateData("account");
}

//DISPLAY AND UPDATE STATUS BAR
//DISPLAY AND UPDATE STATUS BAR
//DISPLAY AND UPDATE STATUS BAR

updateStatusBar();

async function updateStatusBar() {
  const candidatesArray = await getListOfCandidates();
  const BODArray = await getListOfBOD();
  const teachersArray = await getListOfTeachers();
  const studentsArray = await getListOfStudents();

  // console.log(candidatesArray.length);
  document.getElementById(
    "candidateCount"
  ).innerHTML = `Candidate: ${candidatesArray.length}`;
  document.getElementById(
    "BODCount"
  ).innerHTML = `Board of directors: ${BODArray.length}`;
  document.getElementById(
    "studentCount"
  ).innerHTML = `Students: ${studentsArray.length}`;
  document.getElementById(
    "teacherCount"
  ).innerHTML = `Teachers: ${teachersArray.length}`;
}

async function getListOfCandidates() {
  const options = {
    chain: CHAIN, //update
    address: CONTRACTADDRESS, //update
    function_name: "getListOfCandidates", //check
    abi: ABI,
  };
  return await Moralis.Web3API.native.runContractFunction(options);
}

async function getListOfBOD() {
  const options = {
    chain: CHAIN, //update
    address: CONTRACTADDRESS, //update
    function_name: "getListOfBOD", //check
    abi: ABI,
  };
  return await Moralis.Web3API.native.runContractFunction(options);
}

async function getListOfTeachers() {
  const options = {
    chain: CHAIN, //update
    address: CONTRACTADDRESS, //update
    function_name: "getListOfTeachers", //check
    abi: ABI,
  };
  return await Moralis.Web3API.native.runContractFunction(options);
}

async function getListOfStudents() {
  const options = {
    chain: CHAIN, //update
    address: CONTRACTADDRESS, //update
    function_name: "getListOfStudents", //check
    abi: ABI,
  };
  return await Moralis.Web3API.native.runContractFunction(options);
}

//ADD AND CREATE STAKEHOLDERS
//ADD AND CREATE STAKEHOLDERS
//ADD AND CREATE STAKEHOLDERS

document.getElementById("btn-addStakeholder").onclick = addStakeholder;

async function addStakeholder() {
  const address = document.getElementById("input-address").value;
  const role = document.getElementById("roles").value;
  await createStakeHolder(address, role);
  document.getElementById("modal").classList.replace("hidden", "grid");
  document.getElementById("modal-header").innerHTML = "Successful";
  document.getElementById("modal-body").innerHTML = "Stakerholder created";
}

async function createStakeHolder(address, role) {
  await Moralis.authenticate({ signingMessage: "Log in using Moralis" });
  const options = {
    chain: CHAIN,
    contractAddress: CONTRACTADDRESS,
    functionName: "createStakeHolder",
    abi: ABI,
    params: {
      _address: address,
      _role: role,
    },
  };
  return await Moralis.executeFunction(options);
}

//ADD AND CREATE MULTIPLE STAKEHOLDERS
//ADD AND CREATE MULTIPLE STAKEHOLDERS
//ADD AND CREATE MULTIPLE STAKEHOLDERS
//function not properly functioning just yet
// -----------------------------------------------------------------
// document.getElementById("btn-multipleaddStakeholder").onclick =
//   addMultipleStakeholder;

async function addMultipleStakeholder() {
  // const addressesArray = document.getElementById("input-address").value;
  const addressesArray = getStateData("uploadAddress");
  // const addressesArray = `[${addresses}]`;
  const role = document.getElementById("roles").value;
  await createMultipleStakeHolders(addressesArray, role);
  document.getElementById("modal").classList.replace("hidden", "grid");
  document.getElementById("modal-header").innerHTML = "Successful";
  document.getElementById("modal-body").innerHTML = "Stakerholders created";
}

async function createMultipleStakeHolders(addresses, role) {
  await Moralis.authenticate({ signingMessage: "Log in using Moralis" });
  const options = {
    chain: CHAIN,
    contractAddress: CONTRACTADDRESS,
    functionName: "createMultipleStakeHolders",
    abi: ABI,
    params: {
      _addressArray: addresses,
      _role: role,
    },
  };
  return await Moralis.executeFunction(options);
}

// FUNCTIONALITY FOR UPLOADING EXCEL FILE
// CONVERTING TO JSON
// SETTING THE

// select file
let selectedFile;
console.log(window.XLSX);
document
  .getElementById("stakeholder-upload")
  .addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
  });

let data = [
  {
    name: "jayanth",
    data: "scd",
    abc: "sdef",
  },
];

// add multiple stake holders button
document.getElementById("btn-multipleaddStakeholder").onclick =
  uploadStakeHolderFile;

function uploadStakeHolderFile() {
  document
    .getElementById("btn-multipleaddStakeholder")
    .addEventListener("click", () => {
      XLSX.utils.json_to_sheet(data, "out.xlsx");
      if (selectedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
          let data = event.target.result;
          let workbook = XLSX.read(data, { type: "binary" });
          console.log(workbook);
          workbook.SheetNames.forEach((sheet) => {
            let rowObject = XLSX.utils.sheet_to_row_object_array(
              workbook.Sheets[sheet]
            );
            localStorage.removeItem("uploadAddress");
            console.info("removing previous upload...");
            console.info("downloading new upload");
            setState("uploadAddress", rowObject);
            console.info("upload download completed successfully");
            console.log("result of upload", rowObject);
          });
        };
      }
    });
}
