import hre from "hardhat";

async function main() {
  const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // Base mainnet USDC
  const TREASURY_ADDRESS = process.env.TREASURY_WALLET_ADDRESS!;

  console.log("Deploying PaymentRouter...");

  const PaymentRouter = await hre.ethers.getContractFactory("PaymentRouter");
  const router = await PaymentRouter.deploy(USDC_ADDRESS, TREASURY_ADDRESS);

  await router.waitForDeployment();

  const address = await router.getAddress();
  console.log(`PaymentRouter deployed to: ${address}`);
  console.log(`USDC Token: ${USDC_ADDRESS}`);
  console.log(`Treasury: ${TREASURY_ADDRESS}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
