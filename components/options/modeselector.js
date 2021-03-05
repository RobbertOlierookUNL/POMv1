import { InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { useRouter } from "next/router";

import { isNumeric } from "../../lib/custom-hooks";
import { useViews } from "../../lib/swr-hooks";




const ModeSelector = ({hasMrp, mrpcMode, setMrpcMode, salesMode, setSalesMode}) => {
	const {views, isLoading} = useViews();
	const Router = useRouter();
	const reroute = (e) => {
		const viewRoute = e.target.value === "non" ? "" : `/${e.target.value}`;
		if(Router.query.slug && isNumeric(Router.query.slug[0])){
			Router.push(`/${Router.query.slug[0]}${viewRoute}`);
		} else{
			Router.push(`${viewRoute}`);
		}
	};
	return (
		<div className="container">
			<div/>
			<div className="contentbox">
				<div className="content">
					<InputLabel id="Modus">Modus</InputLabel>
					<Select
						labelId="Modus"
						id="salesMode"
						className="disable-on-inactive"
						name="salesMode"
						value={salesMode}
						onChange={(e) => setSalesMode(e.target.value)}
					>
						<MenuItem value={true}>Sales</MenuItem>
						<MenuItem value={false}>Operations</MenuItem>

					</Select>
				</div>
				{!!hasMrp &&
          <div className="content">
        	<InputLabel id="MRPs">MRP</InputLabel>
        	<Select
          	labelId="MRPs"
          	id="mrpMode"
          	className="disable-on-inactive"
          	name="mrpMode"
          	value={mrpcMode}
          	onChange={(e) => setMrpcMode(e.target.value)}
        	>
      	<MenuItem value={true}>Alleen mijn MRPs zien</MenuItem>
      	<MenuItem value={false}>Alle MRPs zien</MenuItem>

        	</Select>
          </div>


				}
				<div className="content">
					<InputLabel id="view">View</InputLabel>
					<Select
						labelId="view"
						id="view"
						className="disable-on-inactive"
						name="view"
						defaultValue={""}
						onChange={reroute}
					>
						<MenuItem value={"non"}>Mijn standaard view</MenuItem>
						{!isLoading && views.map((view) =>
  				<MenuItem key={view.view_name} value={view.view_name}>
  					{view.view_name}
  				</MenuItem>
  			)}

					</Select>
				</div>
			</div>
			<style jsx>{`
        .container {
          display: inline-grid;
          grid-template-columns: [start] 15px [start-content] auto [end-content] 15px [end];
          width: 100%;
        }
        .contentbox {
          display: inline-grid;
          padding: 8px 0;
        }
        .content {
          display: inline-grid;
          margin: 7px 0;
        }
      `}</style>
			<div/>
		</div>
	);
};



export default ModeSelector;
