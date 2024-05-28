import * as fs from 'fs'

export default defineEventHandler(async (event) => {
    const params = await getRouterParams(event)
    let dirStructure = params._

    // make sure any file or folder names with spaces are properly decoded
    // e.g. "my%20folder" becomes "my folder"
    dirStructure = decodeURIComponent(dirStructure)
    
    const isFile = dirStructure.includes(".")
    if (isFile) {
        const baseFolder = "test"
        const fullPath = `${baseFolder}/${dirStructure}`

        const ext = fullPath.split('.').pop()
        if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "gif") {
            const file = fs.readFileSync(fullPath)
            return file
        }

        const file = fs.readFileSync(fullPath, 'utf8')
        return file
    }
    const baseFolder = "test"
    const fullPath = `${baseFolder}/${dirStructure}`
    const dir = fs.readdirSync(fullPath)
    return dir
})