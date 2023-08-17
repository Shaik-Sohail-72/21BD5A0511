import React from 'react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="colored-section" id="footer">
      <div className="container-fluid">
        <p>© {currentYear} Train Central</p>
      </div>
    </footer>
  );
};
export default Footer;
