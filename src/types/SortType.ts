import PersonType from "./Person";

type SortType = {
    field: keyof PersonType,
    direction: "asc" | "desc";
};

export default SortType;