const RedditContent = (props) => {
	if (props.src.includes("v.redd.it")) {
		return (
			<video controls autoplay className="reddit-content">
				<source src={props.src} />
				<source src={props.src.split("/DASH")[0] + "/audio"} />
			</video>
		)
	}
	if (props.src.includes("youtu.be") || props.src.includes("youtube.com") ) {
		return (
			<iframe title="external embed" src={props.src
				.replace("youtube.com/watch?v=", "youtube.com/embed/")
				.replace("youtu.be", "youtube.com/embed")
			} />
		)
	}
	if (props.src.includes("gfycat")) {
		return (
			<iframe title="external embed" src={props.src.replace("gfycat.com", "gfycat.com/ifr")} />
		)
	}
	return (
		<img className="reddit-content" src={props.src} alt={props.alt}/>
	)
}
export default RedditContent;