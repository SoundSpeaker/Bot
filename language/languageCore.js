const fs = require("fs/promises")
const path = require("path")
const YAML = require('yaml')
const languagesPath = path.join(__dirname, "/languageFiles/")
const languages = new Map()

async function loadLanguages() {
    let langDirs = await fs.readdir(languagesPath, { withFileTypes: true })

    langDirs = langDirs.filter((item) => item.isDirectory())

    for (const dir of langDirs) {

        const langDirPath = path.join(languagesPath, dir.name)
        let files = await fs.readdir(langDirPath)
        if (!files) continue

        files.filter((file) => file.endsWith(".json"))
        
        languages.set(dir.name, new Map())
        const map = languages.get(dir.name)

        for (const file of files) {
            try {
                const contents = await fs.readFile(path.join(langDirPath, file), "utf8")
                const lang = YAML.parse(contents)
                const modName = file.slice(0, -4)
                traverse(lang, modName, map)
            } catch (e) {
                console.error(e)
            }
        }
    }

}

function traverse(o, path = "", map = new Map()) {
    if (typeof o === "object") {
        for (const key of Object.keys(o)) {
            traverse(o[key], `${path}.${key}`, map)
        }
    } else {
        map.set(path, o)
    }
}

function getTranslations(langCode) {
    return (message) => {
        const lang = languages?.get(langCode) || languages?.get("en-GB")
        return lang?.get(message) || "[LANGUAGE-CORE] ERROR: Missing/Invalid translations!"
    }
}

loadLanguages().then(() => {
    const t = getTranslations("en-US")
    console.log("[LANGUAGE-CORE] All Language files loaded.")
})


module.exports = { loadLanguages, getTranslations }