import React from 'react'
import './Management.css'
import image1 from '../../assets/real_time.png'
import image2 from '../../assets/tracking.png'
import image3 from '../../assets/reports.png'
function Management() {
    const management_data = [
        { image: image1, heading: "real-time updates", description: "Stay on top of your product inventory with real-time data and insights." },
        
        { image: image2, heading: "automated tracking", description: "Utilize our advanced tracking system to monitor your products and sales effortlessly." },
        
        { image: image3, heading: "customizable reports", description: "Generate detailed reports to analyze your product performance and make informed decisions." },
        
    ]
  return (
      <div className='management_main '>
          <div className="management_heading">
              <h1 className='font'>manage you product inventory</h1>
          </div>
          <div className="content">
              {management_data.map((items, index) => (
                  <div key={index} className="m_elem">
                  <div className="m_left">
                      <img src={items.image} alt="" />
                  </div>
                  <div className="m_right">
                          <h1 className='font'>{ items.heading}</h1>
                          <p className='font'>{ items.description}</p>
                  </div>
              </div>
             ))}
          </div>
    </div>
  )
}

export default Management