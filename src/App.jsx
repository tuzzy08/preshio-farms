import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Leaf, Award, MapPin, ArrowRight, Menu, X, Instagram, Twitter, Linkedin, Droplets, Sun, Wind } from 'lucide-react';

const products = [
  { 
    title: 'Premium Livestock', 
    desc: 'Ethically raised cattle and poultry in open pastures.', 
    image: '/assets/Images/Livestock/livestock-1.jpeg',
    category: 'Livestock' 
  },
  { 
    title: 'Fresh Greenhouse Harvest', 
    desc: 'Climate-controlled, pesticide-free vegetables ensuring year-round freshness.', 
    image: '/assets/Images/Greenhouse/greenhouse-1.jpeg',
    category: 'Vegetables'
  },
  { 
    title: 'Organic Pepper', 
    desc: 'Vibrantly colored, organically grown peppers bursting with flavor.', 
    image: '/assets/Images/Pepper/pepper-1.jpg',
    category: 'Vegetables'
  },
  { 
    title: 'Farm Fresh Produce', 
    desc: 'Harvested at peak ripeness for maximum nutritional value.', 
    image: '/assets/Images/Farm/farm-2.jpeg',
    category: 'Produce'
  },
  { 
    title: 'Cassava Stems', 
    desc: 'High-quality, starchy cassava stems cultivated with care perfectly suited for varied culinary needs.', 
    image: '/assets/Images/Cassava/3.jpg',
    category: 'Crops'
  },
];

const galleryImages = [
  '/assets/Images/Pepper/pepper-2.jpg',
  '/assets/Images/Farm/farm-1.jpeg',
  '/assets/Images/Farm/farm-3.jpeg',
  '/assets/Images/Livestock/livestock-2.jpg',
  '/assets/Images/Farm/farm-4.jpeg',
  '/assets/Images/Cassava/Cassava-1.jpeg',
  '/assets/Images/Greenhouse/greenhouse-2.jpg',
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <button onClick={() => setMenuOpen(true)} className="nav-menu-btn">
          <Menu size={24} className="menu-icon" /> 
          <span className="menu-text">MENU</span>
        </button>
        <div className="nav-logo">
          <Leaf className="logo-icon" size={28} />
          <h3>Preshio Farms</h3>
        </div>
        <a href="#contact" className="nav-contact outline-btn">
          CONTACT US
        </a>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="menu-overlay"
            initial={{ opacity: 0, clipPath: 'circle(0% at top left)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top left)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top left)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <button onClick={() => setMenuOpen(false)} className="menu-close">
              <X size={28} className="close-icon" /> CLOSE
            </button>
            <div className="menu-content">
              <div className="menu-links">
                {['Products', 'Our Farm', 'Gallery', 'Contact'].map((item, i) => (
                  <motion.a 
                    key={item} 
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1), duration: 0.5, ease: "easeOut" }}
                    onClick={() => setMenuOpen(false)}
                    className="menu-item hover-text-outline"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
              <div className="menu-info">
                <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.6}}>
                  <h4>Contact</h4>
                  <p>hello@preshiofarms.com</p>
                  <p>+1 234 567 890</p>
                </motion.div>
                <br/>
                <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.7}}>
                  <h4>Follow Us</h4>
                  <div className="social-links">
                    <a href="#"><Instagram size={20}/></a>
                    <a href="#"><Twitter size={20}/></a>
                    <a href="#"><Linkedin size={20}/></a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="video-container">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="hero-video"
          >
            <source src="/assets/Videos/Hero/hero-1.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>
        
        <motion.div 
          className="hero-text"
          style={{ y: yHeroText, opacity: opacityHero }}
        >
          <motion.span 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            AGRICULTURE, ELEVATED.
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            The Future of <br/><span className="text-accent">Farming</span> is Here.
          </motion.h1>
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1.2, duration: 1 }}
             className="hero-scroll-indicator"
          >
             <div className="mouse"></div>
             <span>Scroll to explore</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Intro Metrics Section */}
      <section className="metrics-section" id="our-farm">
        <div className="container">
          <motion.div 
            className="metrics-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.8 } }
            }}
          >
            {[
              { icon: <Leaf size={40} strokeWidth={1.5} />, title: "100% Organic", desc: "No harmful pesticides or chemicals." },
              { icon: <Award size={40} strokeWidth={1.5} />, title: "Premium Quality", desc: "Top grade livestock and vegetables." },
              { icon: <Droplets size={40} strokeWidth={1.5} />, title: "Sustainable", desc: "Efficient water and resource management." },
              { icon: <Sun size={40} strokeWidth={1.5} />, title: "State of Art", desc: "Advanced greenhouse technology." },
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                className="metric-card"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
              >
                <div className="metric-icon text-accent">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Marquee Info */}
      <div className="marquee">
        <div className="marquee-content">
          <span>FRESH HARVEST • SUSTAINABLE FARMING • PREMIUM LIVESTOCK • ORGANIC VEGETABLES •</span>
          <span>FRESH HARVEST • SUSTAINABLE FARMING • PREMIUM LIVESTOCK • ORGANIC VEGETABLES •</span>
        </div>
      </div>

      {/* Products Showcase - Image Carousel */}
      <section className="products-section" id="products">
        <div className="container">
          <div className="section-header">
            <h2>Our Produce <br/>& Livestock</h2>
            <p>We pride ourselves on delivering the finest cuts of meat and the freshest organic vegetables, straight from our rich soils to your table.</p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, Mousewheel]}
            spaceBetween={30}
            slidesPerView={1}
            speed={1000}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.5 },
              1440: { slidesPerView: 3.5 }
            }}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: true }}
            grabCursor={true}
            className="products-swiper"
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="product-card">
                  <div className="product-image-wrapper">
                    <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
                    <div className="product-overlay"></div>
                  </div>
                  <div className="product-content">
                    <span className="product-category">{product.category}</span>
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-desc">{product.desc}</p>
                    <button className="icon-btn">
                       <ArrowRight size={20} className="arrow-icon" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Farm Life Split Section */}
      <section className="split-section overflow-hidden">
        <div className="split-wrapper">
          <motion.div 
            className="split-image-container"
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-10%" }}
          >
            <img src="/assets/Images/Cassava/Cassava-6.jpeg" alt="Cassava Farming" />
          </motion.div>
          <div className="split-content bg-green-dark">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-10%" }}
            >
              <h2>Cultivating<br/>Excellence.</h2>
              <p>
                From vast cassava fields to modern greenhouse setups, Preshio Farms integrates traditional farming wisdom with modern agricultural technology.
              </p>
              <ul className="check-list">
                <li><ArrowRight size={16} /> Efficient and sustainable farming practices</li>
                <li><ArrowRight size={16} /> State-of-the-art greenhouse facilities</li>
                <li><ArrowRight size={16} /> Zero-waste farm ecosystem</li>
                <li><ArrowRight size={16} /> Farm logistics and transportation services</li>
              </ul>
              <button className="solid-btn mt-4">Discover Our Process</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Carousel */}
      <section className="gallery-section bg-beige" id="gallery">
        <div className="container">
          <motion.div 
            className="section-header center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
          >
            <h2>Farm Gallery</h2>
            <p className="max-w-2xl mx-auto">A glimpse into the daily life and operations at Preshio Farms.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              loop={true}
              speed={1500}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              className="gallery-swiper"
            >
              {galleryImages.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div className="gallery-image-wrapper">
                    <img src={src} alt="Farm life" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Sticky Section */}
      <section className="cta-section" id="contact">
         <div className="cta-background">
            <img src="/assets/Images/Farm/farm-1.jpeg" alt="Farm aerial" />
            <div className="cta-overlay"></div>
         </div>
         <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
         >
            <h2>Ready to source the best?</h2>
            <p>Partner with us for premium agricultural supplies, from robust livestock to pristine vegetables.</p>
            <div className="cta-buttons">
              <button className="solid-btn">Partner With Us</button>
              <button className="outline-btn-white">Download Catalog</button>
            </div>
         </motion.div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-brand-header">
                <Leaf size={32} className="text-accent"/>
                <span className="footer-brand-text">Preshio Farms</span>
              </div>
              <p className="footer-desc">Sustainable agriculture producing the finest quality livestock and vegetables for a healthier tomorrow.</p>
            </div>
            
            <div className="footer-links-col">
              <h4>Explore</h4>
              <ul>
                <li><a href="#products">Products</a></li>
                <li><a href="#our-farm">Our Farm</a></li>
                <li><a href="#gallery">Gallery</a></li>
                {/* <li><a href="#sustainability">Sustainability</a></li> */}
              </ul>
            </div>
            
            <div className="footer-links-col">
              <h4>Contact</h4>
              <ul>
                <li className="flex-center-icon"><MapPin size={16}/>Alero Agbor, Delta State</li>
                <li>ebadeprecious@gmail.com</li>
                <li>+234 (81) 6016 2471</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Preshio Farms. All Rights Reserved.</p>
            <div className="social-links">
               <a href="#"><Instagram size={20}/></a>
               <a href="#"><Twitter size={20}/></a>
               <a href="#"><Linkedin size={20}/></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
