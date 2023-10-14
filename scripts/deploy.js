const hre = require("hardhat");
async function main() {
  const valueSetter = await hre.ethers.deployContract("ValueSetter");
  await valueSetter.waitForDeployment();
  console.log("ValueSetter Address: ", await valueSetter.getAddress());

  const contractAddress = "0xF57D969D6e38E01F0d367D66De2C8f38C2C96446";
  const signer = await hre.ethers.provider.getSigner();
  const ABI = [{"inputs":[{"internalType":"contract ValueSetter","name":"valueSetter_","type":"address"}],"name":"validate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
  const contract = new hre.ethers.Contract(contractAddress, ABI, signer);

  const isValid = await contract.validate(await valueSetter.getAddress());
  await isValid.wait();
  if (isValid) {
    console.log("Validation successful.");
  } else {
    console.log("Validation failed.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
