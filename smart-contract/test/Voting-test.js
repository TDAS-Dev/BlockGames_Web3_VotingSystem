const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting", function () {
  this.timeout(0);

  let votingContract;

  it("Should deploy SimpleVoting", async function () {
    const SimpleVoting = await ethers.getContractFactory("SimpleVoting");
    votingContract = await SimpleVoting.deploy();
  });

  describe("Add Participants", () => {
    it("Should add a stakeholder", async () => {
      const [secondAccount] = await ethers.getSigners();

      const createStakeHolder = await votingContract.createStakeHolder(
        secondAccount.address,
        2
      );

      console.log("Waiting for confirmation...");
      await createStakeHolder.wait();

      const studentList = await votingContract.getListOfStudents();
      console.log("Updated student list:", studentList);
      expect(studentList.length).to.be.gt(0);
    });

    it("Should create candidate", async () => {
      const createCandidate = await votingContract.createCandidate("winner");

      console.log("Waiting for confirmation...");
      await createCandidate.wait();

      const candidateList = await votingContract.getListOfCandidates();
      console.log("Updated candidate list:", candidateList);
      expect(candidateList.length).to.be.gt(0);
    });

    it("Should check if is a stakeholder", async () => {
        const [secondAccount] = await ethers.getSigners();
        const isAStakeHolder = await votingContract.isAStakeholder(secondAccount.address);

      console.log("Is he a stakeholder?:", isAStakeHolder);
      expect(isAStakeHolder).to.be.true;
    });
  });

  describe("Toggle", () => {
    it("Should toggle voting", async () => {
      const toggleVoting = await votingContract.toggleVoting();

      console.log("Waiting for confirmation...");
      await toggleVoting.wait();
    //   console.log("Voting active:", toggleVoting);

    //   expect(toggleVoting).to.be.true;
    });

    it("Should toggle Result", async () => {
      const toggleResult = await votingContract.toggleResult();

      console.log("Waiting for confirmation...");
      await toggleResult.wait();
    //   console.log("Result can be shown?:", toggleResult);

    //   expect(toggleResult).to.be.true;
    });
  });

  describe("Vote", () => {
    it("Should vote successfully", async () => {
      const vote = await votingContract.vote(0);

      console.log("Waiting for confirmation...");
      await vote.wait();

      const candidateList = await votingContract.getListOfCandidates();
      expect(candidateList[0].totalVotesReceived).to.equal(1);
      expect(candidateList[0].receivedChairmansVote).to.be.true;
    });
  });
});
