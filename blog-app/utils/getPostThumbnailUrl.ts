export default function getPostThumbnailUrl(postMeta: PostMeta): string {
    return postMeta.thumbnailUrl ? postMeta.thumbnailUrl : '/post-thumbnails/default-thumbnail.svg'
}