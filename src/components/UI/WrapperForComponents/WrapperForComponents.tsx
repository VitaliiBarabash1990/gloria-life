import React, { ReactNode } from "react";

type WrapperProps = {
	children: ReactNode;
	paddingTop?: string | number;
	paddingBottom?: string | number;
};

const WrapperForComponents = ({
	children,
	paddingTop = 0,
	paddingBottom = 0,
}: WrapperProps) => {
	return (
		<section style={{ paddingTop, paddingBottom }}>
			<div className="container">{children}</div>
		</section>
	);
};

export default WrapperForComponents;
