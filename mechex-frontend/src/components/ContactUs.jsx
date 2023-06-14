import React from "react"
import Sidebar from "./Sidebar"


function ContactUs() {
    return(
        <div>
            <Sidebar />
            <section>
				<h2>Contact Us</h2>
				<p>Email: info@company.com</p>
				<p>Phone: 555-1234</p>
				<p>Address: 123 Main St, Anytown, USA</p>
			</section>
        </div>
    )
}
export default ContactUs