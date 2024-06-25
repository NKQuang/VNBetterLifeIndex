import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './styles.css';
import { mapModifiers } from '../../../utils/functions';

type ZIndex = 'lv1' | 'lv2' | 'lv3'

interface MotionProps {
    children?: React.ReactNode;
    open: boolean;
    onClose: () => void;
    title?: string;
    zIndex?: ZIndex;
}

const CModal: React.FC<MotionProps> = ({ open, onClose, children, title, zIndex }) => {
    return (
        <div className={mapModifiers('o-modal', zIndex)}>
            <Modal
                open={open}
                onClose={onClose}
                center
                showCloseIcon
                closeOnEsc
                classNames={{
                    root: mapModifiers('o-modal', zIndex)
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

CModal.defaultProps = {
    zIndex: 'lv1'
};

export default CModal;
