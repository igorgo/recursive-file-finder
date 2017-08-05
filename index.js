/*!
 * node js recursive file finder
 * Copyright(c) 2017 igor-go <igorgo16@gmail.com>
 * MIT Licensed
 */

const fs = require('fs')
    , path = require('path')

/**
 * Returns an array of filenames in the rootPath folder matching the regexp pattern
 * @param {string} rootPath
 * @param {regexp} [pattern]
 * @returns {Array}
 */
const findFiles = (rootPath, pattern) => {
    let lList = []
    const lFiles = fs.readdirSync(rootPath)
    lFiles.forEach(iFile => {
        const lFilePath = path.join(rootPath,iFile)
        const lStat = fs.statSync(lFilePath)
        if (lStat.isDirectory()) {
            const rList = findFiles(lFilePath, pattern)
            lList = lList.concat(rList)
        }
        else {
            if (pattern) {
                if (iFile.match(pattern)) lList.push(lFilePath)
            }
            else {
                lList.push(lFilePath)
            }
        }
    })
    return lList
}

module.exports = findFiles