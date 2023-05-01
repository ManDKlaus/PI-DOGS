import "./Welcome.css";
import React from 'react';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Welcome() {
    const [buttonsPressed, setButtonsPressed] = useState(false);

    const handleButtonPress = () => {
        setButtonsPressed(true);
      };
      
      useEffect(() => {
        const welcome = document.querySelector(".App");
        const blocks = Array.from({ length: 160 }, () => {
          const size = getRandomInt(20, 60);
          const block = document.createElement("div");
          block.classList.add("block");
          block.style.transform = `scale(${Math.random() * (2 - 1) + 1})`;
          block.style.top = `${getRandomInt(0, window.innerHeight)}px`;
          block.style.left = `${getRandomInt(0, window.innerWidth)}px`;
          block.style.transform = `rotate(${getRandomInt(0, 360)}deg)`;
          block.style.width = `${size}px`;
          block.style.height = `${size}px`;
          welcome.appendChild(block);
          return block;
        });
        
        return () => {
          blocks.forEach((block) => welcome.removeChild(block));
        }
      }, []);
      
      useEffect(() => {
        if (buttonsPressed) {
          const blocks = document.querySelectorAll(".block");
          blocks.forEach((block) => {
            const size = getRandomInt(20, 60);
            block.style.transform = `scale(${Math.random() * (2 - 1) + 1})`;
            block.style.top = `${getRandomInt(0, window.innerHeight)}px`;
            block.style.left = `${getRandomInt(0, window.innerWidth)}px`;
            block.style.transform = `rotate(${getRandomInt(0, 360)}deg)`;
            block.style.width = `${size}px`;
            block.style.height = `${size}px`;
          });
        }
        setButtonsPressed(false);
      }, [buttonsPressed]);
      
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

    return (
        <div className='Welcome'>
            <h1>Welcome to my dogs page</h1>
            <button onClick={handleButtonPress}>Do you like dogs?</button>
            <button onClick={handleButtonPress}>Do you want to learn more about them?</button>
            <Link to="/home" id="wel" >Start adventure</Link>
        </div>
    )
}
