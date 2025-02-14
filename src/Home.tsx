


import React from 'react';
import ButtonAppBar  from './components/AppBar';
import Hero from './components/Hero';
import Accordian from './components/Accordian';
import Footer from './components/Footer';

const Home : React.FC = () => {

    return (
      <>
      <ButtonAppBar />
      <Hero />
    
      <Accordian />
      <Footer />
      </>
    )
  }

  export default Home;