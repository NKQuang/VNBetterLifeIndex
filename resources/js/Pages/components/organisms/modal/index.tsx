import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './styles.css';
import { mapModifiers } from '../../../utils/functions';

type ZIndex = 'lv1' | 'lv2' | 'lv3' | 'top'

interface MotionProps {
    children?: React.ReactNode;
    open: boolean;
    onClose: () => void;
    title?: string;
    zIndex?: ZIndex;
    className?: string;
}

const CModal: React.FC<MotionProps> = ({ open, onClose, children, title, zIndex = 'lv1', className }) => {
    return (
        <div className={mapModifiers('o-modal', zIndex, className)}>
            <Modal
                open={open}
                onClose={onClose}
                center
                showCloseIcon
                closeOnEsc
                classNames={{
                    root: mapModifiers('o-modal', zIndex, className)
                }}
            >
                {title &&
                    <div className='o-modal_header'>
                        {title}
                    </div>
                }
                {children}
            </Modal>
        </div >
    )

}

export default CModal;
