/**
 * 分隔符匹配
 */

// 换行匹配正则表达式
export const BR_REG = /^(\n+)/

const renderer = (rawStr: string) => {
    const length = rawStr.split("\n").length - 1
    const brList = []
    for (let i = 0; i < length; i++) {
        brList.push(<br key={i} />)
    }
    return <>{brList}</>
}

export default {
    name: "br",
    regex: BR_REG,
    renderer
}