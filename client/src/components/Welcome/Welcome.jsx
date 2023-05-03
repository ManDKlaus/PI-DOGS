import "./Welcome.css";
import React from 'react';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { handlerFootPrints } from "../../utils/handlerFootPrints.js"

export default function Welcome() {
    return (
        <div className='Welcome'>
            <h1>Welcome to my dogs page</h1>
            <button onClick={handlerFootPrints}>Do you like dogs?</button>
            <button onClick={handlerFootPrints}>Do you want to learn more about them?</button>
            <Link to="/home" id="wel" >Start adventure</Link>
        </div>
    )
}
