# Sherry Fan — Video Portfolio

Live site: https://sherryfan123.github.io/

**Home (WSJ):** vertical clips stay 9:16 and horizontals 16:9. All videos autoplay muted (click to unmute).

**Production Crew:** larger 16:9 tiles; clean YouTube thumbnails (no chrome) — click to play.

**DP Work:** same tile sizes and muted autoplay as the WSJ page; local preview files in `media/`.

One dark, video-first site. **Home** (`index.html`) is the WSJ reel grid. **Production Crew** (`production-crew.html`) embeds YouTube work. **DP Work** (`dp-work.html`) holds DP / Sucka clips. Edit everything in **`videos.js`**.

## Remove / reorder a video
Delete or move its line in `videos.js`. Line order = grid order within that section (verticals are still sorted above horizontals on Home and DP Work).

## Add a video
```js
{ title: "My Film", source: "https://www.youtube.com/watch?v=XXXXXXXXXXX", section: "crew", autoplay: true },
{ title: "WSJ Piece", source: "media/my-piece.mp4", poster: "media/my-piece.jpg", vertical: true },
{ title: "DP Clip", source: "media/dp-my-clip.mp4", poster: "media/dp-my-clip.jpg", vertical: true, section: "dp" },
```
- `source`: local `media/…`, Vimeo URL/ID, or YouTube URL/ID
- `section`: `"home"` (default if omitted), `"crew"`, or `"dp"`
- `vertical: true` for 9:16
- `autoplay: true` = muted loop while on screen (~1 in 3; Home and DP Work autoplay everything anyway)

## Editing on GitHub (no tools needed)
1. Open https://github.com/SherryFan123/SherryFan123.github.io and click **videos.js**.
2. Click the **pencil icon** (Edit this file).
3. Delete / edit / move a line.
4. **Commit changes…** → **Commit changes**. Live site updates in about a minute.

## Local previews
`python3 build_media.py` makes 720p H.264 previews + thumbnails for new files in `/workspace/videos/<Folder>/` and appends them to `videos.js` (home section by default; set `section: "dp"` by hand for DP Work).

## Preview locally
`python3 -m http.server 8080` in this folder → http://localhost:8080  
After editing CSS/JS, bump the `?v=` numbers in the HTML files.
