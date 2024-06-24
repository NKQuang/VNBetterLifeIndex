import React from 'react'
import Select from 'react-select';
import './styles.css'

export interface DropdownType {
    value: string | number | undefined;
    label: string | number | undefined;
    [x: string]: any;
}

interface DropdownProps {
    options: DropdownType[];
    placeholder?: string;
    title?: string;
    value?: DropdownType;
    isRequired?: boolean;
    handleOnChange?: (value: DropdownType | undefined | any) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
    options,
    placeholder,
    title,
    isRequired,
    handleOnChange,
    value
}) => (
    <div className='a-dropdown'>
        <p className='a-dropdown_header'>{title}: {isRequired && <span>*</span>}</p>
        <Select
            value={value}
            options={options}
            placeholder={placeholder}
            onChange={handleOnChange}
        />
    </div>
);

Dropdown.defaultProps = {
};

export default Dropdown;
