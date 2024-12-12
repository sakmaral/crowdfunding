import abi from '@/shared/contracts/CrowdFunding.json';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { type Contract, type Provider, type Signer, ethers } from 'ethers';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const CONTRACT_ABI = abi.abi;

export const walletConnected = createEvent();

const walletConnectFx = createEffect(async () => {
  if (!window.ethereum) {
    throw new Error(
      'Ethereum provider is not available. Please install MetaMask or another wallet.',
    );
  }

  await window.ethereum.request({
    method: 'eth_requestAccounts',
    params: [],
  });

  const provider = new ethers.BrowserProvider(window.ethereum);

  if (!provider) {
    throw new Error('Provider could not be initialized.');
  }

  const signer = await provider.getSigner();

  console.log('sign', signer);

  const contractWithSigner = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  const contractWithProvider = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  const count = await contractWithProvider.numberOfCampaigns();

  // const tx = await contractWithSigner.createCampaign(
  //   'My Campaign', // _name
  //   'Description of campaign', // _description
  //   ethers.parseEther('10'), // _target (в wei, используйте ethers для перевода)
  //   new Date().valueOf(), // _endDate (текущая дата + 1 час, в секундах)
  //   'https://images.unsplash.com/photo-1732565277341-ebb37d748a87?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // _image
  // );
  // await tx.wait(); // дождаться майнинга транзакции

  // const campaignsProxy = await contractWithProvider.getCampaigns();

  // const campaignsArray = Array.from(Array.from(campaigns));
  // const campaigns = Array.from(campaignsProxy).map((campaign) => ({
  //   id: campaign.id.toString(),
  //   name: campaign.name,
  //   description: campaign.description,
  //   owner: campaign.owner,
  //   endDate: campaign.endDate.toString(),
  //   exists: campaign.exists,
  //   target: ethers.formatEther(campaign.target),
  //   amountCollected: ethers.formatEther(campaign.amountCollected),
  //   image: campaign.image,
  // }));

  console.log('count:', count);

  const address = await signer.getAddress();
  const balance = ethers.formatEther(await provider.getBalance(address));

  return { contractWithSigner, contractWithProvider, provider, signer, address, balance };
});

export const $pending = walletConnectFx.pending;
export const $contractWithSigner = createStore<Contract | null>(null);
export const $contractWithProvider = createStore<Contract | null>(null);
export const $provider = createStore<Provider | null>(null);
export const $signer = createStore<Signer | null>(null);
export const $walletInfo = createStore<{ address: string | null; balance: string | null }>({
  address: null,
  balance: null,
});
export const $metaMaskEnabled = createStore<boolean>(false);
export const $error = createStore<string | null>(null);

$contractWithSigner.on(walletConnectFx.doneData, (_, { contractWithSigner }) => contractWithSigner);
$contractWithProvider.on(
  walletConnectFx.doneData,
  (_, { contractWithProvider }) => contractWithProvider,
);
$provider.on(walletConnectFx.doneData, (_, { provider }) => provider);
$signer.on(walletConnectFx.doneData, (_, { signer }) => signer);
$walletInfo.on(walletConnectFx.doneData, (_, { address, balance }) => ({ address, balance }));
$metaMaskEnabled.on(walletConnectFx.done, () => true);
$error.on(walletConnectFx.failData, (_, error) => error.message);

sample({
  clock: walletConnected,
  target: walletConnectFx,
});

walletConnected.watch(() => console.log('wallet connected'));

walletConnected();
