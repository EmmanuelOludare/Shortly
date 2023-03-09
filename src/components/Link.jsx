import { useState,useEffect } from 'react';
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
        longLink: originalLink,
        shortenedLink: shortenedLink,
      };
      const updatedLinks = [...links, newLink];
      const reversedArray = [...updatedLinks].reverse();
      setLinks(reversedArray);
      localStorage.setItem('links', JSON.stringify(reversedArray)); 
      setOriginalLink("");
    }
  };

  useEffect(() => {
    const storedLinks = JSON.parse(localStorage.getItem('links') || '[]');
    setLinks(storedLinks);
  }, []);

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
        <div className="input__error__container"> {/*08067796866*/}
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
              <p className="recent__indicator">{index === 0 ? "RECENT" : ""}</p>
              <p className="original__link__text">{link.longLink}</p>
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