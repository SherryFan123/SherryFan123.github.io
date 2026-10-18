#!/usr/bin/env python3
"""Transcode any new videos in /workspace/videos/<Folder>/ into media/ and append them to videos.js (every 3rd gets autoplay: true).
Tip: afterwards, reorder lines in videos.js to mix vertical/horizontal nicely.
Safe to re-run: skips files already present in videos.js."""
import os,re,subprocess,json
SRC="/workspace/videos"; HERE=os.path.dirname(os.path.abspath(__file__))
FOLDERS=["Vertical","Camera","Assist","Horiz","DP"]  # source folders scanned (order doesn't matter on site)
def title(fn):
    s=os.path.splitext(fn)[0]
    m=re.search(r"YouTube_(.+?)_Media_",s)
    if m: s=m.group(1)
    s=re.sub(r"^(YTDown\.com_|WSJ_)","",s)
    s=re.sub(r"_(Horiz|Vert(ical)?|V\d+|\d{3,4}p|FINAL|final)\b","",s)
    s=re.sub(r"[_\-]+"," ",s).strip()
    return s.title() if s.isupper() or s.islower() else s
js=open(os.path.join(HERE,"videos.js")).read(); new=[]
n_existing=js.count("source:")
for folder in FOLDERS:
    page=folder.lower()
    d=os.path.join(SRC,folder)
    if not os.path.isdir(d): continue
    for fn in sorted(os.listdir(d)):
        if not fn.lower().endswith((".mp4",".mov",".m4v",".mxf")) or fn.startswith("."): continue
        slug=page+"-"+re.sub(r"[^a-z0-9]+","-",os.path.splitext(fn)[0].lower()).strip("-")[:60]
        out=f"media/{slug}.mp4"; poster=f"media/{slug}.jpg"
        if f'"{out}"' in js: continue
        src=os.path.join(d,fn)
        w,h=map(int,subprocess.check_output(["ffprobe","-v","error","-select_streams","v:0","-show_entries","stream=width,height","-of","csv=p=0",src]).decode().split(",")[:2])
        vert=h>w; scale="scale=720:1280:force_original_aspect_ratio=decrease" if vert else "scale=1280:720:force_original_aspect_ratio=decrease"
        dur=float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",src]))
        vk=int(min(3000,(38*8*1000/dur)-128))  # keep each file under ~40 MB
        subprocess.run(["ffmpeg","-y","-v","error","-i",src,"-vf",scale+",scale=trunc(iw/2)*2:trunc(ih/2)*2","-c:v","libx264","-preset","medium","-b:v",f"{vk}k","-maxrate",f"{vk}k","-bufsize",f"{2*vk}k","-pix_fmt","yuv420p","-c:a","aac","-b:a","128k","-movflags","+faststart",os.path.join(HERE,out)],check=True)
        subprocess.run(["ffmpeg","-y","-v","error","-ss","2","-i",os.path.join(HERE,out),"-frames:v","1","-q:v","4",os.path.join(HERE,poster)],check=True)
        auto=(n_existing+len(new))%3==0
        new.append(f'  {{ title: {json.dumps(title(fn))}, source: "{out}", poster: "{poster}"{", vertical: true, section: \"wsj-app\"" if vert else ""}{", autoplay: true" if auto else ""} }},  // {fn}')
if new:
    js=js.replace("// @@VIDEOS@@","\n".join(new)+"\n// @@VIDEOS@@")
    open(os.path.join(HERE,"videos.js"),"w").write(js)
print(f"added {len(new)}")
