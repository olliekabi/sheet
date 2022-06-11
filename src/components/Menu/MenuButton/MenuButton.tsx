import React from "react";

interface MenuButtonProps {
    text: string;
}

function MenuButton(props: MenuButtonProps) {
    return <button className="button-menu-item">{props.text}</button>;
}

export default MenuButton