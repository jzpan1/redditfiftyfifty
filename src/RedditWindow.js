import { useState, useEffect } from 'react';
import axios from "axios";
import SubField from './components/SubField.js';
import './RedditWindow.css';
import RedditContent from './components/RedditContent';
import AboutPopup from './components/AboutPopup';

const subpairs = [	
	["ManHands", "Feet"],
	["funny", "creepy"],
	["oddlysatisfying", "oddlyterrifying"],
	["mildyinteresting", "mildlyinfuriating"],
	["eyebleach", "makemesuffer"],
	["comedyheaven", "comedycemetery"],
	["unexpected", "maybemaybemaybe"],
	["whatcouldgowrong", "nonononoyes"],
	["niceguys", "nicegirls"],
	["PeopleFuckingDying", "watchpeoplesurvive"],
	["me_irl", "meirl"],
	["AbruptChaos", "GradualChaos"],
	["pics", "memes"],
	["blessedimages", "cursedimages"],
	["ratemypoo", "pee"],
	["ankmemes", "kneesurgerymemes"],
	["crabseatingthings", "treessuckingonthings", "SEUT"],
	["enlightenedbirdmen", "madmudmen"],
	["catsstandingup", "wolveswithwatermelons"],
	["facepalm", "murderedbywords"],
	["rareinsults", "iamverysmart"],
	["blackpeopletwitter", "whitepeopletwitter"],
	["insanepeoplefacebook", "insanepeoplequora"],
	["designporn", "crappydesign"],
	["humansbeingbros", "trashy"],
	["natureisfuckinglit", "natureismetal"],
	["AnimalsBeingDerps", "AnimalsBeingJerks"],
	["awww", "popping"],
	["shitposting", "funny"],
	["blunderyears", "OldSchoolCool"],
	["CozyPlaces", "LiminalSpace"],
	["memes", "antimeme"],
	["FoodPorn", "shittyfoodporn"],
	["EarthPorn", "shittyearthporn"],
	
];

const RedditWindow = () => {	
	const suggestSubreddits = () => {
		return subpairs[Math.floor(Math.random()*subpairs.length)];
	}
	const [subreddits, setSubs] = useState(suggestSubreddits());
	const [redditContent, setRedditContent] = useState({url:""});
	const [history, setHistory] = useState([]);
	const [altText, setAlt] = useState("Click the Find button or press Enter");;

	

	const loadRedditPost = async () => {
		setRedditContent({url: ""});
		setAlt("Searching...");
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
					(sub, ind) => 
						<SubField 
							onChange=
							{(index, value) => changeSubreddit(index, value)} 
							key={ind} 
							index={ind} 
							val={sub} 
							/>
				)
			}
			</>
		)
	}
	
	const getImgUrl = async (subreddit, recurseCount=0) => {
		let contentUrl = "";
		let response;
		console.log(recurseCount);
		if (recurseCount>4) {
			setAlt("no media found :(")
			return {url: ""};
		}

		try {
			response = await axios.get("https://www.reddit.com/r/" + subreddit.replace("r/", "") + "/random.json")
		}
		catch(error) {
			setAlt("couldn't find any media, are you sure that's a subreddit?")
			if (subreddit.replace("r/", "") === "")
			{
				response = await axios.get("https://www.reddit.com//random.json")
			}
			console.log(error);
			return {url: ""};
		}

		let child = 0;
		if (Array.isArray(response.data)) {
			for (const index in response.data) {
				let listing = response.data[index];
				for (const childInd in listing.data.children) {
					child = listing.data.children[childInd].data;
					try {
						contentUrl = child.url;
						if (contentUrl.includes("v.redd.it"))
						{
							contentUrl = child.secure_media.reddit_video.fallback_url;
						}
						if (contentUrl != "" && !history.includes(contentUrl))
						{
							break;
						}
					}
					catch (error) {
						continue;
					}
				}
				if (contentUrl != "" && !history.includes(contentUrl))
				{
					break;
				}
			}
		}
		else {
			for (const childInd in response.data.data.children) {
				child = response.data.data.children[childInd].data;
				try {
					contentUrl = child.url;
					if (contentUrl.includes("v.redd.it"))
					{
						contentUrl = child.secure_media.reddit_video.fallback_url;
					}
					if (contentUrl != "" && !history.includes(contentUrl))
					{
						break;
					}
				}
				catch (error) {
					continue
				}
			}
		}
		if (!contentUrl) {
			return await getImgUrl(subreddit, recurseCount+1)
		}
		if (contentUrl.includes("reddit.com")) {
			return await getImgUrl(subreddit, recurseCount+1)
		}
		else if (contentUrl === "") {
			setAlt("no content found, are you sure that subreddit has multimedia content?");
		}
		else {
			setHistory(history.concat([contentUrl]));
			setAlt("media can't be loaded :(");
		}
		
		return child;
	}

	return (
		<div className="reddit-window">
			<AboutPopup />
			<form onSubmit={(e) => {e.preventDefault(); loadRedditPost();}} >
				{generateSubFields()}
				<br/>
				<button type="button" className="about-popup-toggle" title="What is this website`?" onClick={
					()=> document.getElementById("about-popup").classList.toggle("show")
					}>❓</button>
				<button type="button" className="suggest-subs" title="Suggest 2 subreddits" onClick={()=> {setSubs(suggestSubreddits());}}>🎲</button>
				<button type="button" className="nightmode-toggle" title="Toggle night mode" onClick={()=> document.body.classList.toggle("night")}>🌃</button>
				<button type="button" title="Add a subreddit" onClick={() => {setSubs(subreddits.concat([""]))}}>➕</button>
				<button type="button" title="Remove a subreddit" onClick={() => {setSubs(subreddits.slice(0, -1))}}>➖</button>
				<button type="submit" >Find!</button>
			</form>
			<div className="content-container">
				<RedditContent src= { redditContent.url } data={ redditContent } alt={altText}/>
				<br/>
				{redditContent.url === "" ?
				null :
				<a href= {"https://www.reddit.com" + redditContent.permalink} target="_blank"> Post link </a>}
			</div>
		</div>
	);
}
export default RedditWindow;
