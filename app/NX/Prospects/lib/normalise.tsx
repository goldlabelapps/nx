/* 

Takes an array of objects and normalises it for use in the chip select component which uses an Autocomplete under the hood. The chip select component expects an array of objects with a label and value property, but sometimes the data we have doesn't come in that format. This function allows us to specify which properties to use for the label and value, and it will return a new array of objects in the correct format.

*/

export function normaliseForChipSelect<T>(data: T[], labelKey: keyof T, valueKey: keyof T): { label: string; value: string }[] {
    return data.map(item => ({
        label: String(item[labelKey]),
        value: String(item[valueKey]),
    }));
}   

