import React from "react"
import Sidebar from "./Sidebar"


function ContactUs() {
    return (
        <div className="contact-us-container">
      <Sidebar />
      <section className="contact-us-section">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <p>
            <strong>Email:</strong> chinelo.nwobbi@pau.edu.ng
          </p>
          <p>
            <strong>Phone:</strong> 09060626465
          </p>
          <p>
            <strong>Address:</strong> Pan-Atlantic University, Ibeju-Lekki
          </p>
        </div>
      </section>
    </div>
    )
}
export default ContactUs