import React from 'react';
import './styles.css'
import { Drawer } from '@fluentui/react-drawer';

interface CDrawerProps {
    children?: React.ReactNode;
    open: boolean;
    onClose: () => void;
    placement: 'top' | 'left' | 'bottom' | 'right';
    width: number | string;
}

const CDrawer: React.FC<CDrawerProps> = ({
    open, onClose, placement, width, children
}) => (
    <div className='m-drawer'>
        <Drawer
            type="overlay"
            open={open}
            className='m-drawer_container'
            position="bottom"

        >
            {children}
        </Drawer>
    </div>
);

CDrawer.defaultProps = {
    placement: 'right',
    children: undefined,
};

export default CDrawer;
