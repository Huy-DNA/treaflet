import originalPostMetas from "~~/data/post-metas"

export default function getPostsMetas(
        sort: boolean = false,
        comparefn: (p1: PostMeta, p2: PostMeta) => -1 | 0 | 1 = comparePostCreationDate,
        ) {
    const postMetas = [...originalPostMetas]

    if (sort)
        postMetas.sort(comparefn)

    return postMetas
}