# Adding graphics and video to Future Ready

## Where to put files

- **Images:** `assets/` (e.g. `assets/my-image.png`, `assets/megatrends/tech-hero.jpg`)
- **Videos:** `assets/` or host on Dropbox/YouTube/Vimeo and use the URL

Use lowercase and hyphens in filenames to avoid issues (e.g. `communications-skills.mp4`). If you use spaces, in HTML use the path as-is: `assets/My Image.png`; in JS you may need to encode spaces as `%20` in URLs.

---

## Welcome intro video (autoplay at start)

The game is set up to show a video **right at the start** of the welcome screen, above the text “One day your job might not exist.”

**How to add your video:**
1. Put your video file in the **`assets/`** folder.
2. Name it **`welcome-intro.mp4`** (or edit `index.html` and change the `src` in the `<video>` tag to your filename, e.g. `assets/Your Video Name.mp4`).
3. Use **MP4** (H.264) so it works in all major browsers.

**Behaviour:** The video autoplays when the welcome screen loads. It is **muted** by default (browsers require this for autoplay). Players can click **“Sound off — click to unmute”** to hear it. The video plays once; it does not loop.

**If your file is large:** Consider compressing it (e.g. with HandBrake or an online compressor) so the page loads quickly. For very long or large files, you could host on YouTube/Vimeo and embed an iframe instead, but then autoplay is less reliable and may show ads.

---

## 1. Adding graphics (images)

### Option A: Static image in HTML

Add an `<img>` where you want it. Examples:

**Welcome screen (hero or topic image):**
```html
<!-- In index.html, inside .welcome-content, e.g. after .welcome-header -->
<div class="welcome-media">
  <img src="assets/welcome-hero.png" alt="Future of work" class="welcome-hero-img">
</div>
```

**Above the first megatrend summary:**
```html
<img src="assets/impactful-technology.png" alt="Impactful technology" class="megatrend-img">
```

**In CSS** (optional), size and spacing:
```css
.welcome-hero-img, .megatrend-img {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
}
```

### Option B: Image per scenario or megatrend (dynamic)

1. Put images in `assets/`, e.g. `assets/scenario-tech.png`, `assets/scenario-climate.png`.
2. In `game.js`, add a mapping (e.g. next to `SCENARIOS` or at the top with constants):
   ```js
   const SCENARIO_IMAGES = {
     tech: 'assets/scenario-tech.png',
     climate: 'assets/scenario-climate.png',
     demographics: 'assets/scenario-demographics.png',
     economic: 'assets/scenario-economic.png',
     diversity: 'assets/scenario-diversity.png'
   };
   ```
3. When you show the scenario, set an image container’s `src` from `SCENARIO_IMAGES[scenarioKey]`. For example, in `index.html` add a container inside the scenario card:
   ```html
   <div id="scenario-image-wrap" class="scenario-image-wrap" hidden>
     <img id="scenario-image" src="" alt="">
   </div>
   ```
   In `game.js`, in the function that renders the scenario (e.g. where you set `scenario-title` and `scenario-story`), add:
   ```js
   var imgWrap = document.getElementById('scenario-image-wrap');
   var imgEl = document.getElementById('scenario-image');
   var megatrendKey = state.currentMegatrend || 'tech';
   if (SCENARIO_IMAGES[megatrendKey]) {
     imgEl.src = SCENARIO_IMAGES[megatrendKey];
     imgEl.alt = state.currentMegatrendLabel || 'Scenario';
     imgWrap.hidden = false;
   } else {
     imgWrap.hidden = true;
   }
   ```

### Option C: Background image (CSS)

In `styles.css`:
```css
.welcome-content {
  background: var(--color-surface) url('assets/welcome-bg.png') no-repeat top center;
  background-size: cover; /* or contain, or 100% auto */
}
```

---

## 2. Adding video

### Option A: Link only (what you have now)

You already have a header link to the Communications Skills video. To add more:
- Add another `<a href="URL" target="_blank" rel="noopener">` in the header or in a section (e.g. welcome or how-to-play).

### Option B: Embedded video on the page

**Hosted in your project** (`assets/my-video.mp4`):
```html
<div class="video-wrap">
  <video class="media-video" controls preload="metadata" poster="assets/video-poster.jpg">
    <source src="assets/my-video.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>
```

**Hosted elsewhere (e.g. Dropbox, YouTube):**
- **YouTube:** Use “Share” → “Embed”, then paste the iframe in your HTML:
  ```html
  <div class="video-wrap video-wrap--16x9">
    <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Video title" allowfullscreen></iframe>
  </div>
  ```
- **Dropbox:** Use a direct link to the file for download; for in-page play, use a link or an HTML5 `<video>` if you have a direct MP4 URL (some hosts allow this).

**Suggested places to embed:**
- **How to play panel** (`#how-to-play-panel`): add the `<video>` or iframe after the `<ol>` so players can watch without leaving the page.
- **Welcome section:** one short intro or “Why this matters” video above or below the text.
- **Quiz result / Feedback:** usually keep these quick; video is better on welcome or how-to-play.

**CSS for responsive video:**
```css
.video-wrap {
  margin: 1rem 0;
  border-radius: var(--radius-md);
  overflow: hidden;
}
.video-wrap .media-video {
  width: 100%;
  max-height: 60vh;
  display: block;
}
.video-wrap--16x9 {
  aspect-ratio: 16 / 9;
  max-width: 640px;
}
.video-wrap--16x9 iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
```

---

## 3. Quick reference

| Goal                     | Use |
|--------------------------|-----|
| One image on welcome     | `<img src="assets/…">` in `index.html` |
| Image per scenario       | `SCENARIO_IMAGES` in `game.js` + container in HTML + set `src` when showing scenario |
| Background for a section | `background: url('assets/…')` in `styles.css` |
| One video on the page    | `<video>` or YouTube `<iframe>` in `index.html` |
| Extra video links        | `<a href="…">` in header or any section |

If you tell me exactly where you want a graphic or video (e.g. “hero on welcome”, “video in How to play”, “image for each scenario”), I can add the exact HTML/JS/CSS for that spot.
