
# 🎬 The Cinematic Scroll-Scrubbed Hero Section Guide

This guide walks you through the complete pipeline for creating a premium, Apple-style scroll animation for a Hero Section in React using GSAP and an HTML5 Canvas.

Follow these steps to go from a static product image to a fully coded, 60fps interactive scroll experience.

---

## Step 1: AI Video Generation
First, we need to generate a high-quality video of your product in motion.

1. **Get a Prompt:** Take a high-quality photo of your product (or find a reference image) and upload it to an AI chat agent (ChatGPT, Gemini, Claude). Tell the AI what kind of cinematic camera movement or environmental animation you want, and ask it to write a **"Professional Video Generation Prompt"**.
2. **Generate the Video:** Take that professional prompt and go to an AI video generator like **Google Veo 3**, **Higgsfield**, Runaway Gen-3, or Sora. Paste your prompt and generate a smooth, cinematic video clip. Download the final `.mp4` file.

---

## Step 2: Convert Video to Image Frames
React Canvas animations don't actually play a video; they rapidly swap still images based on your scroll position. 

1. Go to **[Ezgif.com - Video to JPG](https://ezgif.com/video-to-jpg)**.
2. Upload your generated `.mp4` video.
3. In the conversion settings, set the **Frame Rate (FPS) to 30** (or higher for smoother scrubbing, but watch your file sizes).
4. Click **Convert to JPG/PNG** and download the resulting `.zip` folder.
5. Extract the `.zip` folder.

---

## Step 3: Project Integration
1. Open your React/Vite project.
2. Inside your `public/` folder, create a new folder (e.g., `public/frames/`).
3. Paste all of your extracted images into this folder. 
   *(Note the naming convention of the files, for example: `frame-001.png`, `frame-002.png`. You will need this for the code prompt).*

---

## Step 4: The Master Code Prompt
Now, copy the prompt below and paste it into any advanced AI coding agent (Claude , Gemini , ChatGPT). 

⚠️ **CRITICAL:** Before hitting enter, make sure you change the **`[BRACKETED VARIABLES]`** to match your exact project details, folder paths, and total frame count!

### ✂️ Copy and Paste This Prompt:

> **Act as a Senior Creative Frontend Developer.** I need you to build a cinematic, full-screen Hero Section in React using GSAP and ScrollTrigger. 
>
> The core mechanic is an **HTML5 Canvas that scrubs through an image sequence** tied to the user's scroll position (similar to Apple product pages).
>
> **Here are the exact variables for this project:**
> * **Frame Count:** `[INSERT NUMBER OF FRAMES, e.g., 240]`
> * **Image Path Template:** `[INSERT PATH, e.g., /frames/frame-${String(i).padStart(3, '0')}.png]`
> * **Eyebrow Text:** `[INSERT EYEBROW, e.g., NorthEast Assam · India]`
> * **Main Headline:** `[INSERT HEADLINE, e.g., Heritage]`
> * **Sub-headline:** `[INSERT SUB-HEADLINE, e.g., The Art of Single-Estate Cultivation]`
> * **Theme Color:** `[INSERT CSS VARIABLE OR HEX, e.g., var(--col-void)]`
>
> **Technical Requirements:**
> 1. **Canvas Setup:** Use a `useRef` for the canvas. In a `useEffect`, create a render loop that draws the current image frame. The math must mimic `object-fit: cover` so the image perfectly fills the screen without stretching, regardless of window resize.
> 2. **Preloading:** Write a loop that preloads all images into an array before rendering.
> 3. **GSAP ScrollTrigger:** Create a GSAP timeline that pins the section (`pin: true`) for a duration proportional to the frame count (e.g., `end: "+=6000"`). Scrub through the frame object from 1 to the max frame count.
> 4. **Text Animation:** The text container should fade to `opacity: 0` and move up (`y: -80`) during the **first 15%** of the scroll timeline.
>
> **Styling & Layout Requirements (Inline Styles):**
> * The section must be `100vh`, `100% width`, and `overflow: hidden`.
> * Include a **Radial Vignette Overlay** `div` above the canvas (opacity ~0.6, darkening the center slightly for text contrast).
> * Include a **Bottom Linear Gradient Overlay** `div` (bottom 35% of the screen fading to transparent) so it blends seamlessly into the next section.
> * **Typography:** The Hero Text container must be absolutely centered with `flex-column`. 
> * **Shadows:** The Main Headline needs a premium layered text shadow for depth (e.g., `0 4px 40px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.6)`).
> * Add a decorative vertical hairline `div` (1px wide, 3rem tall, fading gradient) beneath the sub-headline.
>
> Please output the complete, single-file React component.

---

## 💡 Customization Examples
Whenever you start a new project (e.g., a website for a Coffee Shop, a Car Brand, or a Tech Product), just reuse the prompt above and tweak the variables.

**Example 1: Coffee Shop**
* **Frame Count:** `120`
* **Image Path Template:** `/assets/coffee-pour/img-${String(i).padStart(4, '0')}.jpg`
* **Main Headline:** `Dark Roast`

**Example 2: Sports Car Reveal**
* **Frame Count:** `300`
* **Image Path Template:** `/frames/car-pan-${String(i).padStart(3, '0')}.png`
* **Main Headline:** `Electric Performance`