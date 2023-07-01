import { useCallback, useMemo } from "react";
import "@/styles/form.scss";

interface IProps {
  label: string;
  htmlFor: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  message?: string;
  onChange: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = ({
  label,
  type,
  htmlFor,
  placeholder,
  message,
  onChange,
}: IProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value, e);
    },
    [onChange]
  );

  const Message = useMemo(() => {
    if (!message) return null;

    return <p className="message">{message}</p>;
  }, [message]);

  return (
    <div className="field-container">
      <label htmlFor={htmlFor}>{label}</label>
      <div className="input-field">
        <input
          type={type}
          // required
          id={htmlFor}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
      {Message}
    </div>
  );
};

export default TextField;
