import React from 'react';
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer>
      <section className="flex justify-center text-4xl gap-6">
        <AiFillGithub />
        <AiFillLinkedin />
        <AiFillMail />
      </section>
      <section className="footer footer-center p-4 mt-4 text-base-content">
        <div>
          <p>
            Copyright © 2022 - Made with 💓 by <i className="font-bold underline">@josegabjimenez</i>
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
