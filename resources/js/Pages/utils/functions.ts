const prefixes = ['032', '033', '034', '035', '036', '037', '038', '039', '086', '096', '097', '098', '083', '084', '085', '081', '082', '088', '091', '094', '070', '079', '077', '076', '078', '090', '093', '089', '056', '058', '092', '059', '099', '087']

export const checkPhoneNumber = (phone: string): boolean => {
    const prefix = phone.slice(0, 3);
    console.log("🚀 ~ checkPhoneNumber ~ phone:", phone, '-', prefix, '-', prefixes.includes(prefix))
    return prefixes.includes(prefix);
};


export function mapModifiers(
    baseClassName: string,
    ...modifiers: (string | string[] | false | undefined)[]
): string {
    return modifiers
        .reduce<string[]>(
            (acc, m) => (!m ? acc : [...acc, ...(typeof m === 'string' ? [m] : m)]),
            [],
        )
        .map((m) => `-${m}`)
        .reduce<string>(
            (classNames, suffix) => `${classNames} ${baseClassName}${suffix}`,
            baseClassName,
        );
}
