type SortType<T> = {
    field: keyof T,
    direction: "asc" | "desc";
};

export default SortType;