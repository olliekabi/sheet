import React from 'react';
import './Menu.css';
import MenuButton from "./MenuButton/MenuButton";

function Menu() {
    return (
        <div className="menu">
            <div className="text-menu-item">Menu</div>
            <MenuButton text="Click"/>
        </div>
    );
}

export default Menu