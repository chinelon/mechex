import React from 'react';
import '../assets/About.css';
import Sidebar from './Sidebar';

function About() {
	return (
		<div className="about-page">
			<Sidebar />
			<h1>About Us</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius enim eget nunc efficitur, sed consequat enim euismod. Aliquam gravida sapien non dolor varius, sit amet ultrices massa elementum. Suspendisse feugiat libero quis velit bibendum, ut molestie augue vestibulum.</p>
			<section>
				<h2>Our Story</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper, risus a pulvinar porttitor, massa turpis accumsan velit, eu iaculis sapien odio in magna.</p>
			</section>
			<section>
				<h2>Our Team</h2>
				<ul>
					<li>John Doe - CEO</li>
					<li>Jane Smith - CFO</li>
					<li>Bob Johnson - CTO</li>
				</ul>
			</section>
			
		</div>
	);
}

export default About;