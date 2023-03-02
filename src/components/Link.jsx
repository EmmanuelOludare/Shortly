/*import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";

const Link = () => {
  const BITLY_ACCESS_TOKEN = 'f1e598972f6619b3e9fc49ac7bb21a69b0ecb818';
  const pattern = /^https?:\/\/(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s]*)?$/i;
  const [originalLink, setOriginalLink] = useState("");
  const [urls, setUrls] = useState(() => {
    const storedUrls = localStorage.getItem('urls');
    return storedUrls ? JSON.parse(storedUrls) : [];
  });
  const [isCopied, setIsCopied] = useState(false);

  const handleChange = e => {
    const {value } = e.target;
    setOriginalLink(value);
  }

  function shortenUrl(longUrl) {
    return axios.post('https://api-ssl.bitly.com/v4/shorten', {
      long_url: longUrl,
    }, {
      headers: {
        'Authorization': `Bearer ${BITLY_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      return response.data.link;
    })
    .catch(error => {
      console.error(error);
      return null;
    });
  }

  useEffect(() => {
    localStorage.setItem('urls', JSON.stringify(urls));
  }, [urls]);

  const handleShortenLink = async (e) => {
    e.preventDefault();
    shortenUrl(originalLink).then(shortUrl => {
      if (shortUrl) {
        setUrls([...urls, { original: originalLink, shortened: shortUrl }]);
        setOriginalLink('');
      }
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDelete = (index) => {
    const newLinks = [...urls];
    newLinks.splice(index, 1);
    setUrls(newLinks);
    localStorage.setItem('urls', JSON.stringify(newLinks));
  };


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
        {urls.length===0 ? <p className='empty__prompt'>No links yet!</p> : urls.map((url, index) => (
            <div className="recently__shortened__links" key={index}>
              <p className="original__link__text">{url.original}</p>
              <hr className="line"></hr>
              <div className="copy">
                <p className="shortened__link__text">{url.shortened}</p>
                <div className="buttons__container">
                  <button className="copy__btn" onClick={() => copyToClipboard(url.shortened)} style={{backgroundColor : isCopied ? "hsl(260, 8%, 14%)" : "hsl(180, 66%, 49%)"}}>{isCopied ? "Copied!" : "Copy"}</button>
                  <button className="delete__btn" onClick={() => handleDelete(index)}><FaTrash /></button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Link */

import React, { useState,useEffect } from 'react';
import { FaTrash } from "react-icons/fa";

const Link = () => {
  const [originalLink, setOriginalLink] = useState("");
  const [shortenedLink, setShortenedLink] = useState("");
  const [links, setLinks] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  const handleChange = e => {
    const {value } = e.target;
    setOriginalLink(value);
  }

  const handleShortenLink = async (e) => {
    e.preventDefault();
    if(originalLink === '' || !pattern.test(originalLink)) {
      console.log("annoying")
    }else{
      const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${originalLink}`);
      const data = await response.json();
      setShortenedLink(data.result.short_link);
      const newLink = {
        link: originalLink,
        shortenedLink: data.result.short_link,
      };
      const updatedLinks = [...links, newLink];
      const reversedArray = [...updatedLinks].reverse();
      setLinks(reversedArray);
      localStorage.setItem('links', JSON.stringify(reversedArray));
      setOriginalLink("");
    }
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

  const copyToClipboard = (text, index, event) => {
    navigator.clipboard.writeText(text);
    const elementId = event.target.id;
    document.getElementById(elementId).innerHTML="Copied!";
    document.getElementById(elementId).style.backgroundColor="hsl(260, 8%, 14%)";
    setTimeout(() => {
      document.getElementById(elementId).innerHTML="Copy";
      document.getElementById(elementId).style.backgroundColor="hsl(180, 66%, 49%)";
    }, 2000);
  };

  const handleDelete = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
    localStorage.setItem('links', JSON.stringify(newLinks));
  };

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
          style={{border: originalLink === '' || !pattern.test(originalLink) ? "hsl(0, 87%, 67%) 2px solid" : ""}}
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
           {links.length === 0 ? <p className='empty__prompt'>No links yet!</p> : links.map((link, index) => (
            <div className="recently__shortened__links" key={index}>
              <p className="original__link__text">{link.link}</p>
              <hr className="line"></hr>
              <div className="copy">
                <p className="shortened__link__text">{link.shortenedLink}</p>
                <div className="buttons__container">
                  <button className="copy__btn" id={index} onClick={(event) => copyToClipboard(link.shortenedLink,index,event)}>Copy</button>
                  <button className="delete__btn" onClick={() => handleDelete(index)}><FaTrash /></button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Link