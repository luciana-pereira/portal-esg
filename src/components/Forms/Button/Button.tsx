import './Button.css';

interface ButtonProps {
    styleBtn: string | undefined;
    children: any;
    disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, styleBtn, disabled, ...props }: any) => {
    return (
        <button {...props} className={styleBtn} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;