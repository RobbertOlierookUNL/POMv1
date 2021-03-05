import React from "react";

import { useColors } from "../../lib/custom-hooks";
import moment from "moment-timezone";

function isJsonArray(str) {
	try {
		JSON.parse(str).join(", ");
	} catch (e) {
		return false;
	}
	return true;
}


const ShowEntries = ({data, loading, error, hasRead, hasWrite, loggedIn, columns, height, width}) => {
	if (!loggedIn) {
		return <div>Je bent niet ingelogd</div>;
	}
	if (!(hasRead || hasWrite)) {
		return <div>Je bent geen admin</div>;
	}
	if (error) {
		return <b>ERROR</b>;
	}
	if (loading) {
		return <b>LOADING</b>;
	}
	const cols = columns.split(" ");
	const [quadiary] = useColors("quadiary");

	const format = (string, col) => {
		if (col === "totalLogins") {
			return string;
		}
		if (string === 0) {
			return "no";
		}
		if (string === 1) {
			return "yes";
		}
		if (isJsonArray(string)) {
			return JSON.parse(string).join(", ");

		}
		if (moment(string).isValid()) {
			return moment(string).locale("nl").format("DD-MM-YY");
		}
		return string;
	};


	return (
		<div className="entry-container">
			{cols.map((col, i) => (
				<div className="entry-cell header" key={i}>
					{col}
				</div>
			))}
			{data.map((entry, i) => (
				cols.map((col, j) => (
					<div className="entry-cell" key={`${i}.${j}`}>
						{format(entry[col], col)}
					</div>
				))
			))
			}
			<style jsx>{`
        .entry-container{
          display: grid;
          height: 100%;
          width: 100%;
          grid: auto-flow ${height} / ${width};
          grid-gap: 4px 0;
        }
        .entry-cell{
          padding: 2px 4px;
          background-color: white;
          line-height: calc(${height} - 4px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.7em;
        }
        .header{
          background-color: ${quadiary.color};
          color: ${quadiary.text};
          font-weight: bold;
        }
      `}</style>
		</div>
	);
};

export default ShowEntries;
