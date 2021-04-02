/** @format */

import React from "react";
import { JsonToCsv, useJsonToCsv } from "react-json-csv";

import "./index.css";

export default class Wheel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 0,
			selectedItem: null,
			excelData: [],
		};
		this.selectItem = this.selectItem.bind(this);
	}

	async selectItem() {
		if (this.state.selectedItem === null) {
			const selectedItem = Math.floor(Math.random() * this.props.items.length);
			if (this.props.onSelectItem) {
				this.props.onSelectItem(selectedItem);
			}
			this.setState({ selectedItem });
			// this.setState((state) => {});
			this.setState(async (state) => {
				state.counter = state.counter + 1;
				state.excelData.push({
					["try"]: state.counter,
					["item"]: this.props.items[state.selectedItem],
					["timestamp"]: new Date().toLocaleTimeString(),
				});
			});
		} else {
			this.setState({ selectedItem: null });
			setTimeout(this.selectItem, 500);
		}
	}
	render() {
		const { selectedItem } = this.state;
		const { items } = this.props;
		const { excelData: Data } = this.state;

		const wheelVars = {
			"--nb-item": items.length,
			"--selected-item": selectedItem,
		};
		const spinning = selectedItem !== null ? "spinning" : "";

		const filename = "Csv-file",
			fields = {
				try: "Try",
				item: "Item",
				timestamp: "Time",
			},
			style = {
				padding: "5px",
			},
			data = [...Data],
			text = "Convert Json to Csv";

		const { saveAsCsv } = useJsonToCsv();
		console.log("data..", Data);
		console.log("selected Items...", this.state);
		return (
			<div className="wheel-container">
				<div
					className={`wheel ${spinning}`}
					style={wheelVars}
					onClick={this.selectItem}
				>
					{items.map((item, index) => (
						<div
							className="wheel-item"
							key={index}
							style={{ "--item-nb": index }}
						>
							{item}
						</div>
					))}
				</div>
				{items[selectedItem]}
				<div>
					<button onClick={() => saveAsCsv({ data, fields, filename })}>
						Export
					</button>
				</div>
			</div>
		);
	}
}
