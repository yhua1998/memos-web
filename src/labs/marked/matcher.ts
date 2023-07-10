export const matcher = (rawStr:string, reg: RegExp)=>{
    const matchResult = rawStr.match(reg)
    return matchResult
}