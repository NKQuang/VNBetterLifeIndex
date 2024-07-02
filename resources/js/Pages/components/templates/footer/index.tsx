import React, { useEffect, useState } from 'react';
import './styles.css'

interface FooterProps {
}

const Footer: React.FC<FooterProps> = ({ }) => {

    return (
        <footer className='t-footer'>
            <div className='t-footer_wrapper'>
                @Copyright by vietstats.vn
            </div>
        </footer>
    )
}

export default Footer;
