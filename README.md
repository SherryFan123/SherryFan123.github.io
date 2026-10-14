# Sherry Fan — Video Portfolio

One-page static site: every video in one mixed grid on `index.html`. The only file you edit is **`videos.js`**.

## Remove a video
Delete its line in `videos.js`. Save.

## Add a video
```js
{ title: "My Film", source: "https://vimeo.com/123456789", vertical: true, autoplay: true },
```
- `source`: Vimeo link/ID or local file (`media/my-film.mp4`)
- `vertical: true` for 9:16 videos
- `autoplay: true` = plays muted & looping while on screen (use on ~1 in 3); others play with controls on click
- Line order = grid order (columns fill top-to-bottom, so alternate vertical/horizontal for a nice mix)

## Auto-add new local files
`python3 build_media.py` makes 720p H.264 previews + thumbnails for new files in `/workspace/videos/<Folder>/` and appends them to `videos.js`.

## Preview
`python3 -m http.server 8080` here, open http://localhost:8080. After editing CSS/JS, bump the `?v=` numbers in index.html.

## Editing on GitHub (no tools needed)
1. Go to https://github.com/SherryFan123/SherryFan123.github.io and click **videos.js**.
2. Click the **pencil icon** (Edit this file).
3. Delete the line for the video you want to remove (or change a `title`, or move lines to reorder).
4. Click **Commit changes…**, then **Commit changes**. The live site updates in about a minute.
