interface LinkProps {
    id?: number;
    isActive: boolean;
    onClick: (id: number | undefined) => void;
    children: string;
}

const SelectionLink: React.FC<LinkProps> = ({ id, isActive, onClick, children }) => {
    const handleClick = () => {
        onClick(id);
    };

    return (
        <a
            onClick={handleClick}
            style={{
                color: isActive ? '#F88441' : '#A4A4A4',
                border: isActive ? '1px solid #F88441' : '1px solid #a4a4a478',
            }}
        >
            {children}
        </a>
    )
}

export default SelectionLink;