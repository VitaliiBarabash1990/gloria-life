import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectServices = (state: RootState) => state.services.servicesList;
export const selectServicesLang = (state: RootState) =>
	state.services.servicesLangList;

export const selectBarberServices = createSelector(
	[selectServices],
	(services) => services.filter((service) => service.type === "barber")
);

export const selectPsychologyServices = createSelector(
	[selectServices],
	(services) => services.filter((service) => service.type === "psychology")
);
