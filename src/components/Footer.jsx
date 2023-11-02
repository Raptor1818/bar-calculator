import React from 'react'
import GithubIcon from '/img/github.webp'

const Footer = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-2 bg-[#121212] h-fit p-4 text-white border-t-[1px] border-[#202020] font-roboto-mono'>
      <div>
        <p>© 2023 | Tutti i diritti riservati</p>
      </div>
      <div>
      <p>
        Ideato e sviluppato da {" "}
        <a
          href="https://raptorino.com"
          className="w-fit h-fit relative bg-gradient-to-r from-amber-700 to-yellow-400 bg-clip-text text-transparent"
          target="_blank"
        >
          Francesco Nisi
          <span className="absolute inset-x-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-amber-700 to-yellow-400"></span>
        </a>
      </p>

      </div>
      <div className='mt-2'>
        <a href="https://github.com/Raptor1818/bar-calculator" target="_blank"><img src={GithubIcon} alt="Github" height={48} width={48} /></a>
      </div>
    </div>
  )
}

export default Footer