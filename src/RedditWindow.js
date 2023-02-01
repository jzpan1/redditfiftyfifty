import { useState, useEffect } from 'react';
import axios from "axios";
import SubField from './components/SubField.js'

const RedditWindow = () => {
	const [subreddits, setSubs] = useState([""])
	const [redditContent, setRedditContent] = useState('')
	const [history, setHistory] = useState([])
	const [altText, setAlt] = useState("Click the reload button")

	const loadRedditPost = async () => {
		setRedditContent('')
		setAlt("Loading...")
		setRedditContent( await getImgUrl( subreddits[Math.floor(Math.random()*subreddits.length)] ));
	}

	const changeSubreddit = (index, value) => {
		let newSubs = subreddits.slice();
		newSubs[index] = value;
		setSubs(newSubs);
	}

	const generateSubFields = () => {	
		return (
			<>
			{
				subreddits.map( 
					(sub, ind) => <SubField onChange={(index, value) => changeSubreddit(index, value)} key={ind} index={ind} val={sub} />
				)
			}
			</>
		)
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
				{generateSubFields()}
				<br/>
				<button onClick={() => {setSubs(subreddits.concat([""]))}}>+</button>
				<button onClick={() => {setSubs(subreddits.slice(0, -1))}}>-</button>
				<button onClick={() => {loadRedditPost()}}>Reload</button>
			</div>
			<div className="image-container">
				<img src={ redditContent } alt={altText} />
			</div>
		</div>
	);
}
export default RedditWindow;