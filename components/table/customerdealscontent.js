import React, {useState, useEffect} from "react";

import { dataTable_pk } from "../../config/globalvariables";
import { useReserveLogic } from "../../lib/swr-hooks";
import DealRow from "./dealrow";






const CustomerDealsContent = ({theme, active, conversionRate, user, conversionMode, mergedFrom, rowData, country}) => {
	const defaultRes = [0, 0, 0, 0];
	const {primary_light, primary} = theme;
	const [pk, setPk] = useState(mergedFrom ? mergedFrom[0][dataTable_pk] : rowData[dataTable_pk]);
	const [totalReserved, setTotalReserved] = useState(defaultRes);
	const {data, mutate} = useReserveLogic(pk);
	const {total_left, total_qty, qty_to_offer} = data || {};
	const sumReserved = totalReserved.reduce((a, b) => {
		if (b !== "na") {
			return a + parseFloat(b);
		} else return a;
	}, 0);

	useEffect(() => (async () => {
		if (data && active) {
			const newTotalLeft = qty_to_offer - sumReserved;
			if (newTotalLeft != parseInt(total_left)) {
				try {
					const res = await fetch("/api/data/edit-entry", {
						method: "PATCH",
						body: JSON.stringify({
							id: pk,
							col: "total_left",
							val: newTotalLeft,
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
				mutate({...data, total_left: newTotalLeft});
			}
			if (sumReserved != parseInt(total_qty)) {
				try {
					const res = await fetch("/api/data/edit-entry", {
						method: "PATCH",
						body: JSON.stringify({
							id: pk,
							col: "total_qty",
							val: sumReserved,
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
				mutate({...data, total_qty: sumReserved});

			}
		}
	})(), [sumReserved, total_left, total_qty, qty_to_offer, data, active]);

	const handleChange = e => {
		setPk(e.target.value);
		mutate();
		setTotalReserved(defaultRes);
	};

	return (
		<>
			<div className="header">
				<span>Customer Deals</span>
				{mergedFrom && <>
					<span>: Batch </span>
					<select
						value={pk}
						onChange={handleChange}
					>
						{mergedFrom.map((el, i) => <option key={el[dataTable_pk]} value={el[dataTable_pk]}>{i+1}</option>)}
					</select>
				</>
				}
			</div>
			<div className="body">
				<DealRow number={1} pk={pk} theme={theme} user={user} conversionMode={conversionMode} totalReserved={totalReserved} setTotalReserved={setTotalReserved} conversionRate={conversionRate} country={country}/>
				<DealRow number={2} pk={pk} theme={theme} user={user} conversionMode={conversionMode} totalReserved={totalReserved} setTotalReserved={setTotalReserved} conversionRate={conversionRate} country={country}/>
				<DealRow number={3} pk={pk} theme={theme} user={user} conversionMode={conversionMode} totalReserved={totalReserved} setTotalReserved={setTotalReserved} conversionRate={conversionRate} country={country}/>
				<DealRow number={4} pk={pk} theme={theme} user={user} conversionMode={conversionMode} totalReserved={totalReserved} setTotalReserved={setTotalReserved} conversionRate={conversionRate} country={country}/>
				{/* <div className="addOne">
				<FontAwesomeIcon icon={faPlus}/>
			</div> */}
			</div>
			<style jsx>{`
        .header {
          background-color: ${primary_light.color};
          color: ${primary_light.text};
          font-weight: bolder;
          font-size: 1.2em;
          padding: 8px 16px;
          height: 32px;
        }
        .body {
          padding: 8px;
        }
        select {
          pointer-events: auto;
          cursor: pointer;
          background: transparent;
          border: 1px solid white !important;
          border-radius: 7px;
          outline: none !important;
          color: inherit;
          padding: 0;
          margin: 0;
          font: inherit;
          /* -webkit-appearance: none;
          -moz-appearance: none; */
          text-indent: 0px;
          text-overflow: '';
        }
        option {
          color: black;
        }
        /* .addOne {
          text-align: center;
          font-size: 1.2em;
          background-color: ${primary.color};
          color: ${primary.text};
          width: 25px;
          height: 25px;
          line-height: 25px;
          border-radius: 50%;
          margin: 15px auto;
        } */
      `}</style>
		</>
	);
};


export default CustomerDealsContent;
