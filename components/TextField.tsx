import "@/styles/form.scss";

interface IProps {
  label: string;
  htmlFor: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
}

const TextField = ({ label, type, htmlFor, placeholder }: IProps) => {
  return (
    <div className="field-container">
      <label htmlFor={htmlFor}>{label}</label>
      <div className="input-field">
        <input type={type} required id={htmlFor} placeholder={placeholder} />
      </div>
    </div>
  );
};

export default TextField;
