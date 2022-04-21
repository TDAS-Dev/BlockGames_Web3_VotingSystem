//initialize Moralis on RRRinkeby
const serverUrl = "https://ujwb1som3llq.usemoralis.com:2053/server" 
const appId = "TPzse1a4T6YsxrbB5Em4weILu5cR0AUplKU43QsZ"
Moralis.start({ serverUrl, appId });

async function login() {
    let user = Moralis.User.current();
    if (!user) {
        await Moralis.enableWeb3();
        user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
            console.log("logged in user:", user);
            console.log(user.get("ethAddress"));
            setState("account", user.get("ethAddress"))
            document.getElementById("walletAddressButton").innerHTML = user.get("ethAddress")
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
  
async function logOut() {
    removeAddressFromStorage("account")
    await Moralis.User.logOut();
    console.log("logged out");
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;


//LOCAL STORAGE TRYOUT

function setState(key, params) {
    let stateData = localStorage.setItem(key, JSON.stringify(params))
    getStateData(key)
}

function getStateData(params){
    let getData = localStorage.getItem(params)
    return JSON.parse(getData)
}

function removeAddressFromStorage(param) {
    localStorage.removeItem(param)
    document.getElementById("walletAddressButton").innerHTML = "connect to metamask"
}

if (getStateData("account")) {
    document.getElementById("walletAddressButton").innerHTML = getStateData("account")
}
// document.getElementById("walletAddressButton").innerHTML = getStateData("account")