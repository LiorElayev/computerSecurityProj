import React from "react";
import { Link } from "react-router-dom";
import Image from '../Comunication_LTD_LOGO.png';

const menuItemClick = (e) => {
  if (e.target.classList.contains("item")) {
    console.log(e.target.classList);
    const menu = document.querySelectorAll(".item");
    menu.forEach((men) => {
      men.classList.remove("active");
    });
    e.target.classList.add("active");
  }
};

function Menu() {
  return (
    <div className="ui inverted grey segment">
      <img src={Image} alt="Logo" align="right"/>
      <div
        className="ui inverted secondary menu"
        onClick={(e) => menuItemClick(e)}
      >
        <Link className="active item" to="/">
          Home
        </Link>
        <Link className="active item" to="/usersignup">
          User Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Menu;
