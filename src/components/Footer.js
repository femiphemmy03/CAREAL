import React from 'react';
import './Footer.css';
// import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the Careal community to receive our best service deals
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <button buttonStyle='btn--outline'>Subscribe</button>
          </form>
        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/sign-up'>How it works</Link>
            <Link to='/'>Testimonials</Link>
            <Link to='/'>Careers</Link>
            <Link to='/'>Investors</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
            <Link to='/'>Destinations</Link>
            <Link to='/'>Sponsorships</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Videos</h2>
            <Link to='/'>Submit Video</Link>
            <Link to='/'>Ambassadors</Link>
            <Link to='/'>Agency</Link>
            <Link to='/'>Influencer</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='https://www.linkedin.com/in/michaelbassey' target="_blank">Linkedin</Link>
            <Link to='https://www.instagram.com/slick' target="_blank">Instagram</Link>
            <Link to='https://www.facebook.com/mieleco' target="_blank">Facebook</Link>
            <Link to='https://m.youtube.com/channel/UC1IF-GjAt9nsxhlYMAcCOtA' target="_blank">Youtube</Link>
            <Link to='https://mobile.twitter.com/michaelbazze' target="_blank">Twitter</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              Careal
              <img
                src={`${process.env.PUBLIC_URL}/images/img-5.jpg`}
                alt="Careal logo"
                style={{
                  width: '30px',
                  height: '30px',
                  }}
              />
            </Link>
          </div>
          <small class='website-rights'>Careal © 2025</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link linkedin'
              to='https://www.linkedin.com/in/michaelbassey'
              target='_blank'
              aria-label='Linkedin'
            >
              <i class='fab fa-linkedin' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='https://www.instagram.com/slicktechub'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link facebook'
              to='https://www.facebook.com/mieleco'
              target='_blank'
              aria-label='Facebook' 
            >
              <i class='fab fa-facebook-f' />
            </Link>

            <Link
              class='social-icon-link youtube'
              to='https://m.youtube.com/channel/UC1IF-GjAt9nsxhlYMAcCOtA'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            
            <Link
              class='social-icon-link twitter'
              to='https://mobile.twitter.com/michaelbazze'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;