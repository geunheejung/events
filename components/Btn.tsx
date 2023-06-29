import "@/styles/form.scss";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Btn = ({ label, type, style, disabled, onClick }: IProps) => {
  return (
    <button
      type={type}
      className="btn"
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Btn;
