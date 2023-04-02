import slugify from 'slugify'

export default function getPostPageLink({ title }: { title: string }): string {
    return `/posts/${slugify(title, {lower: true, remove: /[`'"]/g})}`
}