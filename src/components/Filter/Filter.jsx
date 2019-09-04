import React from "react";

const Filter = ({ genres }) => {
	const onOptionClick = (e) => {
		console.log(e.target.value);
	}
	return (
		<div>
			Filter by
			<span>
				<select>
					<option value="genre">genre</option>
				</select>
				<select onChange={onOptionClick}>
					{genres.map((g, i) => (<option key={i} value={g}>{g}</option>))}
				</select>
			</span>
		</div>
	);
}

export { Filter };
