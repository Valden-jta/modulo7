import { useTheme } from "../../hooks/useTheme";
import { RiMenuUnfold2Fill } from "react-icons/ri";
import { RiMenuUnfoldFill } from "react-icons/ri";

type MenuButtonsProps = {
  onToggleSidebar: () => void;
   sidebarCollapsed: boolean;
};

function MenuButtons(props: MenuButtonsProps) {
  const { onToggleSidebar, sidebarCollapsed } = props
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className="flex items-center justify-evenly gap-5 mr-auto">
        {sidebarCollapsed ? (
          <RiMenuUnfoldFill 
            className="text-xl hover:text-light-primary-a0 transition duration-200 cursor-pointer" 
            onClick={onToggleSidebar}
          />
        ) : (
          <RiMenuUnfold2Fill 
            className="text-xl hover:text-light-primary-a0 transition duration-200 cursor-pointer" 
            onClick={onToggleSidebar}
          />
        )}
        <label className="relative inline-block h-6 w-14 cursor-pointer rounded-full bg-light-primary-a0 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-dark-surface-a60">
          <input
            className="peer sr-only"
            id="AcceptConditions"
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          <span className="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-light-primary-a0 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-light-a0 peer-checked:ring-transparent"></span>
        </label>
      </div>
    </>
  );
}

export default MenuButtons;
