import React from 'react';
import Link from 'next/link';
import { GrCode } from 'react-icons/gr';
import { CgCodeSlash } from 'react-icons/cg';

const Navbar = () => {
  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/about',
      name: 'About',
    },
    {
      path: '/skills',
      name: 'Skills',
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
    },
  ];

  return (
    <div className="navbar transparent">
      <div className="navbar-start ml-4">
        {/* Mobile Menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {routes.map((route) => (
              <Link href={route.path} key={route.path}>
                <li key={`${route.path}-mobile`}>
                  <p>{route.name}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        {/* Code Logo */}
        {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
        <div className="lg:block hidden text-primary text-7xl p-0 m-0">
          <CgCodeSlash />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        {/* Desktop menu */}
        <ul className="menu menu-horizontal p-0">
          {routes.map((route) => (
            <Link href={route.path} key={`${route.path}-desktop`}>
              <li key={route.path}>
                <p>{route.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="navbar-end mr-4">
        {/* Contact button */}
        <a className="btn btn-outline btn-secondary rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Contact me
        </a>
      </div>
    </div>
  );
};

export default Navbar;
