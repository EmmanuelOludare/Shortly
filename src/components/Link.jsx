import React, { useState,useEffect } from 'react';

const Link = () => {
  const [originalLink, setOriginalLink] = useState("");
  const [shortenedLink, setShortenedLink] = useState("");
  const [links, setLinks] = useState([]);

  const handleChange = e => {
    const {value } = e.target;
    setOriginalLink(value);
  }

  const handleShortenLink = async (e) => {
    e.preventDefault();
      const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${originalLink}`);
      const data = await response.json();
      setShortenedLink(data.result.short_link);
      const newLink = {
        link: originalLink,
        shortenedLink: data.result.short_link,
      };
      const updatedLinks = [...links, newLink];
      setLinks(updatedLinks);
      localStorage.setItem('links', JSON.stringify(updatedLinks));
      document.querySelector(".link__input").value = "";
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const storedLinks = JSON.parse(localStorage.getItem('links') || '[]');
    setLinks(storedLinks);
  }, [items]);

  const pattern = /^https?:\/\/(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s]*)?$/i;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    document.querySelector(".copy__btn").style.backgroundColor = "hsl(257, 27%, 26%)";
    document.querySelector(".copy__btn").innerHTML = "Copied!";
  }

  return (
    <div className='Link'>
      <div className="shorten__interface">
        <div className="input__error__container">
          <input 
          type="text" 
          className="link__input" 
          aria-label="Shorten a link here..." 
          placeholder="Shorten a link here..."
          name="originalLink"
          onChange={handleChange}
          value={originalLink}
          />
          {
            (originalLink === '') ?
            <p className="error__message">Please add a link</p>
            : (!pattern.test(originalLink)) ?
            <p className="error__message">Please add a valid link</p>
            : <></>
          }
        </div>
        <button className="shorten__btn" onClick={handleShortenLink} >Shorten It!</button>
      </div>
      <div className="links__container">
        {links.map((link, index) => (
            <div className="recently__shortened__links" key={index}>
              <p className="original__link__text">{link.link}</p>
              <hr className="line"></hr>
              <div className="copy">
                <p className="shortened__link__text">{link.shortenedLink}</p>
                <button className="copy__btn" onClick={() => handleCopy(link.shortenedLink)}>Copy</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Link