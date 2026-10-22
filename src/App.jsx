import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const phoneNumber = '919876543210';
const mapQuery = encodeURIComponent('42 Indiranagar 100ft Rd, Bengaluru, Karnataka');
const mapDirections = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
const reservationMessage = encodeURIComponent(
  'Hello NOVA BITES, I would like to reserve a table. Please share the available timings.'
);

const dishes = [
  {
    id: 1,
    name: 'The Double Trouble',
    category: 'Signature Burgers',
    type: 'Chef’s Special',
    dietary: 'Non-veg',
    description: 'Two seared patties, aged cheddar, house pickles and a slow-built burger sauce.',
    price: '₹495',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=85',    note: 'A house favourite',
  },
  {
    id: 2,
    name: 'Sunday Pepperoni',
    category: 'Artisanal Pizzas',
    type: 'Wood-fired style',
    dietary: 'Non-veg',
    description: 'Slow tomato, fior di latte, pepperoni and a finishing drizzle of chilli oil.',
    price: '₹625',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=88',
    alt: 'Artisanal pizza with bubbling cheese and fresh toppings',
    note: 'Made to share',
  },
  {
    id: 3,
    name: 'Garden After Rain',
    category: 'Artisanal Pizzas',
    type: 'Vegetarian',
    dietary: 'Veg',
    description: 'Roasted mushrooms, basil, mozzarella and a bright, herb-finished tomato base.',
    price: '₹545',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1000&q=88',
    alt: 'Fresh vegetarian pizza with herbs and melted cheese',
    note: 'Garden inspired',
  },
  {
    id: 4,
    name: 'The Golden Crunch',
    category: 'Signature Burgers',
    type: 'Vegetarian',
    dietary: 'Veg',
    description: 'Crisp potato patty, smoked cheese, lettuce and a tangy house-made relish.',
    price: '₹395',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1000&q=85',    alt: 'Gourmet vegetarian burger served with crisp fries',
    note: 'A little indulgence',
  },
  {
    id: 5,
    name: 'Midnight Cocoa',
    category: 'Craft Drinks',
    type: 'House blend',
    dietary: 'Veg',
    description: 'Dark cocoa, chilled milk and a soft cloud of cream, finished without hurry.',
    price: '₹265',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=88',
    alt: 'Rich chocolate shake topped with chocolate and cream',
    note: 'Sweet finish',
  },
  {
    id: 6,
    name: 'Citrus & Thyme',
    category: 'Craft Drinks',
    type: 'Zero proof',
    dietary: 'Veg',
    description: 'Fresh citrus, garden thyme and sparkling water over hand-cut ice.',
    price: '₹225',
    image: '/citrus-drink.jpg.jpg',    
    note: 'Bright and botanical',
  },
];

const tabs = ['All', 'Signature Burgers', 'Artisanal Pizzas', 'Craft Drinks'];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>;
}

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="NOVA BITES home">
      <span className="brand-mark">N<span>.</span></span>
      <span className="brand-name">NOVA <span>BITES</span></span>
    </a>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('All');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const filteredDishes = useMemo(
    () => activeTab === 'All' ? dishes : dishes.filter((dish) => dish.category === activeTab),
    [activeTab]
  );

  const reserveUrl = `https://wa.me/${phoneNumber}?text=${reservationMessage}`;
  const enquiryUrl = (dishName = '') => {
    const message = dishName
      ? `Hello NOVA BITES, I'd love to know more about ${dishName}.`
      : 'Hello NOVA BITES, please share your menu and reservation availability.';
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  function handleNewsletterSubmit(event) {
    event.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterMessage('Please enter a valid email address.');
      return;
    }
    setNewsletterMessage('Thank you. You’re on our list for the next good thing.');
    setEmail('');
  }

  function closeMenu() {
    setMobileOpen(false);
  }

  return (
    <div className="site-shell">
      <div className="top-note">
        <span>48-HOUR FERMENTATION DOUGH · LOCALLY SOURCED PRODUCE</span>
        <a href={mapDirections} target="_blank" rel="noreferrer">INDIRANAGAR, BENGALURU <Arrow diagonal /></a>
      </div>

      <header className="floating-header">
        <Brand />
        <button
          type="button"
          className={`mobile-toggle ${mobileOpen ? 'open' : ''}`}
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
        <nav className={`navigation ${mobileOpen ? 'navigation-open' : ''}`} aria-label="Main navigation">
          <a href="#menu" onClick={closeMenu}>The menu</a>
          <a href="#story" onClick={closeMenu}>Our philosophy</a>
          <a href="#visit" onClick={closeMenu}>Find us</a>
          <a className="nav-reserve" href={reserveUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
            Reserve a table <Arrow diagonal />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <motion.div className="hero-copy" initial="hidden" animate="visible" variants={stagger}>
            <motion.p className="eyebrow" variants={reveal}><span className="eyebrow-rule" /> A TABLE WORTH COMING BACK TO</motion.p>
            <motion.h1 variants={reveal}>A little<br />more <em>extraordinary.</em></motion.h1>
            <motion.p className="hero-intro" variants={reveal}>
              48-hour fermented dough. Locally sourced produce. Hand-smashed patties, seared to order. Good food, with nothing rushed.
            </motion.p>
            <motion.div className="hero-actions" variants={reveal}>
              <a className="button button-copper" href="#menu">Explore the menu <Arrow diagonal /></a>
              <a className="underlined-link" href="#story">The NOVA story <Arrow /></a>
            </motion.div>
            <motion.div className="hero-signoff" variants={reveal}>
              <span className="signoff-star">✳</span>
              <span>Made with intention.<br /><strong>Built around the flavour.</strong></span>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-media"
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1500&q=90"
                alt="NOVA BITES signature double cheeseburger with house sauce"
                fetchPriority="high"
              />
              <div className="hero-image-vignette" />
              <div className="hero-badge"><span>THE NOVA</span><strong>House<br />favourite</strong><span>MADE FRESH</span></div>
              <div className="hero-image-foot"><span>01 / FROM OUR KITCHEN</span><span>SEASONED WITH CARE</span></div>
            </div>
            <div className="hero-caption">
              <span className="caption-label">THE SIGNATURE BURGER</span>
              <span>Unhurried. Uncompromising. Unforgettable.</span>
            </div>
          </motion.div>
          <div className="hero-vertical-note" aria-hidden="true">GOOD TASTE IS NEVER RUSHED</div>
        </section>

        <section className="marquee" aria-label="NOVA BITES philosophy">
          <div className="marquee-track">
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={index}>GOOD INGREDIENTS <b>✳</b> A LITTLE CURIOSITY <b>✳</b> ALWAYS ROOM AT THE TABLE <b>✳</b></span>
            ))}
          </div>
        </section>

        <section className="menu-section section-pad" id="menu">
          <motion.div className="section-kicker reveal" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
            <p className="eyebrow"><span className="eyebrow-rule" /> FROM THE KITCHEN</p>
          <span className="menu-category-tag">CURATED MENU</span>          </motion.div>
          <motion.div className="menu-intro reveal" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal}>
          <h2>Crafted for Flavor.</h2>            <p>Seasonal touches, considered combinations and familiar favourites with a little more thought behind every bite.</p>
          </motion.div>

          <div className="menu-tabs" role="tablist" aria-label="Filter dishes">
            {tabs.map((tab) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                className={`menu-tab ${activeTab === tab ? 'active' : ''}`}
                key={tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <motion.div className="dish-grid" layout>
            <AnimatePresence mode="popLayout">
              {filteredDishes.map((dish) => (
                <motion.article
                  className="dish-card"
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <a className="dish-image" href={enquiryUrl(dish.name)} target="_blank" rel="noreferrer" aria-label={`Enquire about ${dish.name}`}>
                    <img src={dish.image} alt={dish.alt} loading="lazy" />
                    <span className="dish-note">{dish.note}</span>
                    <span className="dish-image-arrow"><Arrow diagonal /></span>
                  </a>
                  <div className="dish-meta">
                    <span className={`diet-tag ${dish.dietary === 'Veg' ? 'veg' : 'nonveg'}`}>
                      {dish.dietary === 'Veg' ? 'VEG' : 'CHEF’S PICK'}
                    </span>
                    <span>{dish.type}</span>
                  </div>
                  <div className="dish-title-row">
                    <h3>{dish.name}</h3>
                    <span className="dish-price">{dish.price}</span>
                  </div>
                  <p className="dish-description">{dish.description}</p>
                  <a className="dish-link" href={enquiryUrl(dish.name)} target="_blank" rel="noreferrer">Ask about this dish <Arrow /></a>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
          <div className="menu-bottom-note"><span className="note-rule" /> Please let our team know about dietary requirements or allergies when ordering.</div>
        </section>

        <section className="philosophy-section" id="story">
          <motion.div className="philosophy-image" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal}>
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=88"
              alt="Warm, intimate restaurant interior set for an evening meal"
              loading="lazy"
            />
            <div className="image-overlay-caption"><span>THE ART OF TAKING YOUR TIME</span><span>EST. WITH HEART</span></div>
          </motion.div>
          <motion.div className="philosophy-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger}>
            <motion.p className="eyebrow" variants={reveal}><span className="eyebrow-rule" /> OUR PHILOSOPHY</motion.p>
            <motion.h2 variants={reveal}>Good food is<br /><em>never just food.</em></motion.h2>
            <motion.p className="body-copy" variants={reveal}>
              It is the first bite after a long day. The extra plate nobody planned to order. The conversation that lasts a little longer because nobody wants to leave.
            </motion.p>
            <motion.p className="body-copy" variants={reveal}>
              At NOVA BITES, we bring care to the details — from the ingredients we choose to the way a table feels when you settle in. Come for the food. Stay for the feeling.
            </motion.p>
            <motion.a className="button button-outline" href="#visit" variants={reveal}>Find your table <Arrow diagonal /></motion.a>
            <motion.div className="signature" variants={reveal}>With care, from our kitchen<span>NOVA BITES</span></motion.div>
          </motion.div>
        </section>

        <section className="visit-section section-pad" id="visit">
          <motion.div className="visit-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
            <p className="eyebrow"><span className="eyebrow-rule" /> COME ON IN</p>
            <h2>There’s a place<br /><em>for you here.</em></h2>
          </motion.div>

          <motion.div className="visit-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal}>
            <div className="visit-info">
              <div className="visit-block">
                <span className="visit-label">FIND US</span>
                <h3>42 Indiranagar 100ft Rd</h3>
                <p>Bengaluru, Karnataka</p>
                <a className="text-arrow" href={mapDirections} target="_blank" rel="noreferrer">Get directions <Arrow diagonal /></a>
              </div>
              <div className="visit-block">
                <span className="visit-label">OPENING HOURS</span>
                <div className="hours-row"><span>Tuesday – Sunday</span><strong>12:00 PM – 11:30 PM</strong></div>
                <div className="hours-row"><span>Monday</span><strong>Closed</strong></div>
              </div>
              <div className="visit-block">
                <span className="visit-label">RESERVATIONS & ENQUIRIES</span>
                <a className="phone-link" href={`tel:+${phoneNumber}`}>+91 98765 43210</a>
                <a className="text-arrow" href={reserveUrl} target="_blank" rel="noreferrer">Reserve a table on WhatsApp <Arrow diagonal /></a>
              </div>
            </div>
            <div className="map-panel">
              <div className="map-topline"><span className="map-live-dot" /> FIND NOVA BITES <a href={mapDirections} target="_blank" rel="noreferrer">OPEN MAP ↗</a></div>
              <iframe
                title="Map showing NOVA BITES near Indiranagar 100 Feet Road, Bengaluru"
                src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="map-caption"><span>INDIRANAGAR, BENGALURU</span><span>12°58′ N · 77°38′ E</span></div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand-col">
            <Brand />
            <p>Thoughtfully made.<br />Beautifully served.</p>
            <div className="social-links">
              <a href={mapDirections} target="_blank" rel="noreferrer">Google Maps <Arrow diagonal /></a>
              <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noreferrer">WhatsApp <Arrow diagonal /></a>
            </div>
          </div>
          <div className="footer-links">
            <span className="footer-heading">EXPLORE</span>
            <a href="#menu">The menu</a>
            <a href="#story">Our philosophy</a>
            <a href="#visit">Location & hours</a>
            <a href={reserveUrl} target="_blank" rel="noreferrer">Reserve a table</a>
          </div>
          <div className="newsletter">
            <span className="footer-heading">A NOTE FROM NOVA</span>
            <h3>Good things, occasionally.</h3>
            <p>Seasonal specials, new favourites and little reasons to come by.</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit} noValidate>
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setNewsletterMessage('');
                }}
                placeholder="Your email address"
                autoComplete="email"
                required
              />
              <button type="submit" aria-label="Subscribe to the newsletter"><Arrow diagonal /></button>
            </form>
            <p className={`newsletter-message ${newsletterMessage ? 'shown' : ''}`} aria-live="polite">{newsletterMessage}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NOVA BITES. ALL RIGHTS RESERVED.</span>
          <a href="#home">BACK TO THE BEGINNING ↑</a>
          <span>MADE WITH CARE IN BENGALURU.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
