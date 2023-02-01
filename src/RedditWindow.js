import { useState, useEffect } from 'react';
import axios from "axios";

const RedditWindow = () => {
	const [subreddit1, setSub1] = useState('cursedimages')
	const [subreddit2, setSub2] = useState('eyebleach')
	const [redditContent, setRedditContent] = useState('')
	const [history, setHistory] = useState([])
	const [altText, setAlt] = useState("Click the reload button")

	// useEffect( () => {
	// 	fetchAuthorization()
	// }
	// )

	// const fetchAuthorization = async () => {
	// 	console.log("ahhh");
	// 	axios.defaults.headers.common['Access-Control-Allow-Origin'] =  '*';
	// 	const response = await axios.post(
	// 		'https://www.reddit.com/?grant_type=password&username=dedshadow&password=pan,james', 
	// 		{user: "7491ahn1EGbJq_1JyDb2Zg", crossdomain: true}
	// 	)

	// 	axios.defaults.headers.common['Authorization'] = `Bearer ${response.data["access token"]}`
	// 	axios.defaults.headers.common['User-Agent'] = "RedditFiftyFifty/0.1 by dedshadow"
	// 	console.log(response.data);
	// }
	const loadRedditPost = async () => {
		setRedditContent('')
		setAlt("Loading...")
		if (Math.random() < 0.5) {
			setRedditContent( await getImgUrl(subreddit1) );
		}
		else {
			setRedditContent( await getImgUrl(subreddit2) );
		}
	}
	
	const getImgUrl = async (subreddit, recurseCount=0) => {
		let url = "";
		let response;
		if (recurseCount>9) {
			setAlt("couldn't find image :(")
			return url
		}
		try {
			response = await axios.get("https://www.reddit.com/r/" + subreddit + "/random.json")
		}
		catch(error) {
			setAlt("couldn't find images :( \n are you sure that's a subreddit?")
			console.log(error)
			return url
		}
		if (Array.isArray(response.data)) {
			for (const index in response.data) {
				let listing = response.data[index]
				for (const childInd in listing.data.children) {
					let child = listing.data.children[childInd]
					try {
						url = child.data.preview.images[0].resolutions.slice(-1)[0].url.replace('preview', 'i')
						if (url != "" && !history.includes(url))
						{
							break
						}
					}
					catch (error) {
						continue
					}
				}
				if (url != "" && !history.includes(url))
				{
					break
				}
			}
		}
		else {
			for (const childInd in response.data.data.children) {
				let child = response.data.data.children[childInd]
				try {
					url = child.data.preview.images[0].resolutions.slice(-1)[0].url.replace('preview', 'i')
					if (url != "" && !history.includes(url))
					{
						break
					}
				}
				catch (error) {
					continue
				}
			}
		}
		if (url.includes("external-i")) {return await getImgUrl(subreddit, recurseCount+1)}
		setHistory(history.concat([url]))
		setAlt("couldn't find image :(")
		return url;
	}

	return (
		<div className="reddit-window">
			<div className="form">
				<input 
					className="input"
					type="text"
					placeholder="Subreddit 1"
					value={ subreddit1 }
					onChange={ (e) => setSub1(e.target.value) }
				/>
				<input 
					className="input"
					type="text"
					placeholder="Subreddit 2"
					value={ subreddit2 }
					onChange={ (e) => setSub2(e.target.value) }
				/>
				<button onClick={() => {loadRedditPost()}}>Reload</button>
			</div>
			<div className="image-container">
				<img src={ redditContent } alt={altText} />
			</div>
			
		</div>
	);
}
export default RedditWindow;