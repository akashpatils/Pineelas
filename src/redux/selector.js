
const getData = (state, queryName, defaultValue) => state?.[queryName] ?? (defaultValue ?? []);

export { getData }