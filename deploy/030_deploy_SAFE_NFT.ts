import { costDistributionForNFT, profitDistributionForNFT, tierMaxSupplyNFT, tierPriceNFT } from '@config';
import { deployAndTell } from '@utils/deployFunc';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async hre => {
  const {
    deployments: { deploy },
  } = hre;

  const { deployer } = await hre.getNamedAccounts();

  const token = await hre.deployments.get('SafeToken');

  await deployAndTell(deploy, 'SafeNFT', {
    from: deployer,
    proxy: 'initialize',
    args: [
      '',
      Object.values(tierPriceNFT),
      Object.values(tierMaxSupplyNFT),
      token.address,
      Object.values(costDistributionForNFT),
      Object.values(profitDistributionForNFT),
    ],
  });
};
export default func;
func.tags = ['SafeNFT'];
