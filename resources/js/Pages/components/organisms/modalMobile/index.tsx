import React, { useEffect, useRef, useState } from 'react';
import { Drawer } from "vaul";

interface ModalMobileProps {
    open: boolean;
    onClose: (open: boolean) => void;
    children?: React.ReactNode;
}

const ModalMobile: React.FC<ModalMobileProps> = ({
    open, onClose, children
}) => {
    console.log(" 🚀- DaiNQ - 🚀: -> open:", open)


    return (
        <Drawer.Root>
            <Drawer.Trigger>button</Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Content />
                <Drawer.Overlay />
            </Drawer.Portal>
        </Drawer.Root>
    );
}

ModalMobile.defaultProps = {
};

export default ModalMobile;
