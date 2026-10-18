// ============================================================
//  ALL VIDEOS LIVE HERE. Delete a line to remove a video.
//  Reorder lines within a section to reorder that page's grid.
//  source:   local ("media/x.mp4") | Vimeo URL/ID | YouTube URL/ID
//  section:  which page the video appears on:
//              "home"    = WSJ page (index.html, horizontal videos; default if omitted)
//              "wsj-app" = WSJ App page (wsj-app.html, vertical videos)
//              "crew"    = Production Crew page
//              "dp"      = DP Work page
//  poster:   optional thumbnail (local videos)
//  vertical: true for 9:16 videos
//  Every video on every page autoplays muted while on screen.
//  Click a video to turn its sound on (only one plays sound at a time).
// ============================================================
window.VIDEOS = [
  { title: "Spirit Airlines", source: "media/camera-vv-spiritairv3c.mp4", poster: "media/camera-vv-spiritairv3c.jpg", vertical: true, section: "wsj-app", autoplay: true },  // vv.spiritairv3c.mp4
  { title: "Wisconsin Sturgeon", source: "media/vertical-022026-wissturgeon-sf.mp4", poster: "media/vertical-022026-wissturgeon-sf.jpg", vertical: true, section: "wsj-app" },  // 022026_WISSTURGEON_SF.mp4
  { title: "Hungary Elections", source: "media/vertical-vv-hungelexksnewtitle.mp4", poster: "media/vertical-vv-hungelexksnewtitle.jpg", vertical: true, section: "wsj-app" },  // vv.hungelexksnewtitle.mp4
  { title: "529 Plans", source: "media/vertical-33126-vv-529plans.mp4", poster: "media/vertical-33126-vv-529plans.jpg", vertical: true, section: "wsj-app" },  // 33126_VV.529PLANS.mp4
  { title: "Oil Prices", source: "media/vertical-vv-oil-prices-cah-v4.mp4", poster: "media/vertical-vv-oil-prices-cah-v4.jpg", vertical: true, section: "wsj-app" },  // vv.oil.prices.cah.v4.mp4
  { title: "Heard on the Street: Tesla’s AI Spending", source: "media/vertical-042426-vv-heardtesla.mp4", poster: "media/vertical-042426-vv-heardtesla.jpg", vertical: true, section: "wsj-app" },  // 042426_VV.HEARDTESLA.mp4
  { title: "U.S. Fighters in Africa", source: "media/vertical-022326afrusfighters-sf.mp4", poster: "media/vertical-022326afrusfighters-sf.jpg", vertical: true, section: "wsj-app" },  // 022326AFRUSFIGHTERS_SF.mp4
  { title: "Inflation", source: "media/camera-041026vv-inflation04101c.mp4", poster: "media/camera-041026vv-inflation04101c.jpg", vertical: true, section: "wsj-app" },  // 041026vv.inflation04101c.mp4
  { title: "Middle Class Rich (Vertical)", source: "media/camera-040426vv-middlerich.mp4", poster: "media/camera-040426vv-middlerich.jpg", vertical: true, section: "wsj-app" },  // 040426vv.middlerich.mp4
  { title: "Divorce: Who Gets What?", source: "media/camera-vv-dw-warv5.mp4", poster: "media/camera-vv-dw-warv5.jpg", vertical: true, section: "wsj-app", autoplay: true },  // vv.dw.warv5.mp4
  { title: "How Divorce Affects Children", source: "media/camera-dw-kids-v7-c.mp4", poster: "media/camera-dw-kids-v7-c.jpg", vertical: true, section: "wsj-app" },  // dw-kids-v7-c.mp4
  { title: "Adjustable-Rate Mortgages Return", source: "media/assist-vv-armresurgencefinal.mp4", poster: "media/assist-vv-armresurgencefinal.jpg", vertical: true, section: "wsj-app" },  // vv.armresurgencefinal.mp4
  { title: "Inflation Bonds", source: "media/camera-vv-inflationbondsfinecut4.mp4", poster: "media/camera-vv-inflationbondsfinecut4.jpg", vertical: true, section: "wsj-app", autoplay: true },  // vv.inflationbondsfinecut4.mp4
  { title: "Policy Explainer", source: "media/assist-v5.mp4", poster: "media/assist-v5.jpg", vertical: true, section: "wsj-app" },  // V5.mp4
  { title: "Ship Seizure", source: "media/camera-042326shipseizurestj.mp4", poster: "media/camera-042326shipseizurestj.jpg" },  // 042326shipseizurestj.mp4
  { title: "Middle Class Rich", source: "media/camera-040426middlerich.mp4", poster: "media/camera-040426middlerich.jpg", autoplay: true },  // 040426middlerich.mp4
  { title: "Shahed Drones", source: "media/assist-shaheddroneshoriz-4.mp4", poster: "media/assist-shaheddroneshoriz-4.jpg", autoplay: true },  // SHAHEDDRONESHORIZ.4.mp4
  { title: "SCOTUS Tariffs", source: "media/horiz-wsj-scotustarriffs-chart-horiz-v3.mp4", poster: "media/horiz-wsj-scotustarriffs-chart-horiz-v3.jpg", autoplay: true },  // WSJ_SCOTUSTARRIFFS_CHART_Horiz_V3.mp4
  { title: "Inside the White House’s Meme Strategy", source: "media/horiz-ytdown-com-youtube-inside-the-white-house-s-meme-strategy-t-.mp4", poster: "media/horiz-ytdown-com-youtube-inside-the-white-house-s-meme-strategy-t-.jpg" },  // YTDown.com_YouTube_Inside-the-White-House-s-Meme-Strategy-t_Media_Dz8fPDkgl2k_001_1080p.mp4
  { title: "NCT 127: The Lost Boys — Teaser | Disney+", source: "https://www.youtube.com/watch?v=68zc1TV-3N4", section: "crew", autoplay: true },
  { title: "Fallen Idols: Nick and Aaron Carter — Official Trailer", source: "https://www.youtube.com/watch?v=i7_DXJqW6hY", section: "crew" },
  { title: "Christiane Amanpour — The Amanpour Hour & Covering War in Gaza | The Daily Show", source: "https://www.youtube.com/watch?v=d7JvuQPFG7E", section: "crew" },
  { title: "Jon Stewart’s DNC Recap: Oprah Calls Out Cat Ladies, Dem Vibes & Kamala’s Moment | The Daily Show", source: "https://www.youtube.com/watch?v=e_gkEviOWIk", section: "crew" },
  { title: "Jon Stewart Tackles the RNC and Trump Assassination Attempt | The Daily Show", source: "https://www.youtube.com/watch?v=u8yL3I_6Oco", section: "crew" },
  { title: "Sucka", source: "media/dp-sucka-sfx.mp4", poster: "media/dp-sucka-sfx.jpg", vertical: true, section: "dp" },  // SUCKA SFX.mov — guessed title
  { title: "Sucka (Draft)", source: "media/dp-draft-website.mp4", poster: "media/dp-draft-website.jpg", section: "dp" },  // DRAFT Website.mp4 — guessed title
  { title: "Mountain Valley Spring Water", source: "media/dp-mountainvalley-ad-v4-4k.mp4", poster: "media/dp-mountainvalley-ad-v4-4k.jpg", section: "dp" },  // MountainValley_ad_v4_4K.mp4
  { title: "Redwoods", source: "media/dp-new-1.mp4", poster: "media/dp-new-1.jpg", section: "dp" },  // dp-new-1.mp4
  { title: "YSL MYSLF", source: "media/dp-ysl-myslf.mp4", poster: "media/dp-ysl-myslf.jpg", section: "dp" },  // ysl-myslf.mp4
// @@VIDEOS@@
];
