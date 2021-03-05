import {
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField
} from "@material-ui/core";
import React, {useEffect} from "react";

import { accounts, stati } from "../../config/globalvariables";
import { isNumeric } from "../../lib/custom-hooks";
import { useDeal } from "../../lib/swr-hooks";
import moment from "moment-timezone";













// const useStyles = makeStyles((theme) => ({
// 	formControl: {
// 		margin: theme.spacing(1),
// 		minWidth: 120,
// 	},
// 	selectEmpty: {
// 		// marginTop: theme.spacing(2),
// 	},
// }));


const DealRow = ({theme, conversionMode, conversionRate, number, pk, user, totalReserved, setTotalReserved}) => {
	const {gray_light} = theme;

	const {data, mutate} = useDeal(number, pk);
	useEffect(() => {
	  mutate();
	}, [pk]);
	const {[`customer${number}`]: account, [`customer${number}_deal`]: deal, [`customer${number}_qty`]: qty, [`customer${number}_wk`]: wk, [`customer${number}_status`]: status} = data || {};

	useEffect(() => {
		if (((status === "Plan") || (status === "Confirmed")) && (qty !== "na") && (totalReserved[number-1] !== qty)) {
			const totOf = [...totalReserved];
			totOf[number-1] = qty;
			setTotalReserved(totOf);
		}
	}, [status, qty, totalReserved]);

	const getParams = e => {
		const {name, value} = e.target;
		let val = value;
		if (conversionMode === "CE") {
			switch (name) {
			case "qty":
				val = convert(val, false);
				break;
			case "deal":
				val = convert(val, true);
				break;
			default:
			}
		}
		const col = `customer${number}${name === "account" ? "" : `_${name}`}`;
		return {col, val};
	};

	const localSave = e => {
		const {col, val} = getParams(e);
		mutate({...data, [col]: val}, false);
	};


	const save = async e => {
		const {col, val} = getParams(e);
		try {
			const res = await fetch("/api/data/edit-entry", {
				method: "PATCH",
				body: JSON.stringify({
					id: pk,
					col,
					val,
					usr: `${user.firstName} ${user.lastName}`,
					now: moment(new Date()).tz("Europe/Amsterdam").format()
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			});
			console.log("trying..");
			const json = await res.json();
			if (!res.ok) throw Error(json.message);
			console.log({res});
		} catch (e) {
			throw Error(e.message);
		}
		mutate({...data, [col]: val});
	};

	const convert = (val, multiply) => multiply ?
		(val !== "na" ? (isNumeric(val) ? Math.round(((parseFloat(val) * conversionRate) + Number.EPSILON) * 100) / 100 : (!isNaN(val) ? Math.round(((val * conversionRate) + Number.EPSILON) * 100) / 100 : val)) : "")
		:
		(val !== "na" ? (isNumeric(val) ? Math.round(((parseFloat(val) / conversionRate) + Number.EPSILON) * 100) / 100 : (!isNaN(val) ? Math.round(((val / conversionRate) + Number.EPSILON) * 100) / 100 : val)) : "");

	// const active = whatRowWeOn >= order;
	return (
		<div className="dealrow">
			<div className="dealcell account">
				{data && <FormControl
					margin="dense"
					variant="outlined"
					// className={classes.formControl}
				>
					<InputLabel id={`Accountlabel${number}`}>Account</InputLabel>
					<Select
						labelId={`Account${number}`}
						label={"Account"}
						id={`Account${number}`}
						name="account"
						onChange={save}
						value={account !== "na" ? account : ""}
					>
						{accounts.map(({Name, Id}) => <MenuItem key={Id} value={Id}>{Name}</MenuItem>)}
					</Select>
				</FormControl>}
			</div>
			<div className="dealcell deal">
				{data && <TextField
					label={"Prijs"}
					id={`Prijs${number}`}
					type="number"
					name="deal"
					margin="dense"
					variant="outlined"
					onChange={localSave}
					onBlur={save}
  				onKeyDown={(e) => {e.code === "Enter" && save(e);}}
					InputProps={{
						startAdornment: <InputAdornment position="start">€</InputAdornment>,
						endAdornment: <InputAdornment position="end">{`/${conversionMode}`}</InputAdornment>,
					}}
					value={convert(deal, false)}
				/>}
			</div>
			<div className="dealcell dealquantity">
				{data && <TextField
					label={"Hoeveelheid"}
					id={`Hoeveelheid${number}`}
					name="qty"
					type="number"
					margin="dense"
					variant="outlined"
					onBlur={save}
					onChange={localSave}
					onKeyDown={(e) => {e.code === "Enter" && save(e);}}
					value={convert(qty, true)}
					InputProps={{
						startAdornment: <InputAdornment position="start">{conversionMode}</InputAdornment>,
					}}
				/>
				}
			</div>
			<div className="dealcell dealweek">
				{data && <TextField
					label={"Week"}
					id={`Week${number}`}
					name="wk"
					margin="dense"
					variant="outlined"
					onChange={localSave}
					onBlur={save}
					onKeyDown={(e) => {e.code === "Enter" && save(e);}}
					value={wk !== "na" ? wk : ""}
				/>}
			</div>
			<div className="dealcell dealstatus">
				{data && <FormControl
					margin="dense"
					variant="outlined"
					// className={classes.formControl}
				>
					<InputLabel id={`Statuslabel${number}`}>Status</InputLabel>
					<Select
						labelId={`Status${number}`}
						label={"Status"}
						id={`Status${number}`}
						name="status"
						onChange={save}
						value={status !== "na" ? status : ""}
					>
						{stati.map(el => <MenuItem key={el} value={el}>{el}</MenuItem>)}

					</Select>
				</FormControl>}
			</div>
			{/* <div className="dealcell dealbatches">
				<FormControl
					margin="dense"
					variant="outlined"
					// className={classes.formControl}
				>
					<InputLabel id={`Batcheslabel${number}`}>Batches</InputLabel>
					<Select
						labelId={`Batches${number}`}
						id={`Batches${number}`}
						name={`Batches${number}`}
						label={"Batches"}
						multiple
						variant="outlined"
						value={batches}
						onChange={handleChange}
						// input={<Input variant="outlined" margin="dense"/>}
						renderValue={(selected) => selected.join(", ")}
						// MenuProps={MenuProps}
					>
						<MenuItem value={1}>
							<Checkbox checked={batches.indexOf(1) > -1} />
							<ListItemText primary={1} />
						</MenuItem>
						<MenuItem value={2}>
							<Checkbox checked={batches.indexOf(2) > -1} />
							<ListItemText primary={2} />
						</MenuItem>
						<MenuItem value={3}>
							<Checkbox checked={batches.indexOf(3) > -1} />
							<ListItemText primary={3} />
						</MenuItem>
					</Select>
				</FormControl>
			</div> */}
			<style jsx>{`
      .dealrow {
        display: grid;
        height: 56px;
        grid-template-columns: repeat(5, 1fr);
        border-bottom: 1px solid ${gray_light.color}
      }
      .dealrow:last-child {
        border-bottom: none;
      }
      .dealcell {
        display: inline-grid;
        padding: 0 8px;
      }

    `}</style>
		</div>
	);};

export default DealRow;
