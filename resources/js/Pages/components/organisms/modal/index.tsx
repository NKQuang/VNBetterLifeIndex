import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './styles.css';

interface MotionProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

const CModal: React.FC<MotionProps> = ({ open, onClose, children, title }) => {
    return (
        <div className='o-modal'>
            <Modal
                open={open}
                onClose={onClose}
                center
                showCloseIcon
                closeOnEsc
            >
                {title &&
                    <div className='o-modal_header'>
                        {title}
                    </div>
                }
                {children}
            </Modal>
        </div>
    )

}

CModal.defaultProps = {
};

export default CModal;
