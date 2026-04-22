// interface declarada para declarar el tipo de datos para las props del componente Button
interface ButtonProps {
  bgAndHoverColors: string;
  text: string;
  click: () => void;
}

const Button: React.FC<ButtonProps> = ({ bgAndHoverColors, text, click }) => {
  return (
    <button className={`stopwatch_button text-white ${bgAndHoverColors} font-bold text-xl min-[360px]:text-2xl py-3 px-4 min-[360px]:px-4 min-[360px]:py-3 rounded`} onClick={click}>
      {text}
    </button>
  );
}
export default Button;