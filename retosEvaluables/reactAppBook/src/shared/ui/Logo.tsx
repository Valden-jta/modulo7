import { useTheme } from "../hooks/useTheme";
import { Link } from "react-router-dom";

type LogoProps = {
  heightClass: string;
};

function Logo(props: LogoProps) {
  const { theme } = useTheme();
  const { heightClass } = props;

  console.log(theme);

  return (
    <>
      <div className="display">
        <Link to="/">
          <img
            className={`${heightClass} w-auto object-contain`}
            src={
              theme === "light"
                ? "/img/myBooks_logo.svg"
                : "/img/myBooks_logo_dark.svg"
            }
            alt="MyBooks logo"
          />
        </Link>
      </div>
    </>
  );
}

export default Logo;
