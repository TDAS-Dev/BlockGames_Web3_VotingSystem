//initialize Moralis on RRRinkeby
const serverUrl = "https://mrhyy1if02wl.usemoralis.com:2053/server";
const appId = "AuH19PpSEOGZ1g2U08nV6tnNvgTkDMzaS8VqvjyI";
Moralis.start({ serverUrl, appId });

const CHAIN = "rinkeby";
const CONTRACTADDRESS = "0x251e18258E3FcDF32767AFe05b5398D0e51fA6E9";

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
        setState("account", user.get("ethAddress"));
        document.getElementById("walletAddressButton").innerHTML =
          user.get("ethAddress");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

async function logOut() {
  removeAddressFromStorage("account");
  await Moralis.User.logOut();
  console.log("logged out");
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;

//LOCAL STORAGE TRYOUT

function setState(key, params) {
  let stateData = localStorage.setItem(key, JSON.stringify(params));
  getStateData(key);
}

function getStateData(params) {
  let getData = localStorage.getItem(params);
  return JSON.parse(getData);
}

function removeAddressFromStorage(param) {
  localStorage.removeItem(param);
  document.getElementById("walletAddressButton").innerHTML =
    "connect to metamask";
}

if (getStateData("account")) {
  document.getElementById("walletAddressButton").innerHTML =
    getStateData("account");
}
document.getElementById("modal").onload = setModal;

function setModal() {
  if (getStateData("account")) {
    document.getElementById("modal").classList.replace("hidden", "grid");
    document.getElementById("modal-header").innerHTML = "Success";
    document.getElementById("modal-body").innerHTML =
      "Your Connection to metamask was successful";
  }
}
