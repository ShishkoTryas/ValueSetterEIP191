const hre = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("ValueSetter", async function(){
    async function deployFixture() {
        const valueSetter = await hre.ethers.deployContract("ValueSetter");

        return { valueSetter };
    }

    it('should be correct change raw', async function () {
        const { valueSetter } = await loadFixture(deployFixture);
        console.log("Value before: ", await valueSetter.getValue());
        const hexNumber = "0x500a70b565f66d19c752d0d3f843c4a591562ac92586efd45e616cdb9a8c61d14b7ede082622a139b95cbfca38cfee82a164fad850187c3fe23e08ab268693691c";
        await valueSetter.setValue(712, hexNumber);
        console.log("Value after: ", await valueSetter.getValue());
        expect(await valueSetter.getValue()).to.equal(712);
    });
});