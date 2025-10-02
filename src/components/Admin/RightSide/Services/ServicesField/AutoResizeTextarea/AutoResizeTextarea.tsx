import { FieldProps } from "formik";
import { useEffect, useRef } from "react";
import s from "./AutoResizeTextarea.module.css";

const AutoResizeTextarea: React.FC<
	FieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ field, ...props }) => {
	const ref = useRef<HTMLTextAreaElement>(null);

	const resize = () => {
		if (ref.current) {
			ref.current.style.height = "auto";
			ref.current.style.height = ref.current.scrollHeight + "px";
		}
	};

	useEffect(resize, [field.value]);

	return (
		<textarea
			{...field}
			{...props}
			ref={ref}
			onInput={resize}
			className={s.textarea}
		/>
	);
};

export default AutoResizeTextarea;
