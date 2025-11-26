import type { User } from "../../config/types";

import Menu from "../menu/Menu";
import MenuButtons from "../menu/MenuButtons";
import MenuUser from "../menu/MenuUser";
import Logo from "../ui/Logo";

type HeaderProps = {
  onToggleSidebar: () => void;
  isCollapsed: boolean;
  user: User | null;
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
              name={user?.name ?? ""}
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
