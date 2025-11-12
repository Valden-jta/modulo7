import Menu from "../menu/Menu";
import MenuButtons from "../menu/MenuButtons";
import MenuUser from "../menu/MenuUser";

type HeaderProps = {
  onToggleSidebar: () => void;
  isCollapsed: boolean;
};

function Header(props: HeaderProps) {
  const { onToggleSidebar, isCollapsed } = props;

  return (
    <>
      <header
        className="sticky top-0 z-20 flex justify-between items-center p-3
                       bg-light-surface-a10 dark:bg-dark-surface-a10 
                       border-b border-light-surface-a30 dark:border-dark-surface-a70">
        <div className="flex-1 flex items-center justify-between">
          <MenuButtons
            onToggleSidebar={onToggleSidebar}
            isCollapsed={isCollapsed}></MenuButtons>
          <Menu user={true}/>
          <MenuUser name="Olga Serrano" thumb="../../img/fakeProfilePic.jpg" />
        </div>
      </header>
    </>
  );
}

export default Header;
