# Sherry Fan — Video Portfolio

Live site: https://sherryfan123.github.io/

**Home:** vertical clips stay 9:16 and horizontals 16:9, sharing the same tile **height** so nothing looks tiny. All home videos autoplay muted (click to unmute).

**Production Crew:** larger 16:9 tiles; clean YouTube thumbnails (no chrome) — click to play.

One dark, video-first site. **Home** (`index.html`) is the WSJ reel grid. **Production Crew** (`production-crew.html`) embeds YouTube work. Edit everything in **`videos.js`**.

## Remove / reorder a video
Delete or move its line in `videos.js`. Line order = grid order within that section.

## Add a video
```js
{ title: "My Film", source: "https://www.youtube.com/watch?v=XXXXXXXXXXX", section: "crew", autoplay: true },
{ title: "WSJ Piece", source: "media/my-piece.mp4", poster: "media/my-piece.jpg", vertical: true },
```
- `source`: local `media/…`, Vimeo URL/ID, or YouTube URL/ID
- `section`: `"home"` (default if omitted) or `"crew"`
- `vertical: true` for 9:16
- `autoplay: true` = muted loop while on screen (~1 in 3)

## Editing on GitHub (no tools needed)
1. Open https://github.com/SherryFan123/SherryFan123.github.io and click **videos.js**.
2. Click the **pencil icon** (Edit this file).
3. Delete / edit / move a line.
4. **Commit changes…** → **Commit changes**. Live site updates in about a minute.

## Local previews
`python3 build_media.py` makes 720p H.264 previews + thumbnails for new files in `/workspace/videos/<Folder>/` and appends them to `videos.js` (home section).

## Preview locally
`python3 -m http.server 8080` in this folder → http://localhost:8080  
After editing CSS/JS, bump the `?v=` numbers in the HTML files.
