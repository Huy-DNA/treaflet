# A Simple And Stupid Script For Generating The Blog's Posts

## Requirements

* `npm`: `^16.0.0`

## Instructions

* Make a directory named after your blog post in `post-input`.
* Write a `meta.json` for that post.
    * `id` (required): unique
    * `title` (required): name of that post
    * `summary` (required): summary of the post, if there isn't, leave it blank
    * `createdAt` (required): date of creation
    * `modifiedAt` (required): data of modification
    * `thumbnailURL` (optional): thumbnail of the post,
    * `tag` (required): A list of tags for the post,
* Write a `content.md` for that post.
* Run `npm run deploy`.

The post is now deployed.
