import brandRecognitionImg from '../assets/images/icon-brand-recognition.svg';
import detailedRecordsImg from '../assets/images/icon-detailed-records.svg';
import fullyCustomizableImg from '../assets/images/icon-fully-customizable.svg';
const Services = () => {
  return (
    <div className='Services'>
      <div className="services__container">
        <div className="services__intro">
          <h3 className="services__intro__header">Advanced Statistics</h3>
          <p className="services__intro__description">Track how your links are performing across the web with our
          advanced statistics dashboard.</p>
        </div>
        <div className="services__description">
          <div className="service__description">
            <div className="img__container"><img src={brandRecognitionImg} alt="brand recognition icon" /></div>
            <p className="service__description__header">Brand Recognition</p>
            <p className="service__description__info">Boost your brand recognition with each click. Generic links don’t
            mean a thing. Branded links help instil confidence in your content.</p>
          </div>
          <div className="connector"></div>
          <div className="service__description">
          <div className="img__container"><img src={detailedRecordsImg} alt="detailed records icon" /></div>
            <p className="service__description__header">Detailed Records</p>
            <p className="service__description__info">Gain insights into who is clicking your links. Knowing when and where
            people engage with your content helps inform better decisions.</p>
          </div>
          <div className="connector"></div>
          <div className="service__description">
          <div className="img__container"><img src={fullyCustomizableImg} alt="fully customizable icon" /></div>
            <p className="service__description__header">Fully Customizable</p>
            <p className="service__description__info">Improve brand awareness and content discoverability through customizable
            links, supercharging audience engagement.</p>
          </div>
        </div>
      </div>
      <div className="boosting__section">
        <p className="boosting__header">Boost your links today</p>
        <a href="#" className="get__started">Get Started</a>
      </div>
    </div>
  )
}

export default Services