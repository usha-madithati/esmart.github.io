import React, { useState } from 'react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { question: 'How can I add a new product using a user dashoard?', answer: 'You can login using the dashboard after the loggin in into your account. By going through the user dashboard and going through the interface of adding new product.' },
    { question: 'How can I get notified and adjust the notification duration?', answer: 'You can go to the `Notified`` option and select the notification duration, such as how often you need it (e.g., every 3 days or 5 days), and you will get notified accordingly.' },
    { question: 'How can I scan my product QR code?', answer: 'You can go to the `Scan QR` page and scan your QR code, but remember your QR code should include the manufacturing date, expiry date, and product name.' },
    {
      "question": "Can I contribute to this page?",
      "answer": 'Yes, of course! Here is the repository: https://github.com/usha-madithati/esmart.github.io'
    }
    
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div
                className="flex items-center justify-between px-6 py-4 bg-muted cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                  type="button"
                  aria-controls={`faq-${index}`}
                  aria-expanded={openIndex === index}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d={openIndex === index ? 'M6 9l6 6 6-6' : 'M5 12h14'}></path>
                  </svg>
                </button>
              </div>
              <div
                id={`faq-${index}`}
                className={`px-6 py-4 bg-background ${openIndex === index ? 'block' : 'hidden'}`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
