/* eslint-disable no-unused-vars */
import React from "react";
import GithubIcon from "/img/github.webp";

const Footer = () => {
  const raptorino = "https://raptorino.com";
  const zippo = "https://matteomania.netlify.app";
  let dt = new Date();
  let crntYear = dt.getFullYear();
  return (
    <div className="bg-[#121212] h-fit text-neutral-500 text-sm font-roboto-mono items-center justify-center flex flex-col">
      <div className="border-t-[1px] border-[#202020] w-[95%] flex flex-col justify-center items-center gap-2 p-4">
        <div><p>© { crntYear } | Tutti i diritti riservati</p></div>
        <div>
          <p> Ideato e sviluppato da {" "}
            <a
              href={raptorino}
              className="w-fit h-fit relative bg-gradient-to-r from-amber-800 to-yellow-500 bg-clip-text text-transparent"
              target="_blank"
              rel="noreferrer"
              title="Author Francesco Nisi"
              alt="Author Francesco Nisi"
              role="link"
              aria-label="Author Francesco Nisi"
            >
              {" "} Francesco Nisi
              <span className="absolute inset-x-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-amber-800 to-yellow-500"></span>
            </a>
            {" "} & {" "}
            <a
              href={zippo}
              className="w-fit h-fit relative bg-gradient-to-r from-amber-800 to-yellow-500 bg-clip-text text-transparent"
              target="_blank"
              rel="noreferrer"
              title="Author Matteo Manià"
              alt="Author Matteo Manià"
              role="link"
              aria-label="Author Matteo Manià"
            >
              {" "} Matteo Manià
              <span className="absolute inset-x-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-amber-800 to-yellow-500"></span>
            </a>
          </p>
        </div>
        <div className="mt-2">
          <a
            href="https://github.com/Raptor1818/bar-calculator"
            target="_blank"
            rel="noreferrer"
            alt="Github link repository"
            role="link"
            title="Github link repository"
            aria-label="Github link repository"
          >
            <img src={GithubIcon} alt="Github" role="img" title="Gihub icon" height={48} width={48} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;