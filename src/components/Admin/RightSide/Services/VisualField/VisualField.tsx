import React from "react";
import s from "./VisualField.module.css";

type FieldProps = {
	field: string | undefined;
	nameField: string;
	type?: string;
};

const VisualField = ({ field, nameField, type }: FieldProps) => {
	return (
		<div className={`${s.visualInput} ${type === "input" ? "" : s.textArea}`}>
			<h4 className={type === "input" ? s.inputTitle : s.areaTitle}>{field}</h4>
			<div className={s.visualLabel}>{nameField}</div>
		</div>
	);
};

export default VisualField;
