import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import React, {useState, useEffect, useContext} from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";



import { allOptionsWithData} from "../../../config/viewOptions";
import { useSortableData } from "../../../lib/custom-hooks";
import useGlobal from "../../store";


function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ViewTable = ({data}) => {
	const {view_name, created_at, updated_at, config, ...viewdata} = data || {};
	console.log({viewdata});
	// belangrijk om alle niet-JSON hierboven weg te filteren
	const [dataState, setDataState] = useState({});
	const [allOptions, setAllOptions] = useState(Object.keys(allOptionsWithData));

	useEffect(() => {

		if (config && JSON.parse(config)?.extendable) {
			setAllOptions(Object.keys(allOptionsWithData).filter(o => !allOptionsWithData[o].extendable));
		}
		else {
			setAllOptions(Object.keys(allOptionsWithData));
		}
	}, [config]);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);
	const [showSaved, setShowSaved] = useState(false);
	const [init, setInit] = useState(true);
	const [lastSavedDataState, setLastSavedDataState] = useState({});
	const [myTimeout, setMyTimeout] = useState(0);
	const [primary] = useGlobal(
		state => state.primary,
		() => null
	);
	const [primary_very_light] = useGlobal(
		state => state.primary_very_light,
		() => null
	);
	const [gray_light] = useGlobal(
		state => state.gray_light,
		() => null
	);
	const [gray_very_light] = useGlobal(
		state => state.gray_very_light,
		() => null
	);
	const { keys, requestSort, sortConfig } = useSortableData(dataState, null, false);
	const Router = useRouter();
	const {pathname, query: {view, v: mode,}} = Router;
	const fakedata = new Array(50).fill(".");

	useEffect(() => {
		let _dataState = {};
		Object.keys(viewdata).map(key => {
			_dataState[key] = JSON.parse(viewdata[key]) || {};
			allOptions.map(option => {
				_dataState[key][option] =
					_dataState[key][option] === undefined
						? allOptionsWithData[option].default
						: _dataState[key][option];
			});
		});
		setLastSavedDataState(_dataState);
		setDataState(_dataState);
		setInit(true);
	}, [Object.keys(viewdata)[0]]);

	useEffect(() => {
		if (mode === "duplicated" && Object.keys(dataState)[0]) {
			saveAllData();
		}
	}, [Object.keys(dataState)[0]]);

	const saveAllData = async() => {
		await Object.keys(dataState).forEach(async item => {
			await saveData(item);
		});
		if (Router.query && Router.query.v !== "edit") {
			Router.push({pathname, query: {...Router.query, v: "edit"}});

		}
		setSaved(true);
	};

	const saveData = async (attr) => {
		const value = JSON.stringify(dataState[attr]);
		console.log({value});
		if ((value !== viewdata[attr]) || mode === "duplicated") {
			setSaving(true);
			try {
				console.log("trying..");
				const res = await fetch("/api/view/edit-view", {
					method: "PATCH",
					body: JSON.stringify({
						attr,
						view_name: mode === "duplicated" ? view : view_name,
						value
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8"
					}
				});
				const json = await res.json();
				if (!res.ok) throw Error(json.message);
			} catch (e) {
				throw Error(e.message);
			}
		}
	};

	// const changeAndTimeoutToSave = async (event, attr, option) => {
	// 	if(myTimeout[attr]) {
	// 		clearTimeout(myTimeout[attr]);
	// 	}
	// 	await setDataState({...dataState, [attr]: {...dataState[attr], [option]: event.target.value}});
	// 	console.log(dataState);
	// 	setMyTimeout({...myTimeout, [attr]: setTimeout(() => {
	// 		console.log("saving...");
	// 		saveData(attr);
	// 	}, 5000)});
	// };

	useEffect(() => {
		if (!init) {
			if(myTimeout) {
				clearTimeout(myTimeout);
				console.log("clear");

			}
			setMyTimeout(setTimeout(() => {
				for (const attr in dataState) {
					if (dataState[attr] !== lastSavedDataState[attr]) {
						saveData(attr);
					}
				// setLastSavedDataState(dataState);
				// setSaving(false);
				}
				setLastSavedDataState(dataState);
				setSaved(true);
			}, 5000));
		}
		else {
			setInit(false);
		}
		return function() {
			if(myTimeout) {
				clearTimeout(myTimeout);
			}
		};
	}, [dataState]);

	useEffect(() => {
		if (saved) {
			setTimeout(() => {
				if (saving) {
					setShowSaved(true);

				}
				setSaving(false);
				setSaved(false);
			}, 10);

		}
	}, [saved]);

	useEffect(() => {
		const onKeyDown = e => {
			if(e.ctrlKey && e.which === 83){ // Check for the Ctrl key being pressed, and if the key = [S] (83)
				setSaving(true);
				saveAllData();
				e.preventDefault();
				return false;
			}
		};
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	}, []);

	useEffect(() => {
		const option = allOptions[0];
		requestSort(option,
			typeof allOptionsWithData[option].input === "string" ? allOptionsWithData[option].input : "text" );
	}, []);

	return (
		<>
			<div className="container">
				<table>
					<colgroup>
						<col key={0} span={1} className={"firstcol evencols"} style={{}}/>
						{allOptions.map((h, i) => <col key={i+1} span={1} className={"evencols"}/>)}
					</colgroup>
					<thead>
						<tr>
							<th className="crossdivider" onClick={() => requestSort(null)}>{sortConfig && sortConfig.key && <FontAwesomeIcon icon={faTimes} />}</th>
							{allOptions.map((option, i) =>
								<th key={i} onClick={() => requestSort(option,
									typeof allOptionsWithData[option].input === "string" ? allOptionsWithData[option].input : "text" )}>
									{
										sortConfig && sortConfig.key === option &&
							(
								sortConfig.direction === "ascending" && <FontAwesomeIcon icon={faArrowDown} />
							||
								sortConfig.direction === "descending" && <FontAwesomeIcon icon={faArrowUp} />
							)}
									{option}
								</th>)}
						</tr>
					</thead>
					<tbody>
						{Object.keys(dataState)[0] ?
							keys.map((attribute, i) => (
								<tr key={i}>
									<td key={0} className="firstcol">{attribute}</td>
									{allOptions.map((option, j) =>
										<td key={j+1}>
											{mode === "edit" ?
												<>
													{typeof allOptionsWithData[option].input === "string" ?
														<input
															type={allOptionsWithData[option].input}
															className={"optionInput"}
															value={dataState[attribute] && dataState[attribute][option] ? dataState[attribute][option] : ""}
															placeholder={dataState[attribute] && dataState[attribute][option] === null ? "" : null  }
															onChange={(event) => setDataState({...dataState, [attribute]: {...dataState[attribute], [option]: event.target.value}})}
														// onBlur={() => saveData(attribute)}
														/>
														:
														<select
															className={"optionInput"}
															value={dataState[attribute] && dataState[attribute][option] ? dataState[attribute][option] : ""}
															onChange={
																(event) => setDataState({...dataState, [attribute]: {...dataState[attribute], [option]: event.target.value}})
															}
														// onBlur={() => saveData(attribute)}
														>
															{allOptionsWithData[option].input.map((optionvalue, k) =>
																<option value={optionvalue} key={k}>{optionvalue !== false ? optionvalue :"none"}</option>
															)}
														</select>
													}
												</>
												:
												<>
													{dataState[attribute] && dataState[attribute][option] ? dataState[attribute][option] : "-"}
												</>
											}
										</td>

									)}
								</tr>
							))
							:
							<>
								{fakedata.map((dot, row) => (
									<tr key={row}>
										<td key={0}>
											<SkeletonTheme color={primary_very_light.color} highlightColor={"white"}>
												<Skeleton />
											</SkeletonTheme>
										</td>
										{allOptions.map((option, i) =>
											<td key={i+1}>
												<SkeletonTheme color={primary_very_light.color} highlightColor={"white"}>
													<Skeleton color={primary.color} highlightColor={primary_very_light}/>
												</SkeletonTheme>
											</td>
										)}
									</tr>
								))}
							</>
						}
					</tbody>
				</table>
			</div>
			{/* {saving && <div className="saving">Saving...</div>} */}
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				open={saving}
				key={"saving"}
				message="Saving..."
			/>
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				open={showSaved}
				key={"saved"}
				autoHideDuration={1500}
				onClose={() => setShowSaved(false)}
			>
				<Alert onClose={() => setShowSaved(false)} severity="success">
					Saved!
				</Alert>
			</Snackbar>


			<style jsx>{`
			.container{
				width: calc(100% - 30px);
				overflow: auto;
				height: calc(100vh - 68.67px);
				position: relative;
				top: 15px;
				left: 15px;
				box-shadow: -1px 2px 10px rgba(0, 0, 0, 0.2);
				/* right: -15px;
				bottom: -15px; */
			}
			.evencols{
				width: ${(1/(allOptions.length+1)) * 100}%;
				/* min-width: 75px; */
				text-overflow: clip;
				white-space: nowrap;
				overflow: hidden;
			}
			table{
				background-color: white;
				border-collapse: collapse;
				width: 100%;
			}

			tr:nth-child(even){
				background-color: ${gray_very_light.color};
			}
			colgroup {
				width: 100%;
			}
			.crossdivider {
				background-color: ${primary_very_light.color};
				color: ${primary_very_light.text};
			}
			td {
				text-align: right;
				border: 1px solid ${gray_light.color};
				border-width: 0 1px 1px 0;
				padding: 1px 7px;
				text-overflow: clip;
				white-space: nowrap;
				overflow: hidden;
			}
			td:nth-last-child(1) {
				border-width: 0 0 1px 0;
			}
			td:hover{
				text-overflow: none;
			}
			th{
				background-color: ${primary.color};
				color: ${primary.text};
				border: 1px solid ${gray_light.color};
				border-width: 0 1px 0 0;
				position: sticky;
				top: 0;
				cursor: pointer;
				text-overflow: clip;
				white-space: nowrap;
				overflow: hidden;
			}
			th:last-child {
				border-width: 0;
			}
			.firstcol{
				font-weight: bold;
				text-align: left;
			}
			.optionInput{
				width: 100%;
				min-width: 75px;
				/* border: 2px solid ${primary.color}; */
			}
			.saving{
				position: absolute;
				right: 14px;
				bottom: 0;
			}

		`}</style>
		</>
	);
};

export default ViewTable;
