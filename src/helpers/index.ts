import PersonType from "../types/Person";
import SortType from "../types/SortType";

export class QueryParams {
    static parse(queryString: string): Record<string, string> {
        const queryParams = new URLSearchParams(queryString);

        const paramsObject: Record<string, string> = {};
        for (let [param, value] of queryParams) {
            paramsObject[param] = value;
        }

        return paramsObject;
    }

    static build(paramsObject: Record<string, string>): string {
        const queryParams = new URLSearchParams();

        for (let [param, value] of Object.entries(paramsObject)) {
            queryParams.set(param, value);
        }

        return queryParams.toString();
    }
}

export function chunk (arr: any[], chunkSize: number) {
    const chunksNumber = Math.ceil(arr.length / chunkSize);

    const chunks = [];
    for (let i = 0; i < chunksNumber; i++) {
        const currentChunk = arr.slice(chunkSize * i, chunkSize * (i + 1));
        chunks.push(currentChunk);
    }

    return chunks;
}

export function getSortedData(data: PersonType[], sort: SortType | null): PersonType[] {
    if (sort === null) {
        return data;
    }

    const clonedData = [...data];

    const compareFunction = (() => {
        if (sort.field === "id") {
            return sort.direction === "asc" ?
                (a: PersonType, b: PersonType) => a.id - b.id :
                (a: PersonType, b: PersonType) => b.id - a.id
        }

        return sort.direction === "asc" ?
            (a: PersonType, b: PersonType) => (a[sort.field] as string).localeCompare((b[sort.field] as string)) :
            (a: PersonType, b: PersonType) => (b[sort.field] as string).localeCompare((a[sort.field] as string))
    })();

    clonedData.sort(compareFunction);
    return clonedData;
}
