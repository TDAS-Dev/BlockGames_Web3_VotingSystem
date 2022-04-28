



async function getListOfStakeHoldersObjects() {
    const options = {
      chain: CHAIN, //update
      address: CONTRACTADDRESS, //update
      function_name: "getListOfStakeHoldersObjects", //check
      abi: ABI,
    };
    return await Moralis.Web3API.native.runContractFunction(options);
  }
  
  async function displayListOfStakeHoldersObjects() {
    const ListOfStakeHoldersObjects = await getListOfStakeHoldersObjects();
    console.log(ListOfStakeHoldersObjects);
  }
  
  displayListOfStakeHoldersObjects();