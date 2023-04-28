import currency from "currency.js"

import { ICategory } from "../types"
import { PREFIXES, PREFIXES_NOT_SLICE } from "@/constants/data"

export const FormatNumber = (value: number) => {
    return currency(value, { symbol: '', precision: 0 }).format()
}

export const arrayChecked = (options: ICategory[] | undefined, values: any) => {
    if (!options) return
    if (!values) return []
    if (values.length === 0 || values['0'] === "0" || values.includes('0')) {
        return []
    }

    const parent: ICategory[] = [];
    const stringId: string[] = [];
    const ids: string[] = [];
    values.forEach((value: string) => {
        const option = options.find(
            (op) => op.id === value && op.parent_id === "0"
        );
        if (option) {
            parent.push(option);
            stringId.push(option.id);
        }
    });

    parent.forEach((pa) => {
        ids.push(pa.id);
        const child = options.filter((area) => area.parent_id === pa.id);
        if (child) {
            child.forEach((c) => {
                stringId.push(c.id);
            });
        }
    });

    values.forEach((value: string) => {
        if (!stringId.includes(value)) {
            ids.push(value);
        }
    });

    const names = ids.map((id) => {
        const city = options.find((area) => area.id === id);
        if (!city) return "";
        let name = "";
        if (PREFIXES_NOT_SLICE.includes(city.name_vi)) {
            return name = city.name_vi
        }
        for (const { prefix, length } of PREFIXES) {
            if (city.name_vi.startsWith(prefix)) {
                name = city.name_vi.slice(length);
            }
        }
        return name;
    });

    return names
}