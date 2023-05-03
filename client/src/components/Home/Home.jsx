import React from 'react'
import "./Home.css";
import About from '../About/About.jsx';
import Temperaments from '../Temperaments/Temperaments.jsx';
import Dogs from '../Dogs/Dogs.jsx';
import Create from '../Create/Create.jsx';
import Details from '../Details/Details.jsx';

export default function Home() {
  return (
    <div className='Home'>
      <section>
        <h1>DOG<span>s</span></h1>
        <div>
          <p>Welcome to DOGs, the website where you can find detailed information about dog breeds, their characteristics, temperaments, sizes, and weights. You can filter and search dogs by name or identifier, as well as select your favorites to have them always at hand.</p>
          <ul>
            <li>You will learn more about different dog breeds and their particular needs.</li>
            <li>You can filter and search dogs according to your preferences and needs.</li>
            <li>You will have the option to select your favorite dogs for quick and easy access to their information.</li>
          </ul>
          <p>Remember that our furry friends deserve all our care and attention. Learn how you can provide them with a happy and healthy life! Explore our website and start discovering all we have to offer. Adopt a dog and make them part of your family today!</p>
        </div>
      </section>
      <section id="temperaments" >
        <Temperaments></Temperaments>
      </section>
      <section id="dogs" >
        <Dogs></Dogs>
      </section>
      <section id="details" >
        <Details></Details>
      </section>
      <section id="create" >
        <Create></Create>
      </section>
    </div>
  )
}
