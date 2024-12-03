import { IconLogo, IconSun } from '@/shared/assets/icons';

export const Sidebar = () => {
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <div
        className={`rounded-[10px]  flex justify-center items-center w-[52px] h-[52px] bg-[#2c2f32]`}
      >
        <div className={`w-1/2 h-1/2`}>
          <IconLogo />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">Test</div>

        <div
          className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center bg-[#1c1c24] shadow-secondary`}
        >
          <div className={`w-1/2 h-1/2 `}>
            <IconSun />
          </div>
        </div>
      </div>
    </div>
  );
};
