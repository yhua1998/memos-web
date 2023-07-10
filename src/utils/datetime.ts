export function getPublicTime(date: number) {
    let timeVar = (Date.now() - date) / 1000 // 秒数
    if (timeVar < 60) {
        return "刚刚"
    }
    if (timeVar < 60 * 60) {
        return `${Math.floor(timeVar / 60)}分钟前`
    }
    if (timeVar < 60*60*24){
        return `${Math.floor(timeVar / (60*60))}小时前`
    }
    if (timeVar < 60*60*24*30){
        return `${Math.floor(timeVar / (60*60*24))}天前`
    }
    if(timeVar < 60*60*24*30*12){
        return `${Math.floor(timeVar / (60*60*24*30))}月前`
    }
    return `${Math.floor(timeVar / (60*60*24*30*12))}年前`
}