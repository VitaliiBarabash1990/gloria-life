// type CleanableValues = Record<string, string | undefined | null>;

// const CleanValues = (values: CleanableValues): Record<string, string> => {
// 	return Object.fromEntries(
// 		Object.entries(values)
// 			.filter(([, value]) => value != null && value !== "")
// 			.map(([key, value]) => [key, value as string])
// 	);
// };

// type CleanableValues = Record<string, string | boolean | undefined | null>;

// const CleanValues = (values: CleanableValues): Record<string, string> => {
// 	return Object.fromEntries(
// 		Object.entries(values)
// 			.filter(([, value]) => value != null && value !== "")
// 			.map(([key, value]) => [key, String(value)])
// 	);
// };

function CleanValues<T extends object>(values: T): T {
	return Object.fromEntries(
		Object.entries(values).filter(([, value]) => value != null && value !== "")
	) as T;
}

export default CleanValues;
