import { CampaignCard } from '@/entities/campaign/ui/campaign-card';
import { IconLoader } from '@/shared/assets/icons';
import { useState } from 'react';

const getCampaignCard = () => [
  {
    owner: 'User',
    title: 'Title',
    description: 'Description',
    target: 'Target',
    deadline: '2024-12-31',
    amountCollected: 20,
    image:
      'https://plus.unsplash.com/premium_photo-1733514692259-a2c77d567085?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    owner: 'User',
    title: 'Title',
    description: 'Description',
    target: 'Target',
    deadline: '2024-12-31',
    amountCollected: 20,
    image:
      'https://plus.unsplash.com/premium_photo-1733514692259-a2c77d567085?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    owner: 'User',
    title: 'Title',
    description: 'Description',
    target: 'Target',
    deadline: '2024-12-31',
    amountCollected: 20,
    image:
      'https://plus.unsplash.com/premium_photo-1733514692259-a2c77d567085?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];
export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState(getCampaignCard());

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        All Campaigns ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && <IconLoader className="w-[100px] h-[100px] " />}
        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}
        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <CampaignCard
              key={crypto.randomUUID()}
              {...campaign}
              handleClick={() => console.log('Clicked campaign')}
            />
          ))}
      </div>
    </div>
  );
};
