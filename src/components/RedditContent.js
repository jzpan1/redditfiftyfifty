const RedditContent = (props) => {
	if (props.src.includes("i.reddit")) {
		return (
			<img className="reddit-content" src={props.src} alt={props.alt}/>
		)
	}
	if (props.src.includes("v.reddit")) {
		return (
			<video className="reddit-content" src={props.src + "/DASH_600_K"} />
		)
	}
	if (props.src.includes("youtu.be") || props.src.includes("gfycat")) {
		return (
			<iframe title="external embed" src={props.src.replace("gfycat.com", "gfycat.com/ifr").replace("youtu.be", "youtube.com/embed")} />
		)
	}
	return ( <h1>reddit returned an invalid or unembeddable url</h1>)
}
export default RedditContent;