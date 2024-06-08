// ContactUsSection.tsx
import React from 'react';
import ContactUsForm from './ContactUsForm';
import "./ContactUsSection.css";

const ContactUsSection: React.FC = () => {
  document.title = "RGUKT-contactus";
  const adminEmail = 'srinudharpally@gmail.com';
  const ImageUrl = "logo.png";

  return (
    <div className='body'>
      <h1 style={{fontSize : '50px', color : 'black'}}>Contact Us</h1>
      <img style={{textAlign : 'center', margin : 'auto'}} src={ImageUrl} alt="E-commerce website" />
      <ContactUsForm adminEmail={adminEmail} />
    </div>
  );
};
export default ContactUsSection;
