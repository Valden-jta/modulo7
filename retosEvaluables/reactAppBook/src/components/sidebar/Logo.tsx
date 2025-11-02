import { useTheme } from "../../hooks/useTheme";

function Logo() {
  const { theme } = useTheme();

  console.log(theme);

  return (
    <>
      <div className="display">
        <a href="#">
          <img
            className="h-30 w-auto object-contain"
            src={
              theme === "light"
                ? "/img/myBooks_logo.svg"
                : "/img/myBooks_logo_dark.svg"
            }
            alt="MyBooks logo"
          />
        </a>
      </div>
    </>
  );
}

export default Logo;
