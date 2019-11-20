import marked from 'marked'
import hljs from 'highlight.js'

export const markdownToHtml = (text: string) => {
    return marked(text, {
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: (code: string) => {
            return hljs.highlightAuto(code).value
        }
    })
}
