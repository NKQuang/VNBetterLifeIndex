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
    isRequired?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ options, placeholder, title, isRequired }) => (
    <div className='a-dropdown'>
        <p className='a-dropdown_header'>{title}: {isRequired && <span>*</span>}</p>
        <Select options={options} placeholder={placeholder} />
    </div>
);

Dropdown.defaultProps = {
};

export default Dropdown;
