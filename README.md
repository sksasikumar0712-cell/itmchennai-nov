# LTM Chennai Tech Careers — by productwithsasi

A mobile-friendly, independently curated job directory for **31 LTM roles shown on the official Chennai-filtered careers page on 20 November 2026**.

## Features
- Search titles, skills, categories and job IDs instantly.
- Filter by job family and experience range; sort by requirements.
- Copy each role's job ID and open the official LTM careers listings page to find and apply.
- Responsive mobile-first cards, sticky search, accessible keyboard controls, light design and LinkedIn creator credit.
- No registration, tracking, API keys, backend, or fake application forms.

## Data provenance and limitations
This directory is a **dated snapshot**, manually transcribed from the supplied 20 Nov 2026 screenshot of LTM's Chennai-filtered RippleHire careers site. The screenshot showed 31 listings, some shared across multiple cities. A few long titles and locations were clipped in the original screenshot; those entries are labeled accordingly instead of inventing missing text. These listings are **not a live feed** and roles can close or change.

The screenshot did not expose unique application URLs for each job. Every “Official careers” action therefore opens the known-good [official Chennai-filtered LTM listings](https://ltm.ripplehire.com/candidate/?token=xviyQvbnyYZdGtozXoNm&lang=en&source=CAREERSITE#list/geo=India&location=Chennai%20-%20Tamilnadu%2BChennai). The role's Job ID is available to copy and look up there. Never claim that this is a direct individual job application URL.

This is an independent directory by productwithsasi, not endorsed by LTM. **LTM does not charge candidates for recruitment**. Verify all vacancies and details on the employer's website.

## Consistent productwithsasi branding
Use the shared visual identity across all employer directories: blue `#0a66c2`, light blue `#edf5ff`, a white background and the creator-first header and LinkedIn footer from the UnitedHealth Group India Tech Jobs Directory. **Do not copy employer colors or put employer logos in the hero or favicon.** Show the employer name as ordinary text to identify the listings. The blue arrow favicon is shared with the reference directory.

## Running locally
No build tools or dependencies required:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Deployment
The repository is plain HTML/CSS/JavaScript and deploys as a static site:
- **Vercel**: import this GitHub repo; Framework Preset “Other”, no build command, output directory `.`.
- **GitHub Pages**: enable Pages for the `main` branch / root.
- **Netlify**: publish directory `.`.

The site includes SEO and Open Graph text metadata, a privacy-friendly SVG favicon, a robots file and a manually curated dataset.

## Maintenance
Update the role data in `app.js` against the **official** careers portal, remove unavailable jobs and update the displayed snapshot date. Jobs can be filtered and their IDs can be copied, but application availability is controlled solely by LTM.

Creator: [productwithsasi on LinkedIn](https://www.linkedin.com/in/sasikumarsampath/).
