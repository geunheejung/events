import "@/styles/form.scss";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Btn = ({ label, type, style, disabled, onClick }: IProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClick && onClick(e);
  };
  return (
    <button
      type={type}
      className="btn"
      style={style}
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Btn;
