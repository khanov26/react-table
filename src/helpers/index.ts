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

export function chunk<T> (arr: T[], chunkSize: number): T[][] {
    const chunksNumber = Math.ceil(arr.length / chunkSize);

    const chunks = [];
    for (let i = 0; i < chunksNumber; i++) {
        const currentChunk = arr.slice(chunkSize * i, chunkSize * (i + 1));
        chunks.push(currentChunk);
    }

    return chunks;
}

export function getSortedData<T extends { id: number }, S extends { field: keyof T, direction: "asc" | "desc" } | null>(data: T[], sort: S | null): T[] {
    if (sort === null) {
        return data;
    }

    const clonedData = [...data];

    const compareFunction = (() => {
        if (sort.field === "id") {
            return sort.direction === "asc" ?
                (a: T, b: T) => a.id - b.id :
                (a: T, b: T) => b.id - a.id
        }

        return sort.direction === "asc" ?
            (a: T, b: T) => String(a[sort.field]).localeCompare(String(b[sort.field])) :
            (a: T, b: T) => String(b[sort.field]).localeCompare(String(a[sort.field]))
    })();

    clonedData.sort(compareFunction);
    return clonedData;
}
