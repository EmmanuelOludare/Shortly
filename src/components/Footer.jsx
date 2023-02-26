import logo from '../assets/images/footer-logo.svg';
import facebookImg from '../assets/images/icon-facebook.svg';
import twitterImg from '../assets/images/icon-twitter.svg';
import pinterestImg from '../assets/images/icon-pinterest.svg';
import instagramImg from '../assets/images/icon-instagram.svg';

const Footer = () => {
  return (
    <div className='Footer'>
      <div className="logo__container">
        <img src={logo} alt="shortly logo" />
      </div>
      <div className="sitemap__socials__container">
        <div className="sitemap">
            <p className="sitemap__heading">Features</p>
            <ul className="sitemap__subheadings">
              <li className="sitemap__subheading"><a href="#">Link Shortening</a></li>
              <li className="sitemap__subheading"><a href="#">Branded Links</a></li>
              <li className="sitemap__subheading"><a href="#">Analytics</a></li>
            </ul>
          </div>

          <div className="sitemap">
            <p className="sitemap__heading">Resources</p>
            <ul className="sitemap__subheadings">
              <li className="sitemap__subheading"><a href="#">Blog</a></li>
              <li className="sitemap__subheading"><a href="#">Developers</a></li>
              <li className="sitemap__subheading"><a href="#">Support</a></li>
            </ul>
          </div>

          <div className="sitemap">
            <p className="sitemap__heading">Company</p>
            <ul className="sitemap__subheadings">
              <li className="sitemap__subheading"><a href="#">About</a></li>
              <li className="sitemap__subheading"><a href="#">Our Team</a></li>
              <li className="sitemap__subheading"><a href="#">Careers</a></li>
              <li className="sitemap__subheading"><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="socials__container">
            <img src={facebookImg} alt="facebook" className="social" />
            <img src={twitterImg} alt="twitter" className="social" />
            <img src={pinterestImg} alt="pinterest" className="social" />
            <img src={instagramImg} alt="instagram" className="social" />
          </div>
      </div>
    </div>
  )
}

export default Footer