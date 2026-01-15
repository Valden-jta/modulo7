import { useTheme } from "../../hooks/useTheme";
import Toggle from "../Toggle";
import { RiMenuUnfold2Fill } from "react-icons/ri";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { CiLight } from "react-icons/ci";
import { GoMoon } from "react-icons/go";

type MenuButtonsProps = {
  onToggleSidebar: () => void;
  isCollapsed: boolean;
};

function MenuButtons(props: MenuButtonsProps) {
  const { onToggleSidebar, isCollapsed } = props;
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="flex items-center justify-evenly gap-5 mr-auto">
        {isCollapsed ? (
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
        <Toggle
          action={() => setTheme(theme === "dark" ? "light" : "dark")}
          checked={theme === "dark"}
          activeIcon={<CiLight />}
          icon={<GoMoon />}
          iconColors="text-dark-a0 dark:text-light-a0"
          activeColors="bg-light-surface-a0 dark:bg-dark-surface-a60"
          inactiveColors="bg-light-surface-a0 dark:dark-surface-a60"
          circleColors="ring-light-surface-a30 dark:ring-light-primary-a0"></Toggle>
      </div>
    </>
  );
}

export default MenuButtons;
