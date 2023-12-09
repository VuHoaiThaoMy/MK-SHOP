import React from 'react';
import Menu from './Menu';
import '../styles.css';
import myImage1 from './images/Slider1.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Layout = ({
  className,
  children,
}) => (
  <div>
    <Menu />
    {/* <img src={myImage1} alt="Slider" className='Slider' /> */}
    <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
      <div>
        <img alt="Slider1" src={myImage1} />
        {/* <p className="legend">Legend 1</p> */}
      </div>
      <div>
        <img alt="Slider2" src={myImage1} />
        {/* <p className="legend">Legend 2</p> */}
      </div>
      <div>
        <img alt="Slider3" src={myImage1} />
        {/* <p className="legend">Legend 3</p> */}
      </div>
    </Carousel>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
