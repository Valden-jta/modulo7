import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

type LogoutButtonProps = {
  onLogOut: () => void;
  setIsOpen: (v: boolean) => void;
};

export default function LogoutButton({
  onLogOut,
  setIsOpen,
}: LogoutButtonProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogOut();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full p-2 inline-flex justify-start items-center gap-3 rounded-md cursor-pointer hover:bg-light-surface-a30 dark:hover:bg-dark-surface-a40 transition-all duration-150 text-dark-a0">
      <CiLogout className="text-lg" />
      <span className="font-semibold text-[14px]">Cerrar sesión</span>
    </button>
  );
}
