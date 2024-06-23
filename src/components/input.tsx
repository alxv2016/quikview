import {ChangeEvent, ForwardedRef, InputHTMLAttributes, forwardRef, useEffect, useState} from 'react';

import './input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  value: string;
  label?: string;
  inputHelper?: string;
  search?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  validate?: (value: string) => string | null;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {id, value, label, inputHelper, search, validate, onChange, ...props}: InputProps,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (validate) {
      const validationError = validate(value);
      setError(validationError);
    }
  }, [value, validate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    if (onChange) onChange(event);
    setError(validate ? validate(value) : null);
  };

  return (
    <div className="form-control">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        ref={ref}
        id={id}
        name={id}
        value={value}
        {...props}
        className={search ? 'input--search' : ''}
        onChange={handleChange}
      />
      {search && (
        <div className="search-icon" aria-hidden="true">
          <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.04 9.81A4.362 4.362 0 0 1 2 6.364a4.363 4.363 0 1 1 8.727 0 4.348 4.348 0 0 1-.916 2.676l3.484 3.483-.772.771L9.04 9.81Zm.596-3.446a3.272 3.272 0 1 1-6.544 0 3.272 3.272 0 0 1 6.544 0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}
      {error && <span className="form-control-error">{error}</span>}
      {inputHelper && (
        <span role="alert" className="form-control-helper">
          {inputHelper}
        </span>
      )}
    </div>
  );
});

export default Input;
