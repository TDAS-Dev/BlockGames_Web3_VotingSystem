const modalUI = (title, message) => {`
<div id="modal" class="font-sans hidden place-items-center mx-auto container absolute z-auto w-100 h-100">
      <div class="bg-zinc-100 rounded shadow-md w-100 lg:w-[40%] md:w-[40%] items-center mt-[20%] text-zinc-900 p-5">
        <div id="modal-content" class="">
          <div id="modal-header" class="flex justify-between items-center py-2">
            <h2 class="modal-title">${title}</h2>
            <span id="close" class="text-red-600 hover:text-red-500 cursor-pointer" style="font-size: 30px;">&times;</span>
          </div>
          <div class="border border-zinc-200 shadow-sm"></div>
          <div id="modal-body" class="px-3 py-10">
            <p class="leading-relaxed">${message}</p>
          </div>
          <div class="border border-zinc-200 shadow-sm"></div>
          <div id="modal-footer" class="flex justify-center items-center pt-3">
            <button href="#close" id="closeBtn" style="font-size: 12px;"
              class="font-sans text-sm font md:mx-3 py-2 px-7 bg-red-600 hover:bg-red-500 text-white rounded-full cursor-pointer">
              Close
            </button>
          </div>
        </div>
      </div>
</div>
`};


// let link = "../src/artifacts/contracts/SimpleVoting.sol/SimpleVoting.json";
// const fetchAbi = async () => {
//   const res = await fetch(link);
//   const json = await res.json();
//   const abi = json.abi;
//   console.log("abi: ", abi);
//   return abi;
// };
// const ABI = fetchAbi();
// console.log(ABI)


function setState(key, params) {
    localStorage.setItem(key, JSON.stringify(params)); //setState
    console.log("setState", key, params); //setState
  }
  
  function getStateData(params) {
    let getData = localStorage.getItem(params);
    console.log("getStateData", params, getData); //getStateData
    return JSON.parse(getData);
  }
  // if condition to determine UI @abiola
  if (getStateData("account")) {
    document.getElementById("wallet-address").innerHTML = getStateData("account");
  }