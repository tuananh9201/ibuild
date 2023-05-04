export const OPTIONS_SELECT = [
    { value: "0", label: "Sản phẩm", path: "/tim-kiem" },
    { value: "1", label: "Nhóm sản phẩm", path: "/tim-kiem-nhom-san-pham" },
    { value: "2", label: "Nhà cung cấp", path: "/tim-kiem-nha-cung-cap" },
];

export const RELATED_LIST = [
    {
        id: 1,
        value: "Số lượng sản phẩm",
        slug: "PRODUCTS",
    },
    {
        id: 2,
        value: "Số lượt theo dõi",
        slug: "FOLLOWS",
    },
    {
        id: 3,
        value: "Ngày tham gia",
        slug: "PARTICIPATION_DATE",
    },
    {
        id: 4,
        value: "Tên nhà cung cấp",
        slug: "NAME",
    }
];

export const PREFIXES = [
    { prefix: "Thành", length: 10, type: 1 },
    { prefix: "Tỉnh", length: 5, type: 1 },
    { prefix: "Huyện", length: 6, type: 2 },
    { prefix: "Thị xã", length: 7, type: 2 },
    { prefix: "Quận", length: 5, type: 2 },
];

export const PREFIXES_NOT_SLICE = ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10', 'Quận 11', 'Quận 12',]

export const QUANTITIES_OPTIONS = [
    {
        id: '0',
        name_vi: 'Tất cả',
        min_quantity: 0,
        max_quantity: 10000,
    },
    {
        id: '1',
        name_vi: '1-99',
        min_quantity: 1,
        max_quantity: 99,
    },
    {
        id: '2',
        name_vi: '100-999',
        min_quantity: 100,
        max_quantity: 999,
    },
    {
        id: '3',
        name_vi: 'Trên 1000',
        min_quantity: 1000,
        max_quantity: 9999,
    }
]

export const RANGE_QUANTITY = [
    {
        text: "Đang cập nhật",
        min: 0,
        max: 0
    },
    {
        text: '1-99',
        min: 1,
        max: 99
    },
    {
        text: "100-999",
        min: 100,
        max: 999
    },
    {
        text: "Trên 1000",
        min: 1000,
        max: 100000000000
    },

]