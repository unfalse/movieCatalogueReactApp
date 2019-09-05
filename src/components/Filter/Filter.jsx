import React from "react";

const Filter = ({ genres, onFilter, filterParam }) => {
	const onOptionClick = (e) => {
		window.history.pushState({}, '', `${window.origin}/?filter=${e.target.value}`);
		onFilter();
	}
	return (
		<div>
			Filter by
			<span>
				<select>
					<option value="genre">genre</option>
				</select>
				<select onChange={onOptionClick} defaultValue={filterParam}>
					{genres.map((g, i) => (<option key={i} value={g}>{g}</option>))}
				</select>
			</span>
		</div>
	);
}

export { Filter };
