const fs = require("fs-extra")

exports.File = {
    copy(source, destination) {
        fs.removeSync(destination)
        return fs.copyFileSync(source, destination)
    },

    truncate(path) {
        return fs.truncateSync(path)
    },

    append(path, content) {
        return fs.appendFileSync(path, content)
    },

    delete(path) {
        return fs.removeSync(path)
    },

    read(path) {
        return fs.readFileSync(path, { encoding: 'utf8' })
    },

    write(path, content) {
        return fs.writeFileSync(path, content, { encoding: 'utf8', flag: 'w'})
    },

    stat(path) {
        return fs.statSync(path)
    },

}

exports.Dir = {
    copy(source, destination) {
        return fs.cpSync(source, destination, { overwrite: true, recursive: true })
    },

    delete(path) {
        return fs.removeSync(path)
    },

    read(path) {
        return fs.readdirSync(path, { encoding: 'utf-8' })
    },

    stat(path) {
        return fs.statSync(path)
                 .map(obj => ({ modifiedAt: obj.mtime, createdAt: obj.ctime }))
    },
}