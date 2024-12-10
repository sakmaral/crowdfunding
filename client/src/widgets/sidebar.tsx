import {
  IconCampaign,
  IconDashboard,
  IconLogo,
  IconLogout,
  IconPayment,
  IconProfile,
  IconSun,
  IconWithdraw,
} from '@/shared/assets/icons';
import { useState } from 'react';

export const Sidebar = () => {
  const [isActive, setIsActive] = useState('dashboard');

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <div
        className={`w-[52px] h-[52px] rounded-[10px] flex justify-center items-center  bg-[#2c2f32]`}
      >
        <IconLogo className="w-1/2 h-1/2" />
      </div>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map(({ name, disabled, icon: Icon }) => (
            <div
              className={`w-[48px] h-[48px] rounded-[10px] ${
                isActive && isActive === name && 'bg-[#2c2f32]'
              } flex justify-center items-center ${!disabled && 'cursor-pointer'}`}
              onClick={() => {
                if (!disabled) {
                  setIsActive(name);
                }
              }}
            >
              <Icon className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
            </div>
          ))}
        </div>

        <div
          className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center bg-[#1c1c24] shadow-secondary`}
        >
          <IconSun className="w-1/2 h-1/2" />
        </div>
      </div>
    </div>
  );
};

export const navlinks = [
  {
    name: 'dashboard',
    icon: IconDashboard,
    link: '/',
    disabled: false,
  },
  {
    name: 'campaign',
    icon: IconCampaign,
    link: '/create-campaign',
    disabled: false,
  },
  {
    name: 'payment',
    icon: IconPayment,
    link: '/',
    disabled: true,
  },
  {
    name: 'withdraw',
    icon: IconWithdraw,
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    icon: IconProfile,
    link: '/',
    disabled: false,
  },
  {
    name: 'logout',
    icon: IconLogout,
    link: '/',
    disabled: true,
  },
];
