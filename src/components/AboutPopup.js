import './AboutPopup.css'
const AboutPopup = (props) => {
	return(
		<div className="about-popup" id="about-popup">
			<button className="about-popup-close" onClick={
					()=> document.getElementById("about-popup").classList.toggle("show")
					}>X</button>
			<h1>How to use</h1>
			<p>This app allows you to view media selected randomly from provided subreddits. </p>
			<p>Put in the name of two or more subreddits, click find, and enjoy (or suffer)!</p>
		</div>
	)
}

export default AboutPopup;