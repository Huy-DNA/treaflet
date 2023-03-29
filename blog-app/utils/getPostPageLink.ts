import slugify from 'slugify'

export default function getPostPageLink({ title }: { title: string }): string {
    return `/posts/post/${slugify(title, {lower: true, remove: /[`'"]/g})}`
}