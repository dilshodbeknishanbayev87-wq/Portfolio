import React, { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-900 text-white" id='header'>

        <div className="  flex items-center justify-between h-16 px-4 fixed z-10 w-full bg-gray-900">

          <h1 className="text-xl font-bold">Portfolio</h1>

          <ul className="hidden md:flex gap-6">
            <li><a href="#header">Home</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <div
            className="md:hidden text-3xl cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            ☰
          </div>
        </div>

        {open && (
          <div className=" flex justify-between  md:hidden bg-blue-800 px-6 py-4 flex flex-col gap-4 fixed w-full z-10">
            <a href="#header" onClick={() => setOpen(false)}>Home</a>
            <a href="#skills" onClick={() => setOpen(false)}>Skills</a>
            <a href="#projects" onClick={() => setOpen(false)}>Projects</a>
            <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
          </div>
        )}

      <div className="pt-24 px-6 md:px-16 min-h-screen flex items-center md:[320px] ">
        <div className="max-w-7xl mx-auto flex flex-col gap-[18rem]  md:flex-row items-center justify-between gap-10">

          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Hi, I'm Dilshoddbek
            </h1>
            <h4 className="text-xl text-gray-400 mb-4">
              Frontend Developer
            </h4>
            <p className="text-gray-400 max-w-md">
              I create user-friendly, fast, and modern web interfaces with JavaScript/React.
            </p>
          </div>

          <img src="https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1555952517-2e8e729e0b44"
            alt="Avatar"
            className="rounded-full w-64 h-64 md:w-[760px] md:h-[680px] object-cover"/>

        </div>
      </div>
    </div>
  );
}

export default Header;