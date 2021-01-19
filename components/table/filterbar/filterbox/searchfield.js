import { useForm } from "react-hook-form";
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";

import Button from "../../../button";
import useGlobal from "../../../store";



const SearchField = ({reference, filterName, close, level}) => {
	const [, addToFilters] = useGlobal(() => null, actions => actions.addToFilters);
	const { register, handleSubmit, errors } = useForm();

	const add = ({filter}) => {
		let reducedLength;
		if (filter.length < 10) {
			reducedLength = filter;
		} else {
			reducedLength = `${filter.substring(0,8)}..`;
		}
		addToFilters({
			shorthand: {
				filterName,
				value: reducedLength
			},
			value: filter,
			reference,
			level,
			filter: "searchField"
		});
		close();
	};
	return (
		<form onSubmit={handleSubmit(add)} className="searchfield">
			<h2>Zoeken op..</h2>
			<TextField
				id="filter"
				name="filter"
				label="Tekstfilter"
				type="text"
				inputRef={register({required: true})}
				// value={email}
				className="full-width"
				defaultValue={""}
				error={!!errors.filter}
				margin="dense"
				// onChange={e => setEmail(e.target.value)}
			/>
			{errors.filter && <div className="error-message">{"Voer tekst in om te filteren"}</div>}
			<Button
				width={"100%"}
				style={{marginTop: "15px"}}
				type={"submit"}
			>
				Filter toevoegen
			</Button>
			<style jsx>{`
        h2 {
          text-align: left;
          margin: 0;
        }
        .searchfield {
          margin: 7px;
        }
      `}
			</style>
		</form>
	);
};

export default SearchField;
