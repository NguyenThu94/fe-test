import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Controller } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Feature from "../components/Feature";
import Testimonial from "../components/Testimonial";
import { FEARTURE_LIST, TESTIMONIAL_LIST, ABOUT_LINK, HELP_LINK } from "../constants/config";

import logo from '../assets/images/logo.png';
import banner from '../assets/images/banner.png';
import arrowLeft from '../assets/images/arrowLeft.png';
import arrowRight from '../assets/images/arrowRight.png';
import chatIcon from '../assets/icons/chat.svg';

const Home = () => {
  const isAuthenticated = !!Cookies.get('token');
  const [swiper, setSwiper] = useState(null);
  const prevRef = useRef();
  const nextRef = useRef();

  useEffect(() => {
    if (swiper) {
      if (swiper.params) {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }
  }, [swiper]);

  return (
    <>
      <div className="container">
        <header className="site-header">
          <div className="logon-container">
            <img src={logo} alt="logo" />
          </div>
          {
            isAuthenticated ? (
              <Link className="btn-primary" to={'/profile'}>
                Profile
              </Link>
            )
              : (
                <Link className="btn-primary" to={'/signin'}>
                  Sign in
                </Link>
              )
          }
        </header>
        <main className="site-main">
          <section className="site-banner">
            <h1>Save your data storage here.</h1>
            <p>Data Warehouse is a data storage area that has been
              tested for security, so you can store your data here
              safely but not be afraid of being stolen by others.
            </p>
            <button className="btn-secondary">
              Learn more
            </button>
            <div className="banner-img-container">
              <img src={banner} className="banner-img" alt="banner" />
            </div>
          </section>
          <section className="site-feature">
            <h3>Features</h3>
            <p className="desc">Some of the features and advantages that we provide for those of you who store data in this Data Warehouse.</p>
            <div className="card-container">
              {
                FEARTURE_LIST.map((feature, index) => (
                  <Feature
                    key={index}
                    title={feature.title}
                    content={feature.content}
                    link={feature.link}
                    image={feature.image}
                    background={feature.background}
                  />
                ))
              }
            </div>
          </section>
          <section className="site-testimonial">
            <h3>Testimonials</h3>
            <div className="site-swiper">
              <div className="btn-swiper-left" ref={prevRef}>
                <img src={arrowLeft} alt="arrow left" />
              </div>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
                spaceBetween={24}
                speed={800}
                slidesPerView={1}
                navigation={{
                  prevEl: prevRef?.current,
                  nextEl: nextRef?.current
                }}
                pagination={{
                  el: '.custom-navigation',
                  clickable: true,
                  renderBullet: (index, className) => {
                    return `<span class=${className}></span>`;
                  },
                }}
                updateOnWindowResize
                observer
                observeParents
                initialSlide={0}
                onSwiper={setSwiper}
              >
                {
                  TESTIMONIAL_LIST.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                      <Testimonial
                        name={testimonial.name}
                        content={testimonial.content}
                        link={testimonial.link}
                        image={testimonial.image}
                      />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
              <div className="btn-swiper-right" ref={nextRef}>
                <img src={arrowRight} alt="arrow right" />
              </div>
              <div className="custom-navigation"></div>
            </div>
          </section>
        </main>
      </div>
      <span className="line"></span>
      <div className="container">
        <footer className="site-footer">
          <div className="footer-info">
            <div className="title">
              <img className="footer-logo" src={logo} alt="logo" />
              <span>DataWarehouse</span>
            </div>
            <p className="footer-address">Warehouse Society, 234 <br />
              Bahagia Ave Street PRBW 29281
            </p>
            <p className="footer-contact">
              info@warehouse.project <br />
              1-232-3434 (Main)
            </p>
          </div>
          <div className="footer-about">
            <div className="title">
              About
            </div>
            <ul>
              {
                ABOUT_LINK.map((link, index) => (
                  <li key={index}>
                    <Link to={link.value}>
                      {link.title}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="footer-help">
            <div className="title">
              Help
            </div>
            <ul>
              {
                HELP_LINK.map((link, index) => (
                  <li key={index}>
                    <Link to={link.value}>
                      {link.title}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="footer-social">
            <div className="title">
              SocialMedia
            </div>
            <ul>
              <li><span></span></li>
              <li><span></span></li>
              <li><span></span></li>
            </ul>
          </div>
        </footer>
        <div className="copyright">
          <p>
            © Datawarehouse™, 2020. All rights reserved. <br />
            Company Registration Number: 21479524.
          </p>
          <div className="chat">
            <img src={chatIcon} alt=" chat icon" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
