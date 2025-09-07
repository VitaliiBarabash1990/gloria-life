import React from "react";
import MainMenu from "./MainMenu/MainMenu";
import AboutMe from "./AboutMe/AboutMe";
import Services from "./Services/Services";
import Blog from "./Blog/Blog";
import { Galery } from "./Galery/Galery";
import Contacts from "./Contacts/Contacts";
import { RightSideProps } from "@/types/types";

const RightSide = ({ idMenuItem }: RightSideProps) => {
	return (
		<>
			{idMenuItem === 0 && <MainMenu />}
			{idMenuItem === 1 && <AboutMe />}
			{idMenuItem === 2 && <Services />}
			{idMenuItem === 3 && <Blog />}
			{idMenuItem === 4 && <Galery />}
			{idMenuItem === 5 && <Contacts />}
		</>
	);
};

export default RightSide;
