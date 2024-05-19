import React from 'react';
import "./Footer.css"


function Footer() {
  return (
    <footer>
      <div className="footer-div">
        <div className="footer-about">
          <ul>
            <li>
              <h3>Services</h3>
            </li>
            <li>
              <a href="/sell">Sell</a>
            </li>
            <li>
              <a href="/home">Buy</a>
            </li>
          </ul>
        </div>
        <div className="footer-about">
          <ul>
            <li>
              <h3>Help and Support</h3>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </div>

        <div className="footer-about">
          
          <div className="logo-div">

            <a href="/home" className="logo logo1">
              <i className="fa-solid fa-building-columns"></i>  
               &nbsp; RGUKT <br/>
                Emart &nbsp;
              <i className="fa-solid fa-cart-shopping"></i>
            </a>

            <p>All at one place</p>

            <div className="reserved">
              <a href="">
                <i className="fab fa-linkedin linkedin"></i>
              </a>
              <a href="">
                <i className="fab fa-facebook-square facebook"></i>
              </a>
              <a href="">
                <i className="fab fa-instagram-square insta"></i>
              </a>
            </div>
          </div>
          
        </div>  
      </div>
    </footer>
  );
}

export default Footer;
