import { useState,useEffect } from "react";
import { FaBars } from "react-icons/fa";
import logo from '../assets/images/logo.svg';
import illustrationWorking from '../assets/images/illustration-working.svg';

const Landing = () => {
    const [sideBarSlide,setSideBarSlide] = useState(false);
    const [lastScroll, setLastScroll] = useState(0);
    const [isScrollUp, setIsScrollUp] = useState(true);
    const toggleSidebarNav = () => {
        setSideBarSlide(prevSlide => !prevSlide)
        document.querySelector("nav").classList.toggle('slide');
    };

    useEffect(() => {
        function handleScroll() {
          const currentScroll = window.pageYOffset;
          const body = document.querySelector('.logo__menubtn__container');
    
          if (currentScroll <= 0) {
            body.classList.remove("scroll-up");
            setIsScrollUp(true);
            return;
          }
    
          if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
            body.classList.remove("scroll-up");
            body.classList.add("scroll-down");
            setIsScrollUp(false);
          } else if (
            currentScroll < lastScroll &&
            body.classList.contains("scroll-down")
          ) {
            body.classList.remove("scroll-down");
            body.classList.add("scroll-up");
            setIsScrollUp(true);
          }
          setLastScroll(currentScroll);
        }
    
        window.addEventListener("scroll", handleScroll);
    
        // cleanup event listener on unmount
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [lastScroll]);

  return (
    <div className='Landing'>
        <header>
            <div className="logo__menubtn__container">
                <img src={logo} alt="shortly logo" />
                <FaBars className="menu__btn" onClick={toggleSidebarNav}/>
            </div>
            <nav>
                <ul className="sitemaps">
                    <li className="sitemap"><a href="#">Features</a></li>
                    <li className="sitemap"><a href="#">Pricing</a></li>
                    <li className="sitemap"><a href="#">Resources</a></li>
                </ul>
                <ul className="ctas">
                    <li className="cta login"><a href="#">Login</a></li>
                    <li className="cta signup"><a href="#">Sign Up</a></li>
                </ul>
            </nav>
        </header>
        <section className="hero__section">
            <div className="info__container">
                <h1 className="info__header">More than just shorter links</h1>
                <p className="info__description">Build your brand’s recognition and get detailed insights
                on how your links are performing.</p>
                <a href="#" className="get__started">Get Started</a>
            </div>
            <div className="illustration__container">
                <img src={illustrationWorking} alt="working illustration" className="illustration__img"/>
            </div>
        </section>
    </div>
  )
}

export default Landing