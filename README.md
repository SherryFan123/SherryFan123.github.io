# Sherry Fan — Video Portfolio

Live site: https://sherryfan123.github.io/

Four pages, one dark video-first style. Edit everything in **`videos.js`**; the `section` on each line picks the page:

| Page | File | `section` |
|---|---|---|
| WSJ (horizontal WSJ videos) | `index.html` | `"home"` (default if omitted) |
| WSJ App (vertical WSJ videos) | `wsj-app.html` | `"wsj-app"` |
| Production Crew (YouTube) | `production-crew.html` | `"crew"` |
| DP Work | `dp-work.html` | `"dp"` |

**Playback:** every video on every page autoplays muted while it's on screen (YouTube included). Clicking a video turns its sound on; clicking another one moves the sound there and mutes the first (it keeps playing). Click the same video again to mute it. A small speaker icon in the corner shows which one has sound.

**Sizes:** verticals 396×704, horizontals 666×375 (Production Crew tiles 456×257). Rows are centered on every page. Verticals are listed above horizontals on each page.

**Header:** phone, email and IMDb link live in each HTML file under "Sherry Fan" (`<p class="contact">`).

## Remove / reorder / move a video
Delete or move its line in `videos.js`. Line order = grid order within that page. To move a video to another page, change its `section`.

## Add a video
```js
{ title: "My Film", source: "https://www.youtube.com/watch?v=XXXXXXXXXXX", section: "crew", autoplay: true },
{ title: "WSJ Piece", source: "media/my-piece.mp4", poster: "media/my-piece.jpg" },
{ title: "WSJ App Piece", source: "media/my-vert.mp4", poster: "media/my-vert.jpg", vertical: true, section: "wsj-app" },
{ title: "DP Clip", source: "media/dp-my-clip.mp4", poster: "media/dp-my-clip.jpg", vertical: true, section: "dp" },
```
- `source`: local `media/…`, Vimeo URL/ID, or YouTube URL/ID
- `section`: `"home"` (WSJ, default), `"wsj-app"`, `"crew"`, or `"dp"`
- `vertical: true` for 9:16
- `autoplay` is no longer needed (everything autoplays muted)

## Editing on GitHub (no tools needed)
1. Open https://github.com/SherryFan123/SherryFan123.github.io and click **videos.js**.
2. Click the **pencil icon** (Edit this file).
3. Delete / edit / move a line.
4. **Commit changes…** → **Commit changes**. Live site updates in about a minute.

## Local previews
`python3 build_media.py` makes 720p H.264 previews + thumbnails for new files in `/workspace/videos/<Folder>/` and appends them to `videos.js` (verticals go to `"wsj-app"`, horizontals to `"home"`; set `section: "dp"` by hand for DP Work).

## Preview locally
`python3 -m http.server 8080` in this folder → http://localhost:8080  
After editing CSS/JS, bump the `?v=` numbers in the HTML files.
