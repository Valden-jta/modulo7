import { useTheme } from "../hooks/useTheme";

type GenreBadgeProps = {
  genre: string;
};

function GenreBadge(props: GenreBadgeProps) {
  const { genre } = props;
  const { theme } = useTheme();

  const genreColors: {
    [key: string]: { colorLight: string; colorDark: string };
  } = {
    Ficción: {
      colorLight: "#1E3A8A", // Azul profundo
      colorDark: "#3B82F6", // Azul brillante
    },
    "No Ficción": {
      colorLight: "#374151", // Gris oscuro
      colorDark: "#9CA3AF", // Gris claro
    },
    Romance: {
      colorLight: "#BE185D", // Rosa fucsia
      colorDark: "#F472B6", // Rosa claro
    },
    "Ciencia Ficción": {
      colorLight: "#0F766E", // Verde azulado
      colorDark: "#14B8A6", // Turquesa
    },
    Fantasía: {
      colorLight: "#7C2D92", // Morado intenso
      colorDark: "#A855F7", // Morado brillante
    },
    "Misterio / Thriller": {
      colorLight: "#92400E", // Naranja oscuro
      colorDark: "#F59E0B", // Naranja brillante
    },
    Thriller: {
      colorLight: "#92400E", // Naranja oscuro (igual que Misterio)
      colorDark: "#F59E0B", // Naranja brillante
    },
    Terror: {
      colorLight: "#991B1B", // Rojo sangre
      colorDark: "#EF4444", // Rojo brillante
    },
    Histórico: {
      colorLight: "#A16207", // Dorado oscuro
      colorDark: "#EAB308", // Amarillo dorado
    },
    "Novela Histórica": {
      colorLight: "#A16207", // Dorado oscuro (igual que Histórico)
      colorDark: "#EAB308", // Amarillo dorado
    },
    Aventura: {
      colorLight: "#166534", // Verde bosque
      colorDark: "#22C55E", // Verde lima
    },
    Poesía: {
      colorLight: "#86198F", // Magenta
      colorDark: "#D946EF", // Magenta brillante
    },
    "Infantil / Juvenil": {
      colorLight: "#C2410C", // Naranja cálido
      colorDark: "#FB923C", // Naranja pastel
    },
    Clásicos: {
      colorLight: "#713F12", // Marrón elegante
      colorDark: "#A3A3A3", // Gris plateado
    },
    Filosofía: {
      colorLight: "#1F2937", // Gris muy oscuro
      colorDark: "#6366F1", // Índigo
    },
    Ensayo: {
      colorLight: "#581C87", // Púrpura profundo
      colorDark: "#8B5CF6", // Púrpura claro
    },
    Misterio: {
      colorLight: "#DC2626", // Rojo intenso
      colorDark: "#F87171", // Rojo coral
    },
  };

  const colors = genreColors[genre] || {
    colorLight: "#7C7C7C",
    colorDark: "#A0A0A0",
  };
  const backgroundColor =
    theme === "dark" ? colors.colorDark : colors.colorLight;

  return (
    <div
      className="w-fit text-[8px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1 rounded-full text-light-a0"
      style={{ backgroundColor }}>
      {genre}
    </div>
  );
}

export default GenreBadge;
