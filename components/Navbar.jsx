import React, { useState } from "react";

export default function Navbar({ pokemon }) {
  const [term, setTerm] = useState("");
  const [modal, setModal] = useState(false);

  const [filter, setFilter] = useState([]);

  const HandleFilter = (e) => {
    const filterInput = e.target;
    if (filter.includes(filterInput.name)) {
      setFilter(filter.filter((type) => type !== filterInput.name));
    } else {
      setFilter((prev) => [...prev, filterInput.name]);
    }
  };
  console.log(filter);

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
      <div className='filter'>
        <span>Type</span>
        <label htmlFor='bug'>bug</label>
        <input
          type='checkbox'
          id='filter'
          name='bug'
          onClick={(e) => HandleFilter(e)}
        />
        <label htmlFor='fire'>fire</label>
        <input
          type='checkbox'
          name='fire'
          id='filter'
          onClick={(e) => HandleFilter(e)}
        />
      </div>
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
                          window.location.href = `/pokemon?id=${
                            result.index + 1
                          }`;
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
