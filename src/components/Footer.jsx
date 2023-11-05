/* eslint-disable no-unused-vars */
import React from "react";
import GithubIcon from "/img/github.webp";

const Footer = () => {
  let dt = new Date(); let crntYear = dt.getFullYear()
  return (
    <div className="bg-[#121212] h-fit text-neutral-500 text-sm font-roboto-mono items-center justify-center flex flex-col">
      <div className="border-t-[1px] border-[#202020] w-[95%] flex flex-col justify-center items-center gap-2 p-4">
        <div><p className="text-neutral-300">© { crntYear } | Tutti i diritti riservati</p></div>
        <div>
          <p>Crediti ed informazioni</p>
        </div>
        <div>
          <p>v</p>
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