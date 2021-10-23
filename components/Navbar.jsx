import React, { useState } from "react";

export default function Navbar({ pokemon }) {
  const [term, setTerm] = useState("");
  const [modal, setModal] = useState(false);

  return (
    <>
      <nav>
        <div className='left'>
          <img src='./pokeball.jpg' alt='logo' />
          <h2>Pokedex</h2>
        </div>
        <div className='right'>
          <input
            type='text'
            onFocus={() => setModal(true)}
            onBlur={() => {
              setTimeout(() => {
                setModal(false);
              }, 100);
            }}
            placeholder='rechercher'
            autoComplete='off'
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </nav>
      {modal && (
        <>
          <div className='modal'>
            <span className='cross' onClick={() => setModal(false)}>
              &#10005;
            </span>
            <ul>
              {term === "" ? (
                <p>commencer a rechercher</p>
              ) : (
                pokemon
                  .filter((p) =>
                    p.name?.toLowerCase().includes(term.toLowerCase())
                  )
                  .map((result, index) => {
                    console.log(result);
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          window.location.href = `/pokemon?id=${result.index}`;
                        }}>
                        {result.name}
                      </li>
                    );
                  })
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
