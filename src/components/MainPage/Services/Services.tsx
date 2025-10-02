"use client";
import React from "react";
import WrapperForComponents from "@/components/UI/WrapperForComponents/WrapperForComponents";
import SectionBarber from "./SectionBarber/SectionBarber";
import SectionPsyhology from "./SectionPsyhology/SectionPsyhology";

const Services = () => {
	return (
		<WrapperForComponents paddingBottom={40} paddingTop={40}>
			<SectionBarber />
			<SectionPsyhology />
		</WrapperForComponents>
	);
};

export default Services;
