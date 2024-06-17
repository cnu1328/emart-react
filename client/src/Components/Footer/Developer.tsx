// Developer.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Developers.css';

interface DeveloperProps {
  developer: {
    name: string;
    email: string;
    photo: string;
    background : string;
    role : string;
    social: {
      twitter: string;
      linkedin: string;
      github: string;
      instagram: string;
    }
  };
}

const Developer: React.FC<DeveloperProps> = ({ developer }) => {
  return (
    <div style={{backgroundColor : developer.background}} className="developer-card">
      <img src={developer.photo} alt={`${developer.name}'s profile`} className="developer-photo" style={{ borderRadius: "150px"}} />
      <div className="developer-details">
        <h2>{developer.name}</h2>
        <p>{developer.email}</p>
        <p>{developer.role}</p>
        <div className="social-icons">
          <a href={developer.social.twitter} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href={developer.social.linkedin} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href={developer.social.github} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href={developer.social.instagram} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Developer;
