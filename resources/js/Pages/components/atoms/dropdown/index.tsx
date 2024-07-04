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
    // Hàm xử lý sự kiện focus
    const handleFocus = (e: React.FocusEvent) => {
        e.preventDefault();
        if (selectRef.current) {
            (selectRef.current as any).blur();
        }
    };
    return (

        < div className={mapModifiers('a-dropdown', !!error ? 'error' : '')} >
            <p className='a-dropdown_header'>{title}: {isRequired && <span>*</span>}</p>
            <div onFocus={handleFocus}>
                <Select
                    value={value ? value : null}
                    options={options}
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
