export function ParseArgs(i: string[]): string {
    let str = "";
    i.map((a) => {
        const s = a.replace(/;/g, " ")
        const pair = s.split("+");
        str += `${pair[0]}: ${pair[1]}\n`
    })
    return str;
}