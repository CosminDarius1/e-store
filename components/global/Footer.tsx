
import React from "react";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa"; // Import icons from react-icons

const Footer: React.FC = () => {
  return (
    <footer className="text-white p-4 text-center">
      <p>Developed by Cosmin Darius Sas</p> {/* Replace with your actual name */}
      <div className="flex justify-center gap-4 mt-2">
        <a
          href="https://github.com/CosminDarius1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/cosmin-darius-sas-5458b91b4/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://cosmin-darius-portfolio.2023-cosmins.dev.io-academy.uk/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Portfolio"
        >
          <FaGlobe size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
