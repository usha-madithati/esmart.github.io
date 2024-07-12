// FAQs.jsx
import React, { useState } from 'react';
import './FAQs.css';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question:'How Can I Add Product To User Dasboard',
      answer:`You can add a product to your dashboard either by scanning its QR code for automatic data entry on the 'Scan QR' page or by manually entering the product details on the 'Users' page. Both options are available.`,
    },
    {
      question:'How can I get notified and adjust the notification duration?',
      answer: "You can go to the 'Notified' option and select the notification duration, such as how often you need it (e.g., every 3 days or 5 days), and you will get notified accordingly.",
    },
    {
        question:'How can I scan my product QR code?',
        answer:"You can go to the 'Scan QR' page and scan your QR code, but remember your QR code should include the manufacturing date, expiry date, and product name.",
      },
    {
      question:'Can I contribute to this page?',
      answer: (
        <>
          Yes, of course! Here is the repository <a href="https://github.com/usha-madithati/esmart.github.io" className="repo-link" target="_blank" rel="noopener noreferrer"> link</a>.
          <br/>But make sure to follow our contribution rules and regulations before making any contribution.
        </>
      ),
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div id="faqs" className="faqs-container">
      <h2>Frequently Asked Questions</h2>
      <div className="accordion">
        {faqs.map((faq, index) => (
          <div key={index} className="accordion-item">
            <button
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index ? 'true' : 'false'}
            >
                <div>
              <span className="accordion-title">{faq.question}</span>
              <span className="icon" aria-hidden="true"></span>
              </div>
            </button>
            <div className={`accordion-content ${activeIndex === index ? 'active' : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    
    </div>
    
  );
};

export default FAQs;