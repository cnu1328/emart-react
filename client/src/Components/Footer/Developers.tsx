// Developers.tsx
import React from 'react';
import Developer from './Developer';
import './Developers.css';

const developers = [
  {
    id: 1,
    name: 'Srinu Dharpally',
    email: 'srinudarpally@gmail.com',
    photo: 'srinu.jpeg',
    background: "e6e6fa",
    role: "Full Stack Developer",
    social:
    {
      twitter: 'https://twitter.com',
      linkedin: 'https://www.linkedin.com/in/srinivas-dharpally/',
      github: 'https://github.com/cnu1328',
      instagram: "https://instagram.com"
    }
  },
  {
    id: 2,
    name: 'Chithra Alle',
    email: 'chithraalle@gmail.com',
    photo: 'Chithra_new.jpg',
    background: "e6e6fa",
    role: "Full Stack Developer",
    social: {
      twitter: 'https://x.com/ChithraAlle',
      linkedin: 'https://www.linkedin.com/in/chithra-alle-8a2169292',
      github: 'https://github.com/Chithra-Alle',
      instagram: "https://www.instagram.com/chithraalle"
    }
  },
  {
    id: 3,
    name: 'Karthik Jodu',
    email: 'karthikjodu25072@gmail.com',
    photo: 'karthik.jpeg',
    background: "e6e6fa",
    role: "Full Stack Developer",
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com/Jodu-Karthik',
      instagram: "https://www.instagram.com/merciful_s_servant/"
    }
  }
];

const Developers: React.FC = () => {
  return (
    <div className="developers-container">
      <h1>Developers</h1>
      {developers.map(developer => (
        <Developer key={developer.id} developer={developer} />
      ))}
    </div>
  );
};

export default Developers;
