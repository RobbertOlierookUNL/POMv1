// import { useForm } from "react-hook-form";
import "moment/locale/nl";

import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import MomentUtils from "@date-io/moment";
import React, {useState, useEffect} from "react";
import moment from "moment";

import { staticColors } from "../../../../config/colors";
import Button from "../../../button";
import useGlobal from "../../../store";


const defaultMaterialTheme = createMuiTheme({
	palette: {
		primary: {main: staticColors.primary.color},
	},
});


moment.locale("nl");

const DatePicker = ({reference, filterName, close, level}) => {
	const [, addToFilters] = useGlobal(() => null, actions => actions.addToFilters);
	const [error, setError] = useState(false);
	const [selectedFromDate, setFromDate] = useState(moment());
	const [inputFromValue, setInputFromValue] = useState(moment().format("DD/MM/YY"));
	const [selectedToDate, setToDate] = useState(null);
	const [inputToValue, setInputToValue] = useState(null);

	const onFromDateChange = (date, value) => {
		setError(false);
		setFromDate(date);
		setInputFromValue(value);
	};

	const onToDateChange = (date, value) => {
		setError(false);
		setToDate(date);
		setInputToValue(value);
	};


	const dateFormatter = str => {
		return str;
	};

	const add = (event) => {
		event.preventDefault();
		if (!inputFromValue && !inputToValue) {
			setError(true);
			return;
		}
		const valueString = `${inputFromValue || ".."} \u2013 ${inputToValue || ".."}`;
		addToFilters({
			shorthand: {
				filterName,
				value: valueString,
			},
			value: {
				from: selectedFromDate,
				to: selectedToDate
			},
			reference,
			level,
			filter: "datePicker"
		});
		close && close();
	};

	// useEffect(() => {
	//
	// }, [parameters]);


	return (
		<form onSubmit={add} className="datePicker">
			<h2>Kies een datum bereik</h2>
			<ThemeProvider theme={defaultMaterialTheme}>

				<MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="nl">
					<>
						<KeyboardDatePicker
							autoOk={true}
							showTodayButton={true}
							orientation="landscape"
							error={error}
							// variant="inline"
							label="Vanaf"
							// placeholder="Laat leeg om te negeren"
							value={selectedFromDate}
							format="DD/MM/YY"
 							inputValue={inputFromValue}
							onChange={onFromDateChange}
							rifmFormatter={dateFormatter}
							clearable
							cancelLabel="Annuleren"
							clearLabel="Wissen"
							todayLabel="Vandaag"
						/>
						<br/>
						{error && <div className="error-message">Gebruik tenminste 1 van de 2 datumselecters</div>}

						<KeyboardDatePicker
							autoOk={true}
							showTodayButton={true}
							orientation="landscape"
							error={error}

							// variant="inline"
							label="Tot"
							// placeholder="Laat leeg om te negeren"
							value={selectedToDate}
							format="DD/MM/YY"
 							inputValue={inputToValue}
							onChange={onToDateChange}
							rifmFormatter={dateFormatter}
							clearable
							cancelLabel="Annuleren"
							clearLabel="Wissen"
							todayLabel="Vandaag"
						/>
					</>
				</MuiPickersUtilsProvider>
			</ThemeProvider>

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
          margin: 0 0 12px;
        }
        .datePicker {
          margin: 7px;
        }
      `}
			</style>
		</form>
	);
};

export default DatePicker;
