import { useState, useEffect } from 'react';
import './AboutPopup.css'
const AboutPopup = (props) => {
	const [collapsed, setCollapse] = useState(true);

	const toggleCollapse = () => {
		setCollapse(!collapsed);
	}

	return(
		<div className="about-popup" id="about-popup">
			<button className="about-popup-close" onClick={
					()=> document.getElementById("about-popup").classList.toggle("show")
					}>X</button>
			<h1>How to use</h1>
			<p>This app allows you to view media selected randomly from provided subreddits. Put in the name of two or more subreddits, click find, and enjoy (or suffer)!</p>

			<h1>Controls</h1>
			<ul className="controls">
				<li>🎲 - get subreddit suggestions (removes current subs)</li>
				<li>🌃 - toggle night mode</li>
				<li>➕, ➖ - add or remove subreddits</li>
			</ul>

			<h1 className="notes-toggle" onClick={ ()=> {toggleCollapse()} }>  {collapsed ? "Notes and Warnings ▶" : "Notes and Warnings ▼"} </h1>
			{collapsed ?
				null :
				<ul className="notes-and-warnings">
					<li>There are <strong>no warnings or restrictions for most NSFW subs</strong>; However, NSFL subs such as MedicalGore are completely blocked (by reddit, not me)</li>
					<li>Sound is not available yet</li>
					<li>Many embed options are not implemented yet, notably imgur and redgifs</li>
				</ul>
			}
		</div>
	)
}

export default AboutPopup;