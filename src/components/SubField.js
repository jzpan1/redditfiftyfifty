const SubField = (props) => {
	return(
		<input
			onChange={(e) => {props.onChange(props.index, e.target.value)}}
			placeholder="subreddit" 
			value={props.val}
			type="text"
			/>
	)
}

export default SubField;