const { File, Dir } = require("./wrappers/Fs")
const env = require("./.env")

const R = require("rambda")

const slugify = require('slugify')

const { marked } = require("marked")

const createDOMPurify = require("dompurify")
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const dompurify = createDOMPurify(window);

const postTemplate = File.read(env.INPUT_TEMPLATE)

generate()
console.log("Done generating!")
deployPosts()
console.log("Done deploying!")

function generate() {
    File.write(env.OUTPUT_META, "export default\n")

    const inputPostList = getInputPostList()

    const inputPostMetas = inputPostList
                            .map(
                                R.compose(JSON.parse, File.read, (name) => `${name}/meta.json`)
                            )
    const inputPostContents = inputPostList
                            .map(
                                R.compose(dompurify.sanitize, marked.parse, File.read, (name) => `${name}/content.md`)
                            )
    
    R.compose(R.curry(File.append)(env.OUTPUT_META), JSON.stringify)(inputPostMetas)

    R.zipWith((meta, content) => R.compose(
                    R.curry(File.write)(`${env.OUTPUT_POST}/${slugify(meta.title, {lower: true, remove: /[`'"\(\)<>{}!@#$%^&*+/\\\?\.,\[\]]/g})}.vue`),
                    generateOutputPostFromTemplate
                ) (meta, content), inputPostMetas, inputPostContents
    )
}

function getInputPostList() {
    return Dir.read(env.INPUT_POST)
              .map((name) => env.INPUT_POST + "/" + name)
}

function generateOutputPostFromTemplate(meta, content) {
    const escapedContent = content.replace(/<code class="language-(.*)">/g, `<label>$1</label>$&`)
                                  .replace(/\`/g, `\\\``)
                                  .replace(/\\/g, `\\\\`)
                                  .replace(/\$/g, `\\\$`)

    return postTemplate.replace(/#@#@post-summary/, meta.summary)
                       .replace(/#@#@post-title/g, meta.title)
                       .replace(/#@#@post-created-at/, meta.createdAt)
                       .replace(/#@#@post-modified-at/, meta.modifiedAt)
                       .replace(/#@#@post-content/, () => escapedContent)
}

function deployPosts() {
    File.copy(env.OUTPUT_META, env.DEPLOY_META)
    
    for (let output_post of Dir.read(env.OUTPUT_POST))
        File.copy(`${env.OUTPUT_POST}/${output_post}`, `${env.DEPLOY_POST}/${output_post}`);
}