import "@/styles/form.scss";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Btn = ({ label, type, style }: IProps) => {
  return (
    <button type={type} className="btn" style={style}>
      {label}
    </button>
  );
};

export default Btn;
