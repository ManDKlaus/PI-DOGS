import "./About.css"
import React from 'react'
import imagen from "../../assets/img/Mansilla.png"

export default function About() {
  return (
    <div className='About' >
      <div id='title'>
        <img src={imagen} alt="foto carnet" />
        <div className='cont' >
          <p id='fixed'>I´m </p>
          <ul className='dynamicText'>
            <li><span>Nicolás</span></li>
            <li><span>Mansilla</span></li>
            <li><span>student</span></li>
            <li><span>designer</span></li>
            <li><span>developer</span></li>
          </ul>
        </div>
        <div className='cont' >
          <p id='fixed2'>I´m </p>
          <ul className='dynamicText'>
            <li><span>tired</span></li>
            <li><span>destroyed</span></li>
            <li><span>drained</span></li>
            <li><span>fatigued</span></li>
            <li><span>exhausted</span></li>
          </ul>
        </div>
      </div>
      <div className="networks" >
        <a id="linkedin" href="https://www.linkedin.com/in/nicol%C3%A1sdanielmansilla/" target="_blank" />
        <a id="instagram" href="https://www.instagram.com/klaus.d.man/" target="_blank" />
        <a id="facebook" href="https://www.facebook.com/niko.mansilla.7" target="_blank" />
        <a id="whatsapp" href="https://wa.me/qr/2X77DSSQIW2EO1" target="_blank" />
      </div>
    </div>
  )
};