import React, { useRef } from 'react'
import Select from 'react-select';
import './styles.css'
import { mapModifiers } from '../../../utils/functions';

export interface DropdownType {
    value: string | number | undefined;
    label: string | number | undefined;
    [x: string]: any;
}

interface DropdownProps {
    options: DropdownType[];
    placeholder?: string;
    title?: string;
    error?: string;
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
    value,
    error
}) => {
    const selectRef = useRef(null)
    return (

        < div className={mapModifiers('a-dropdown', !!error ? 'error' : '')} >
            <p className='a-dropdown_header'>{title}: {isRequired && <span>*</span>}</p>
            <div>
                <Select
                    value={value ? value : null}
                    options={options}
                    isSearchable={false}
                    placeholder={placeholder}
                    onChange={handleOnChange}
                    className='a-dropdown_input'
                    ref={selectRef}
                />
            </div>
            <span>{error}</span>
        </ div>
    );
}

Dropdown.defaultProps = {
};

export default Dropdown;
