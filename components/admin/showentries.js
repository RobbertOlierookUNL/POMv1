import React from "react";

import { useColors } from "../../lib/custom-hooks";
import moment from "moment";


const ShowEntries = ({data, loading, error, hasRead, hasWrite, loggedIn, columns, height, width}) => {
	if (!loggedIn) {
		return <div>Je bent niet ingelogd</div>;
	}
	if (!hasRead) {
		return <div>Je bent geen admin</div>;
	}
	if (error) {
		return <b>ERROR</b>;
	}
	if (loading) {
		return <b>LOADING</b>;
	}
	const cols = columns.split(" ");


	return (
		<div className="entry-container">
			{data.map((entry, i) => (
				cols.map((col, j) => (
					<div className="entry-cell" key={`${i}.${j}`}>
						<div className="entry-text">
							{moment(entry[col]).isValid() ?
								moment(entry[col]).locale("nl").format("DD-MM-YY")
								: entry[col]}
						</div>
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

        }
        .entry-text{
          line-height: calc(${height} - 4px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.7em;
        }
      `}</style>
		</div>
	);
};

export default ShowEntries;
