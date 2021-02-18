import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";

import { allOptionsWithData } from "../../../config/viewOptions";
import { useTheme } from "../../../lib/custom-hooks";
import Button from "../../button";
import Card from "../../card";
import FilterBox from "./filterbox";
import FilterDisplay from "./filterdisplay";
import useGlobal from "../../store";







const FilterModal = ({meta, keys, filterParameters, sortedRowKeys}) => {
	const [, openFilterModal] = useGlobal(() => null, actions => actions.openFilterModal);
	const [arrayOfFilters, clearFilters] = useGlobal(state => state.arrayOfFilters, actions => actions.clearFilters);
	const [option, setOption] = useState();
	const {
		gray_light,
		gray_lighter,
		gray_very_light,
		primary_light,
		primary_very_light,
		primary_dark} = useTheme();

	const closeFilterModal = () => openFilterModal(false);
	return (
		<Card
			title="Beheer Filters"
			bigHeader
			roundedBorders
			titlefloater={
				<div className="closeButton" onClick={closeFilterModal}>
					<FontAwesomeIcon icon={faTimes}/>
				</div>
			}
		>
			<div className="grid">
				<div className="grid-item options">
					{keys.compact.concat(keys.expanded).sort().map((key, i) => (
						<div
							className={`option ${option === key ? "selected" : ""}`}
							onClick={() => setOption(key)}
							key={i}
						>
							{meta[key].hovername || meta[key].title || key}
						</div>
					))}
				</div>
				<div className="grid-item filter">
					<div className="container">
						{option ?
							<FilterBox
        		    active={true}
								filtertype={meta[option].filtertype === "false" ? false : meta[option].filtertype || allOptionsWithData.filtertype.default}
								valuetype={meta[option].valuetype || allOptionsWithData.valuetype.default}
        	  	  title={meta[option].hovername || meta[option].title || option}
								filterName={meta[option].title || option}
          		  reference={option}
								close={false}
								parameters={filterParameters[option] || false}
        	     />
							:
							<div>{"<- Kies een optie"}</div>

						}
					</div>
				</div>
				<div className="grid-item displays">
					<div className="display-header">Actieve Filters</div>
					<div className="display-body">
						{arrayOfFilters.map((filter, i) => (
							<div key={i} className="filter-container">
								<FilterDisplay filterObject={filter}/>
							</div>
						))}
					</div>
				</div>
				<div className="grid-item feater">
					{sortedRowKeys && <div className="results">{sortedRowKeys.length} {sortedRowKeys.length === 1 ? "resultaat" : "resultaten"}</div>}
					<Button onClick={clearFilters}>Alle Filters Verwijderen</Button>
					<Button onClick={closeFilterModal}>OK</Button>
				</div>

			</div>
			<style jsx>{`
        .closeButton:hover {
          cursor: pointer;
          transform: scale(1.1);
          transition: transform 100ms;
        }
        .grid {
          display: grid;
          grid-template:
            "options filter displays" 400px
            "feater feater feater" 50px
            / 200px 254px 200px;
        }
        .grid-item {
          overflow: auto;
        }
        .options {
          grid-area: options;
        }
        .options .option {
          padding: 4px 8px;
          transform: background-color 100ms;
          cursor: pointer;
          border-bottom: 1px solid ${gray_light.color};
        }
        .options .option:hover {
          background-color: ${primary_very_light.color}
        }
        .options .selected {
          background-color: ${primary_light.color} !important;
          color: ${primary_light.text} !important;
        }
        .filter {
          grid-area: filter;
          background-color: ${gray_very_light.color};
          padding: 27px;
        }
        .filter .container {
          position: relative;
          vertical-align: inherit;
          font-weight: bold;
          text-align: center;
          font-size: 0.7em;
        }
        .displays {
          grid-area: displays;
          background-color: ${primary_very_light.color};

        }
        .displays .display-header {
          width: 100%;
          position: sticky;
          background-color: ${primary_dark.color};
          color: ${primary_dark.text};
          padding: 4px;
        }
        .displays .display-body {
          font-size: 0.8em;
          padding: 4px;

        }
        .filter-container {
          margin: 4px;
          display: inline-block;
        }
        .feater {
          grid-area: feater;
          border-top: 1px solid ${gray_light.color};
          background-color: ${gray_lighter.color};
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 8px;
          padding: 8px;
					border-radius: 0 0 6px 6px;
        }
        .results {
          margin-right: auto;
        }
      `}
			</style>
		</Card>
	);
};


export default FilterModal;
