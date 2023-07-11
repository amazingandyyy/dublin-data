const { globSync } = require('glob')
const { parseHtml, writeToFileForce, writeJsonToFileForce, absolutePath } = require('./index')

const generateJson = async (datekey, html) => {
  const jsonData = await parseHtml(html)
  writeJsonToFileForce(absolutePath(`docs/archive/${datekey}/dublin-development.icitywork.com/snapshot.json`), jsonData)
}

const generateDateKeys = async () => {
  let datakeys = await globSync(absolutePath('docs/archive/*'))
  datakeys = datakeys.filter(k => !k.includes('json') && !k.includes('txt'))
    .map(k => k.replace(absolutePath('docs/archive/'), ''))
    .sort((a, b) => a - b)
  const datekeysLatest = datakeys[datakeys.length - 1]
  writeJsonToFileForce(absolutePath('docs/archive/datekeys.json'), datakeys)
  writeToFileForce(absolutePath('docs/archive/datekeys-latest.txt'), datekeysLatest)
}

exports.generateJson = generateJson
exports.generateDateKeys = generateDateKeys
