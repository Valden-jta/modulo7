import type { ReactNode } from "react";

type ToggleProps = {
  action: () => void;
  checked: boolean;
  activeIcon: ReactNode;
  icon: ReactNode;
  activeColors:string;
  inactiveColors:string;
  circleColors:string;
  iconColors:string  
};

function Toggle(props: ToggleProps) {
  const { action, checked, activeIcon, icon, activeColors, inactiveColors, circleColors , iconColors} = props;
  return (
  
      <label className={`relative inline-block h-6 w-14 cursor-pointer rounded-md transition-all duration-300 ${
      checked ? activeColors : inactiveColors
    }`}>
      <span className={`transition-all duration-200 absolute top-1 z-10 ${checked ? "left-1.5" : "right-1.5"} ${iconColors}`}>
        {checked ? activeIcon : icon}
      </span>
        <input
          className="sr-only"
          id="AcceptConditions"
          type="checkbox"
          onChange={action}
          checked={checked}
        />
        <span className={`absolute inset-y-0 m-1 size-4 rounded-full ring-[6px] ring-inset transition-all ${
        checked ? "start-8 w-2 ring-transparent" : "start-0 ring-light-surface-a10 dark:ring-dark-surface-a30"
        
      } ${circleColors}`}></span>
    </label>
 
  );
}

export default Toggle;
