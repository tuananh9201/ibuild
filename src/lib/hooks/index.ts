import currency from "currency.js"

import { IAddresses, ICategory } from "../types"
import { PREFIXES, PREFIXES_NOT_SLICE } from "@/constants/data"
import { RANGE_QUANTITY } from "@/constants/data"

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
        let name = {};
        if (PREFIXES_NOT_SLICE.includes(city.name_vi)) {
            return name = {
                value: city.name_vi,
                type: 2
            }
        }
        for (const { prefix, length, type } of PREFIXES) {
            if (city.name_vi.startsWith(prefix)) {
                name = {
                    value: city.name_vi.slice(length),
                    type: type
                }
            }
        }
        return name;
    });

    return names
}

export const scrollToTop = (x: number = 0) => {
    window.scrollTo({
        top: x,
        behavior: 'smooth'
    })
}

export const getRangeQuantity = (quantity: number | undefined) => {
    if (!quantity) return 'Đang cập nhật'
    if (quantity === 0) return 'Đang cập nhật'
    const op = RANGE_QUANTITY.find((range) => range.min <= quantity && range.max >= quantity)
    return op?.text || 'Đang cập nhật'
}

export const getAddress = (address: IAddresses[] | undefined, showWards: boolean) => {
    if (!address) return ''
    const add = address[0]
    const addressArr = []

    if (add.wards && showWards) {
        addressArr.push(add.wards);
    }
    if (add.district) {
        addressArr.push(add.district);
    }
    if (add.city) {
        addressArr.push(add.city);
    }


    return addressArr.join(", ") || "";
}

export const getRangeAddress = (address: IAddresses[] | undefined, showWards: boolean) => {
    if (!address) return []
    if (address.length === 0) return []
    const names = address.map((ad) => {
        const arr = []
        ad.wards && showWards && arr.push(ad.wards)
        ad.district && arr.push(ad.district)
        ad.city && arr.push(ad.city)

        return arr.join(', ')
    })
    return names
}

export const convertUserName = (name: string): string => {
    if (!name) return ''
    const words = name.split('')

    const convertedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    const convertedString = convertedWords.join(' ');
    return convertedString;
}