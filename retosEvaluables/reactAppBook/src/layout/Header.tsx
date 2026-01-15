import type { PublicUser } from "../config/types";

import Menu from "./Menu";
import MenuButtons from "../shared/ui/navigation/MenuButtons";
import MenuUser from "../features/user/components/MenuUser";
import Logo from "../shared/ui/Logo";

type HeaderProps = {
  onToggleSidebar: () => void;
  isCollapsed: boolean;
  user: PublicUser | null;
  onLogOut: () => void;
};

function Header(props: HeaderProps) {
  const { onToggleSidebar, isCollapsed, user, onLogOut } = props;

  return (
    <>
      <header
        className="sticky top-0 z-20 flex justify-between items-center p-3
                       bg-light-surface-a10 dark:bg-dark-surface-a10 
                       border-b border-light-surface-a30 dark:border-dark-surface-a70">
        <div className="flex-1 flex items-center justify-between">
          {!user && <Logo heightClass="h-20"></Logo>}
          {user && (
            <MenuButtons
              onToggleSidebar={onToggleSidebar}
              isCollapsed={isCollapsed}></MenuButtons>
          )}
          <Menu user={user} />
          {user && (
            <MenuUser
              name={user?.nickName ?? ""}
              thumb={user?.thumb}
              onLogOut={onLogOut}
            />
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
