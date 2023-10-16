import './Input.css';

interface InputProps {
    id: string | undefined;
    type: any | undefined;
    value: any | undefined;
    name: string | undefined;
    label: string;
    stylesLabel: string | undefined;
    stylesInput: string | undefined;
    stylesWrapper: string | undefined;
    stylesError: string | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
    error: any | undefined;
    accept: string;
}

const InputUpload: React.FC<InputProps> = ({
    label,
    type,
    name,
    stylesLabel,
    stylesInput,
    stylesWrapper,
    stylesError,
    value, onChange, error, onBlur }) => {
    return (
        <div className={stylesWrapper}>
            <label htmlFor={name} className={stylesLabel}>
                {label}
            </label>
            <input
                id={name}
                name={name}
                className={stylesInput}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            {error && <p className={stylesError}>{error}</p>}
        </div>
    );
};

export default InputUpload;