const RedditContent = (props) => {
	if (props.src.includes("v.redd.it")) {
		let url = null;
		try {
			url = props.data.secure_media.reddit_video.fallback_url;
		} catch (error) {}

		if (url) {
			return (
				<video controls autoplay className="reddit-content">
					<source src={url} />
					<source src={url.split("/DASH")[0] + "/audio"} />
				</video>
			)
		}
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

	if (props.src.includes("https://imgur")) {
		return (
			<>
				<blockquote class="imgur-embed-pub" lang="en" data-id={props.src.split("imgur.com/")[1]}>
					<a href={props.src}></a>
				</blockquote>
				<script async src="//s.imgur.com/min/embed.js" charset="utf-8" />
			</>
		)
	}



	return (
		<img className="reddit-content" src={props.src} alt={props.alt}/>
	)
}
export default RedditContent;
