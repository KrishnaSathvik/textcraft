#!/usr/bin/env python3
"""Generate src/data/blogPosts.json with new and refreshed blog content."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "data" / "blogPosts.json"

TOOL = {
    "word-counter": {"name": "Word Counter", "path": "/word-counter"},
    "case-converter": {"name": "Case Converter", "path": "/case-converter"},
    "line-breaks": {"name": "Line Breaks Remover", "path": "/line-breaks"},
    "diff-checker": {"name": "Text Diff Checker", "path": "/diff-checker"},
    "lorem-ipsum": {"name": "Lorem Ipsum Generator", "path": "/lorem-ipsum"},
    "text-sorter": {"name": "Text Sorter", "path": "/text-sorter"},
}


def rt(tools):
    return [TOOL[k] for k in tools]


def rp(slugs_titles):
    return [{"slug": s, "title": t} for s, t in slugs_titles]


posts = [
    # --- Writer-focused batch (ids 13–15) ---
    {
        "id": 13,
        "slug": "how-many-words-should-a-blog-post-be",
        "title": "How Many Words Should a Blog Post Be? A Practical Word Count Guide",
        "metaTitle": "How Many Words Should a Blog Post Be? | Word Count Guide",
        "metaDescription": "Learn practical word count ranges for blog posts, SEO articles, essays, landing pages, and social posts, plus how to check word count quickly.",
        "excerpt": "Practical word count ranges for blog posts, essays, landing pages, and social captions—plus how to check your draft before you publish.",
        "quickAnswer": "Most blog posts land between 800 and 2,000 words depending on intent: short updates can work at 500–800 words, while tutorials and guides often need 1,500–2,500 words. Paste your draft into TextCraft Word Counter to see exact word count, reading time, and whether you are in range before publishing.",
        "keyTakeaways": [
            "Match length to search intent—a quick answer post can be shorter than a step-by-step guide.",
            "1,000–1,800 words is a common sweet spot for informational blog posts that rank and retain readers.",
            "Essays and assignments follow instructor rules (often 500–1,000 words), not SEO benchmarks.",
            "Reading time matters as much as word count—aim for 5–8 minutes for many how-to articles.",
            "Check the final exported text, not the draft with comments or track changes.",
        ],
        "content": """## Common blog post word count ranges

There is no single magic number, but these ranges help writers plan before drafting:

| Post type | Typical word count | Why |
|-----------|-------------------|-----|
| News update or announcement | 400–800 | Readers want the point fast |
| How-to tutorial | 1,200–2,500 | Steps, screenshots, and examples need room |
| Listicle (10 tips) | 1,000–1,800 | ~100–150 words per item plus intro |
| Pillar guide / cornerstone | 2,000–4,000+ | Covers a topic comprehensively |
| Product comparison | 1,500–2,500 | Tables, pros/cons, and verdict |

Use these as planning targets, then verify with [Word Counter](/word-counter) after you write.

## Short posts vs long-form guides

**Short posts** work when the reader already knows the context: a product changelog, a weekly roundup, or a single-tip email newsletter. If someone can act on your advice in under three minutes, a 600-word post may be enough.

**Long-form guides** earn their length when they replace a scattered Google search—troubleshooting a problem end to end, comparing options, or teaching a skill from zero. Padding with fluff hurts both readers and rankings; every section should answer a real question.

Ask: *Would a reader feel cheated if this were shorter?* If yes, add substance. If no, cut.

## Word count by content type

Beyond blogs, writers hit different limits:

- **College essays:** Often 500, 750, or 1,000 words—always confirm the syllabus.
- **Cover letters:** 250–400 words (about one screen).
- **Landing pages:** Hero + benefits sections often total 400–800 words above the fold; full pages may reach 1,200+.
- **LinkedIn posts:** 150–300 words for engagement; articles can go longer.
- **Meta descriptions:** ~150–160 **characters**, not words—count separately.
- **YouTube scripts:** Plan speaking time (see our [reading and speaking time guide](/blog/reading-time-speaking-time-word-count)).

## How word count affects readability

Longer is not automatically better. Dense 3,000-word walls without headings lose readers. Shorter posts with clear structure often outperform bloated competitors.

Signals that length is working:

- Subheadings every 200–400 words
- Short paragraphs (2–4 sentences)
- Bullets or tables for scannable facts
- A clear takeaway in the first 100 words

If your word count is high but time-on-page is low, tighten—not expand.

## SEO word count myths

**Myth:** Google requires 2,000+ words to rank.
**Reality:** Top results for many queries are 800–1,500 words. Depth and relevance beat arbitrary length.

**Myth:** Longer posts always rank higher.
**Reality:** Thin content fails; so does repetitive filler. Match top-ranking pages for your keyword, then add unique examples.

**Myth:** Word count alone fixes traffic.
**Reality:** Title, intent match, internal links, and usefulness matter more than hitting a number.

## How to use TextCraft Word Counter

1. Open [Word Counter](/word-counter).
2. Paste your draft (from Google Docs, Notion, or your CMS export).
3. Review **words**, **characters**, **sentences**, and **paragraphs** in real time.
4. Check **reading time** and **speaking time** estimates.
5. Use **Copy** or **Download** if you need to save a snapshot for an editor.

Everything runs in your browser—your draft is not uploaded to a server.

## Example: checking a draft before publishing

You finished a post titled *"How to Clean Up Pasted Text."* Before scheduling:

1. Paste the body into Word Counter.
2. Result: **1,247 words**, **5 min 32 sec** reading time.
3. Your content brief asked for 1,200–1,500 words—you are in range.
4. The intro is 180 words; you trim 40 words to get readers to the steps faster.
5. Re-paste and confirm: **1,207 words**, reading time still under six minutes.

That two-minute check prevents awkward surprises after publish.

## Reading time and speaking time

TextCraft estimates:

- **Reading time** at ~225 words per minute (average silent reading)
- **Speaking time** at ~130 words per minute (presentations, podcasts, video)

| Words | Reading time | Speaking time |
|-------|--------------|---------------|
| 500 | ~2 min | ~4 min |
| 1,000 | ~4.5 min | ~8 min |
| 1,500 | ~7 min | ~12 min |
| 2,000 | ~9 min | ~15 min |

For a deeper breakdown, read [Reading Time and Speaking Time: How Word Count Translates to Minutes](/blog/reading-time-speaking-time-word-count).""",
        "relatedToolSlug": "word-counter",
        "relatedTools": rt(["word-counter", "case-converter"]),
        "relatedPosts": rp([
            ("word-counting-beyond-simple", "Word Counting: Beyond Simple Character Counting"),
            ("reading-time-speaking-time-word-count", "Reading Time and Speaking Time: How Word Count Translates to Minutes"),
            ("mastering-text-case-conversion", "Mastering Text Case Conversion: A Developer's Complete Guide"),
        ]),
        "faqs": [
            {
                "question": "What is the best word count for a blog post?",
                "answer": "For many informational topics, 1,000–1,800 words is a practical target. Match length to intent—quick updates can be shorter; tutorials and guides often need more depth.",
            },
            {
                "question": "Is 500 words enough for a blog post?",
                "answer": "Yes, for focused updates, announcements, or narrow questions with a single clear answer. It is usually too short for comprehensive how-to guides unless the topic is genuinely simple.",
            },
            {
                "question": "Are longer blog posts better for SEO?",
                "answer": "Not automatically. Longer posts can cover more subtopics, but quality, intent match, and structure matter more than hitting an arbitrary word count.",
            },
            {
                "question": "How many words should an essay be?",
                "answer": "Follow your assignment prompt—common limits are 500, 750, 1,000, or 1,500 words. Use Word Counter on your exported final text, not a draft with comments.",
            },
            {
                "question": "How do I check word count online?",
                "answer": "Paste your text into TextCraft Word Counter. Counts update instantly in your browser with no account required.",
            },
            {
                "question": "What is reading time?",
                "answer": "Reading time estimates how long an average reader needs to finish your text. TextCraft divides word count by about 225 words per minute.",
            },
        ],
        "category": "counting",
        "author": "TextCraft Team",
        "date": "2026-06-24",
        "updated": "2026-06-24",
        "readTime": "8 min read",
        "tags": ["Blog Writing", "Word Count", "SEO", "Content Strategy", "Reading Time"],
        "featured": True,
    },
    {
        "id": 14,
        "slug": "title-case-vs-sentence-case-headlines",
        "title": "Title Case vs Sentence Case: When to Use Each for Headlines and Buttons",
        "metaTitle": "Title Case vs Sentence Case | Headline Capitalization Guide",
        "metaDescription": "Learn the difference between title case and sentence case, when to use each, and how to convert headings, buttons, emails, and labels quickly.",
        "excerpt": "Title case vs sentence case for headlines, buttons, emails, and UI labels—with examples and a fast way to fix ALL CAPS paste.",
        "quickAnswer": "Title Case capitalizes major words in headlines and product names; sentence case capitalizes only the first word and proper nouns—common for buttons, form labels, and body-style headings. Use TextCraft Case Converter to switch between them in one click.",
        "keyTakeaways": [
            "Title case fits blog titles, book covers, and marketing headlines.",
            "Sentence case fits buttons, nav labels, and modern editorial style guides.",
            "ALL CAPS from email or PDF paste should be converted—not published as-is.",
            "Pick one style per surface (site nav vs blog H1) and stay consistent.",
            "TextCraft converts case locally—nothing leaves your browser.",
        ],
        "content": """## What is title case?

**Title case** (headline case) capitalizes the first letter of major words. Minor words—*a*, *an*, *the*, *and*, *but*, *or*, *for*, *nor*, *on*, *at*, *to*, *from*, *by*—are often lowercase unless they start the title.

**Example:** `How to Write Headlines That Get Clicks`

Style guides disagree on minor words (AP, Chicago, APA differ slightly). For web publishing, consistency across your site matters more than debating every *of* and *in*.

## What is sentence case?

**Sentence case** capitalizes only the first word and proper nouns—like a normal sentence.

**Example:** `How to write headlines that get clicks`

Sentence case feels conversational. Many product teams use it for buttons (`Save changes`), navigation (`Account settings`), and email subject lines in modern brands.

## Title case vs sentence case at a glance

| | Title Case | Sentence case |
|---|------------|---------------|
| **Feel** | Formal, editorial, "published" | Friendly, product UI, modern blog |
| **Common uses** | Blog H1, ebook titles, press releases | Buttons, labels, Slack/Notion headings |
| **Example** | `Five Tips for Better Newsletters` | `Five tips for better newsletters` |
| **Risk** | Can feel stiff on short UI strings | Can feel casual for formal reports |

Neither is "wrong"—mismatching them on the same page looks unpolished.

## When to use title case

- **Blog post titles** in WordPress, Ghost, or Substack
- **Email newsletter subject lines** (traditional marketing)
- **Report and whitepaper titles**
- **Slide deck titles** on a title slide
- **Book and chapter headings** in formal documents

If your CMS auto-formats H1 as title case, match your social preview and Open Graph title to the same style.

## When to use sentence case

- **Button labels:** `Create account`, not `Create Account` (unless your design system says otherwise)
- **Form field labels:** `Email address`
- **Navigation menus** in apps (Google, Apple, and many SaaS products use sentence case)
- **In-app notifications:** `Your export is ready`
- **Modern editorial blogs** that prefer a conversational tone

Check your company's design system—if it specifies sentence case for UI, do not title-case buttons for "marketing flair."

## Examples for headlines, buttons, emails, and labels

**Blog headline (title case):**
`Title Case vs Sentence Case: A Practical Guide for Writers`

**Same headline (sentence case):**
`Title case vs sentence case: a practical guide for writers`

**Button (sentence case):**
`Publish post`

**Button (title case—use only if your design system requires it):**
`Publish Post`

**Email subject (title case):**
`Your Weekly Writing Roundup`

**Email subject (sentence case):**
`Your weekly writing roundup`

**Fixing ALL CAPS from an old PDF:**
`TEAM OFFSITE AGENDA` → Title case: `Team Offsite Agenda` → Sentence case: `Team offsite agenda`

## How to convert text with TextCraft Case Converter

1. Open [Case Converter](/case-converter).
2. Paste your headline, button label, or email subject.
3. Select **Title Case** or **sentence case** (and preview UPPERCASE, lowercase, etc.).
4. Click **Apply** or copy the preview pane.
5. Paste into your CMS, Figma, or email tool.

Try the **hello world** example chip on the tool page to test instantly.

## Common capitalization mistakes

- **Publishing ALL CAPS subjects** from forwarded email—always normalize first.
- **Title-casing every button** on a sentence-case design system.
- **Inconsistent H1 vs social card title**—readers notice in previews.
- **Capitalizing every word in a long UI string**—`Save Your Changes Now` vs `Save your changes now`.
- **Mixing styles in one nav bar**—`Home`, `about us`, `Contact Us`.

For developer-oriented formats (camelCase, snake_case), see [Mastering Text Case Conversion](/blog/mastering-text-case-conversion).""",
        "relatedToolSlug": "case-converter",
        "relatedTools": rt(["case-converter", "word-counter"]),
        "relatedPosts": rp([
            ("mastering-text-case-conversion", "Mastering Text Case Conversion: A Developer's Complete Guide"),
            ("how-many-words-should-a-blog-post-be", "How Many Words Should a Blog Post Be? A Practical Word Count Guide"),
            ("alphabetize-list-online", "How to Alphabetize a List of Names or Lines Online"),
        ]),
        "faqs": [
            {
                "question": "What is title case?",
                "answer": "Title case capitalizes major words in a headline or title. Minor words like 'and' or 'the' may stay lowercase in the middle of a title, depending on your style guide.",
            },
            {
                "question": "What is sentence case?",
                "answer": "Sentence case capitalizes only the first word and proper nouns, like a normal sentence. It is common for buttons, labels, and modern editorial headlines.",
            },
            {
                "question": "Which is better for headlines?",
                "answer": "Title case is traditional for blog titles and formal publications. Sentence case is popular for a conversational tone. Pick one and use it consistently on your site.",
            },
            {
                "question": "Should button labels use title case or sentence case?",
                "answer": "Most modern product design systems use sentence case for buttons ('Save draft'). Title case on buttons ('Save Draft') is less common unless your brand guide requires it.",
            },
            {
                "question": "How do I convert uppercase text to sentence case?",
                "answer": "Paste the text into TextCraft Case Converter and choose sentence case or lowercase, then apply or copy the result.",
            },
            {
                "question": "Can I convert text online?",
                "answer": "Yes. TextCraft Case Converter runs in your browser—paste text, pick a format, and copy the output with no signup.",
            },
        ],
        "category": "case",
        "author": "TextCraft Team",
        "date": "2026-06-24",
        "updated": "2026-06-24",
        "readTime": "7 min read",
        "tags": ["Title Case", "Sentence Case", "Headlines", "Copywriting", "UI Writing"],
        "featured": True,
    },
    {
        "id": 15,
        "slug": "reading-time-speaking-time-word-count",
        "title": "Reading Time and Speaking Time: How Word Count Translates to Minutes",
        "metaTitle": "Reading Time and Speaking Time from Word Count | TextCraft",
        "metaDescription": "Learn how word count translates into reading time and speaking time for blog posts, presentations, scripts, speeches, and videos.",
        "excerpt": "Turn word count into reading minutes and speaking minutes—for blog posts, speeches, podcasts, and video scripts.",
        "quickAnswer": "Divide word count by ~225 for reading minutes (silent reading) and ~130 for speaking minutes (presentations and video). TextCraft Word Counter shows both automatically when you paste your script or blog draft.",
        "keyTakeaways": [
            "Average reading speed is about 200–250 words per minute; TextCraft uses 225 wpm.",
            "Average speaking speed is about 120–150 words per minute; TextCraft uses 130 wpm.",
            "A 5-minute speech is roughly 650 words; a 5-minute read is roughly 1,125 words.",
            "Adjust for audience, complexity, and pauses—estimates are starting points.",
            "Paste your final script into Word Counter before recording or going live.",
        ],
        "content": """## How reading time is estimated

Reading time answers: *How long will someone need to finish this article?*

TextCraft divides your **word count** by an average silent reading speed of **225 words per minute (wpm)**. That matches typical adult reading of plain English prose on a screen.

Factors that slow readers down:

- Dense technical jargon
- Long sentences and few paragraph breaks
- Tables, code blocks, or footnotes
- Non-native language readers in your audience

If your post is unusually technical, mentally add 10–20% to the estimate.

## How speaking time is estimated

Speaking time answers: *How long will this take to present aloud?*

TextCraft uses **130 wpm**—a comfortable pace for presentations, podcasts, and YouTube voiceovers with natural pauses.

Factors that change pace:

- **Keynote energy:** 140–160 wpm
- **Tutorial or explainer:** 120–140 wpm
- **Dramatic speech or emphasis:** under 120 wpm
- **Ad-libs and Q&A:** add buffer time not in the script

## Reading time by word count

| Words | Approx. reading time (225 wpm) |
|-------|-------------------------------|
| 300 | 1 min 20 sec |
| 500 | 2 min 13 sec |
| 800 | 3 min 33 sec |
| 1,000 | 4 min 27 sec |
| 1,500 | 6 min 40 sec |
| 2,000 | 8 min 53 sec |
| 3,000 | 13 min 20 sec |

Paste your draft into [Word Counter](/word-counter) for an exact count—the reading time updates as you edit.

## Speaking time by word count

| Words | Approx. speaking time (130 wpm) |
|-------|--------------------------------|
| 300 | 2 min 18 sec |
| 500 | 3 min 51 sec |
| 650 | 5 min 0 sec |
| 1,000 | 7 min 41 sec |
| 1,500 | 11 min 32 sec |
| 2,000 | 15 min 23 sec |

## Blog posts, scripts, speeches, and videos

**Blog posts:** Display estimated reading time near the title ("6 min read") to set expectations. Readers abandon articles that feel longer than promised.

**Conference talks:** A 20-minute slot often allows ~2,400–2,600 spoken words at 130 wpm, minus intro and applause buffer—target ~2,300 words in script.

**Podcast episodes:** 30 minutes of talking is roughly 3,900 words at 130 wpm—add room for banter if you work from bullet points instead of a full script.

**YouTube videos:** A 10-minute voiceover is about 1,300 spoken words; on-camera demos need extra unscripted time.

**Student presentations:** A 5-minute class presentation is roughly **650 words** scripted—practice aloud and trim if you run over.

## Why reading speed varies

- **Familiarity with the topic** speeds experts through jargon-heavy posts.
- **Mobile vs desktop**—shorter sessions on phones favor shorter pieces.
- **Skimming**—many readers scan headings; structure matters more than raw length.
- **Literacy and language**—global audiences may read slower than 225 wpm averages.

Use estimates for planning; validate with a timed read-aloud for anything high-stakes.

## How to use TextCraft Word Counter

1. Open [Word Counter](/word-counter).
2. Paste your blog draft, speech, or video script.
3. Note **Words**, **Reading time**, and **Speaking time** in the stats panel.
4. Edit until reading time fits your target (e.g., under 8 minutes for a standard blog post).
5. Copy or download if you need to share metrics with an editor or client.

## Example: estimate a 5-minute talk

Your assignment: a **5-minute persuasive speech**.

1. Target: 5 × 130 wpm ≈ **650 words** maximum.
2. Draft in Google Docs, paste into Word Counter: **742 words**.
3. Speaking time shows **~5 min 42 sec**—too long.
4. Cut one anecdote and tighten the conclusion.
5. New count: **658 words**, speaking time **~5 min 4 sec**—ready to practice aloud.

Always rehearse once with a timer; pauses and applause are not in the word count.

For blog-length planning by content type, see [How Many Words Should a Blog Post Be?](/blog/how-many-words-should-a-blog-post-be).""",
        "relatedToolSlug": "word-counter",
        "relatedTools": rt(["word-counter", "diff-checker"]),
        "relatedPosts": rp([
            ("how-many-words-should-a-blog-post-be", "How Many Words Should a Blog Post Be? A Practical Word Count Guide"),
            ("word-counting-beyond-simple", "Word Counting: Beyond Simple Character Counting"),
            ("compare-two-text-versions-online", "How to Compare Two Text Versions Online Without Installing Software"),
        ]),
        "faqs": [
            {
                "question": "How many words is a 5-minute speech?",
                "answer": "About 600–700 words at a typical speaking pace of 120–140 words per minute. TextCraft estimates 650 words at 130 wpm.",
            },
            {
                "question": "How long does it take to read 1,000 words?",
                "answer": "About 4–5 minutes for an average adult reading silently at 200–250 words per minute. TextCraft shows ~4 min 27 sec at 225 wpm.",
            },
            {
                "question": "How many words per minute do people read?",
                "answer": "Silent reading averages roughly 200–250 words per minute for English prose. Speed drops for technical or unfamiliar content.",
            },
            {
                "question": "How many words per minute do people speak?",
                "answer": "Presentations and podcasts typically run 120–150 words per minute including short pauses. TextCraft uses 130 wpm for estimates.",
            },
            {
                "question": "How do I calculate reading time?",
                "answer": "Divide word count by your chosen wpm (TextCraft uses 225). Or paste text into Word Counter for an instant estimate.",
            },
            {
                "question": "How do I calculate speaking time?",
                "answer": "Divide word count by speaking wpm (TextCraft uses 130). Practice aloud—a timer catches pacing issues formulas miss.",
            },
        ],
        "category": "counting",
        "author": "TextCraft Team",
        "date": "2026-06-24",
        "updated": "2026-06-24",
        "readTime": "7 min read",
        "tags": ["Reading Time", "Speaking Time", "Word Count", "Presentations", "Video Scripts"],
        "featured": False,
    },
    {
        "id": 16,
        "slug": "fix-broken-line-breaks-newsletter-paste",
        "title": "Fix Broken Line Breaks When Pasting Into Newsletters and Blog Editors",
        "metaTitle": "Fix Newsletter Paste Line Breaks | Clean Text for Substack and Blogs",
        "metaDescription": "Fix awkward line breaks when pasting from PDF, Word, or email into Substack, Beehiiv, Mailchimp, or your blog CMS. Clean text before you publish.",
        "excerpt": "Newsletter and blog paste often breaks every line mid-sentence. Join lines, remove blank rows, and publish clean copy with TextCraft Line Breaks Remover.",
        "quickAnswer": "When pasted newsletter or blog copy shows one short line per row, open TextCraft Line Breaks Remover, enable join lines and remove extra blank lines, then paste the cleaned text into Substack, Beehiiv, WordPress, or Mailchimp. Your wording stays the same—only line structure changes.",
        "keyTakeaways": [
            "Newsletter tools and CMS editors expect flowing paragraphs—not PDF-style hard wraps.",
            "Paste from Word, Google Docs, PDF, or email often inserts a line break at every visual line.",
            "Join lines first for prose; remove blank lines for tight newsletter spacing.",
            "Clean text before the final publish step—fixes are harder after HTML is generated.",
            "TextCraft runs in your browser; newsletter drafts are not uploaded.",
        ],
        "content": """## Why newsletter paste breaks your formatting

You wrote a clean draft in Google Docs or copied a quote from a PDF. You paste into **Substack**, **Beehiiv**, **Mailchimp**, or **WordPress**—and suddenly every sentence spans three or four short lines. Subscribers see choppy paragraphs; mobile readers scroll through unnecessary breaks.

This is not a bug in your writing. **Copy sources break text at page width**, not at sentence ends. Newsletter editors treat each newline as a real line break unless you paste plain, joined text first.

## Common paste problems for bloggers and newsletter writers

| Source | What goes wrong | What readers see |
|--------|-----------------|------------------|
| PDF excerpt | Line break every ~60 characters | Staccato one-liners |
| Word / Docs export | Mixed CRLF and soft breaks | Uneven spacing in CMS |
| Email reply chain | Blank lines + `>` quotes | Huge gaps in body |
| Slack / Teams copy | Single-line chunks | Broken intro paragraphs |
| Old blog export | Extra `<br>` when re-pasted | Double-spaced mess |

## Substack, Beehiiv, and blog CMS paste workflow

1. Write or collect source text (do not publish the raw paste).
2. Open [Line Breaks Remover](/line-breaks).
3. Paste into the **original text** panel.
4. Enable **join lines with single spaces** for body copy.
5. Enable **remove extra blank lines** if spacing looks too loose.
6. Optionally **trim trailing spaces** on each line.
7. Copy **cleaned text** into your newsletter or blog editor.
8. Apply headings, links, and bold **inside the CMS**—not in the cleanup tool.

For PDF-specific hyphenation (`infor-\\nmation`), fix split words manually after joining—automation cannot guess every hyphen.

## Before and after: newsletter intro paragraph

**Before (paste from a PDF recap):**

```
This week we shipped three updates
that writers asked for most: faster
word count, cleaner paste, and
better mobile tools.
```

**After (joined for Substack body):**

```
This week we shipped three updates that writers asked for most: faster word count, cleaner paste, and better mobile tools.
```

## When to join lines vs remove blank lines

- **Join lines:** Body paragraphs, pull quotes, story sections—anything meant to read as prose.
- **Remove blank lines:** Footer blocks, sponsor lines, or signatures with double spacing.
- **Do not join:** Poetry, song lyrics, or **bullet lists** where each line must stay separate—put one bullet per line, then only remove blank rows.

See also: [Remove extra line breaks from PDF, Word, and email](/blog/remove-extra-line-breaks-from-pdf-word-email) for document-focused cleanup.

## Mistakes newsletter writers make

- Publishing PDF paste **without a cleanup pass**—looks unprofessional on mobile.
- Joining lines on a **numbered or bulleted list**—merge items accidentally (sort bullets first with [Text Sorter](/text-sorter) if needed).
- Cleaning **only in the CMS preview**—some editors cache bad HTML; paste clean plain text first.
- Forgetting the **subject line** is separate—cleanup tool is for body copy.

## Quick checklist before you hit Send

- [ ] Body paragraphs flow without mid-sentence line breaks
- [ ] No double blank rows between sections (unless intentional)
- [ ] Links and bold added after cleanup, in the editor
- [ ] Mobile preview checked once with final HTML
- [ ] Word count checked with [Word Counter](/word-counter) if you target a length band

## Privacy for draft newsletter text

TextCraft processes paste **locally in your browser**. Your draft is not uploaded to TextCraft servers—useful when pasting client copy or embargoed announcements.""",
        "relatedToolSlug": "line-breaks",
        "relatedTools": rt(["line-breaks", "word-counter", "text-sorter"]),
        "relatedPosts": rp([
            ("remove-extra-line-breaks-from-pdf-word-email", "How to Remove Extra Line Breaks From Word, PDF, and Email Paste"),
            ("how-many-words-should-a-blog-post-be", "How Many Words Should a Blog Post Be? A Practical Word Count Guide"),
            ("line-break-handling", "Line Break Handling: Cross-Platform Text Processing"),
        ]),
        "faqs": [
            {
                "question": "Why does my newsletter paste have line breaks on every line?",
                "answer": "PDFs, emails, and narrow columns break text at visual width. Each wrapped line becomes its own row when pasted. Join lines to restore normal paragraphs.",
            },
            {
                "question": "How do I fix Substack paste formatting?",
                "answer": "Paste your draft into TextCraft Line Breaks Remover, join lines for body copy, copy the result, then paste into Substack's editor as plain text before adding formatting.",
            },
            {
                "question": "Should I clean text before or after adding links?",
                "answer": "Clean plain text first, then add links, bold, and headings in your newsletter or CMS editor. Cleanup tools work on text structure, not HTML.",
            },
            {
                "question": "Will joining lines change my words?",
                "answer": "No. Joining inserts spaces between lines—it does not rewrite sentences or fix typos.",
            },
            {
                "question": "Can I remove blank lines only?",
                "answer": "Yes. Use remove extra blank lines without joining if your paragraphs are fine but spacing is too loose.",
            },
            {
                "question": "Is my newsletter draft uploaded?",
                "answer": "No. TextCraft Line Breaks Remover runs entirely in your browser.",
            },
        ],
        "category": "tools",
        "author": "TextCraft Team",
        "date": "2026-06-24",
        "updated": "2026-06-24",
        "readTime": "6 min read",
        "tags": ["Newsletter", "Line Breaks", "Substack", "Blog CMS", "Paste Cleanup"],
        "featured": True,
    },
    {
        "id": 17,
        "slug": "sort-bullet-lists-for-blog-posts",
        "title": "How to Sort and Clean Bullet Lists for Blog Posts and Resource Roundups",
        "metaTitle": "Sort Bullet Lists for Blog Posts | Clean and Alphabetize Online",
        "metaDescription": "Sort bullet lists A–Z, remove duplicates, and clean resource roundups, tool lists, and link collections before publishing your blog post.",
        "excerpt": "Alphabetize tool roundups, dedupe resource lists, and tidy messy bullet paste before you publish—using TextCraft Text Sorter.",
        "quickAnswer": "Put one bullet or resource per line in TextCraft Text Sorter, choose A–Z sort, enable remove duplicates if needed, and paste the cleaned list into your blog outline or CMS. Each line becomes one bullet when you add list formatting in WordPress, Notion, or your editor.",
        "keyTakeaways": [
            "One resource or bullet per line is the format Text Sorter expects.",
            "A–Z order helps readers scan tool roundups and link lists faster.",
            "Remove duplicates after exporting from spreadsheets or collaborative docs.",
            "Sort outlines and FAQ question lists—not full paragraphs.",
            "TextCraft sorts locally; your unpublished list stays on your device.",
        ],
        "content": """## Why bloggers sort bullet lists before publishing

**Resource roundups**, **tool comparisons**, and **"best of" lists** start messy: links arrive from spreadsheets, teammates paste in random order, and duplicates sneak in after the third revision. Readers expect **scannable A–Z order** or a deliberate priority order—you should not make them hunt.

Sorting before publish also catches **duplicate tools**, **broken copy-paste rows**, and **inconsistent naming** (`Notion` vs `notion` on separate lines).

## Lists that benefit from sorting

- **Tool roundups:** "12 writing apps we recommend"
- **Resource pages:** Templates, checklists, free ebooks
- **Glossary entries:** Terms and one-line definitions
- **FAQ question banks:** Before you write answers
- **Conference links:** Sessions, speakers, sponsors
- **Newsletter link sections:** "What we're reading this week"

Do **not** sort narrative bullets that tell a story in a fixed sequence (step 1, step 2, step 3)—only reorder when sequence does not matter.

## How to use TextCraft Text Sorter on bullet paste

1. Open [Text Sorter](/text-sorter).
2. Paste your list with **one item per line** (strip bullet characters `•`, `-`, `*` if your editor added them—or leave them; sorting still works on full lines).
3. Choose **Alphabetical A–Z** (or Z–A, by length, or remove duplicates).
4. Review the **sorted output** panel.
5. Copy and paste into WordPress, Notion, Google Docs, or your CMS.
6. Re-apply bullet or numbered list styling in the editor.

Try the **Names list** example chip on the tool page to see the flow instantly.

## Example: cleaning a "best tools" roundup

**Before (paste from a shared doc):**

```
Grammarly
Notion
TextCraft
Grammarly
Hemingway Editor
Canva
```

**After (A–Z + duplicates removed):**

```
Canva
Grammarly
Hemingway Editor
Notion
TextCraft
```

## Spreadsheet and Notion paste tips

- **Excel / Sheets:** Copy a **single column** so each cell is one line. Tab-separated rows paste as one messy line—split first or copy column-only.
- **Notion:** Toggle list to plain text or export block, one item per line.
- **Word:** Convert bullets to text (Paste Special → Unformatted) before sorting, then re-bullet after.

For name lists and rosters, see [Alphabetize a list online](/blog/alphabetize-list-online).

## Sort options bloggers use most

| Option | Use when |
|--------|----------|
| A–Z | Resource lists, glossaries, neutral roundups |
| Z–A | Reverse-chronology feel without dates |
| Remove duplicates | After merging team contributions |
| Sort by length | Short links first in sidebar widgets |
| Reverse order | Quick flip of an existing list |

## Pair with other TextCraft tools

- **[Line Breaks Remover](/line-breaks):** Fix PDF paste **before** sorting bullets.
- **[Word Counter](/word-counter):** Check total word count after your roundup prose is done.
- **[Case Converter](/case-converter):** Normalize ALL CAPS tool names to Title Case for headings.

## Common mistakes

- Sorting **multi-line bullets** where one item wrapped to two lines—join or merge first.
- Expecting **semantic dedupe** (`NYT` vs `New York Times`)—only exact line matches remove.
- Forgetting to **re-apply list styles** after paste—plain lines need bullet formatting in CMS.
- Sorting **numbered steps** in a tutorial—use A–Z only when order is arbitrary.

## Privacy

TextCraft Text Sorter runs in your browser. Unpublished outlines and client resource lists are not uploaded.""",
        "relatedToolSlug": "text-sorter",
        "relatedTools": rt(["text-sorter", "line-breaks", "word-counter"]),
        "relatedPosts": rp([
            ("alphabetize-list-online", "How to Alphabetize a List of Names or Lines Online"),
            ("how-many-words-should-a-blog-post-be", "How Many Words Should a Blog Post Be? A Practical Word Count Guide"),
            ("fix-broken-line-breaks-newsletter-paste", "Fix Broken Line Breaks When Pasting Into Newsletters and Blog Editors"),
        ]),
        "faqs": [
            {
                "question": "How do I alphabetize a bullet list for a blog post?",
                "answer": "Paste one item per line into TextCraft Text Sorter, select alphabetical A–Z, copy the sorted output, then re-apply bullet formatting in your blog editor.",
            },
            {
                "question": "Can I remove duplicate links from a resource list?",
                "answer": "Yes. Use the remove-duplicates sort option after pasting one URL or tool name per line. Only exact duplicate lines are removed.",
            },
            {
                "question": "Should I sort before or after writing descriptions?",
                "answer": "Sort the list of names or links first when order is arbitrary. Write descriptions after the final order is set so you do not mismatch items.",
            },
            {
                "question": "Will sorting change my bullet symbols?",
                "answer": "TextCraft sorts line text. Paste back into your CMS and apply bullets or numbers there for consistent styling.",
            },
            {
                "question": "Can I sort a list from Excel?",
                "answer": "Copy a single column so each row becomes one line when pasted. Multi-column paste may need cleanup first.",
            },
            {
                "question": "Is my list uploaded to TextCraft?",
                "answer": "No. Sorting happens locally in your browser.",
            },
        ],
        "category": "sorting",
        "author": "TextCraft Team",
        "date": "2026-06-24",
        "updated": "2026-06-24",
        "readTime": "6 min read",
        "tags": ["Bullet Lists", "Blog Writing", "Text Sorter", "Resource Roundups", "Content Planning"],
        "featured": True,
    },
    # --- NEW POST 1: Text Sorter ---
    {
        "id": 10,
        "slug": "alphabetize-list-online",
        "title": "How to Alphabetize a List of Names or Lines Online",
        "metaTitle": "Alphabetize List Online | Sort Names and Text Lines A–Z",
        "metaDescription": "Learn how to alphabetize names, sort text lines A–Z, remove duplicates, and clean lists online using TextCraft's Text Sorter.",
        "excerpt": "Alphabetize names, sort lines A–Z, remove duplicates, and clean messy lists in seconds with TextCraft's browser-based Text Sorter.",
        "quickAnswer": "Paste your list into TextCraft's Text Sorter, choose A–Z alphabetical order, optionally remove duplicate lines, and copy the cleaned result. Everything runs in your browser—nothing is uploaded.",
        "keyTakeaways": [
            "One name or phrase per line is the easiest format to sort.",
            "A–Z and Z–A sorting work for names, titles, bullet lists, and spreadsheet paste.",
            "Remove duplicates after sorting to clean mailing lists and attendee rosters.",
            "TextCraft processes lists locally in your browser for privacy.",
        ],
        "content": """## What does it mean to alphabetize a list?

Alphabetizing means arranging lines in standard dictionary order (A–Z). Each line is treated as one item—useful for names, countries, product SKUs, classroom rosters, or any list you copied from Notes, Excel, or email.

## When should you sort text lines online?

- **Event planning:** Sort guest names for place cards or check-in sheets.
- **School work:** Organize bibliography entries or vocabulary lists.
- **Marketing:** Clean exported contact lists before mail merge.
- **Development:** Sort config keys, file paths, or test fixtures for readable diffs.
- **Everyday tasks:** Tidy a messy Notes app list before sharing.

## How to use TextCraft Text Sorter

1. Open the [Text Sorter](/text-sorter) tool.
2. Paste your list—one item per line works best.
3. Pick **A–Z** (or Z–A, random, or reverse).
4. Turn on **Remove duplicate lines** if needed.
5. Copy or download the sorted output.

## Example: alphabetize a list of names

**Before:**

```
Zoe Martinez
Aaron Brooks
Mia Chen
Dev Patel
```

**After (A–Z):**

```
Aaron Brooks
Dev Patel
Mia Chen
Zoe Martinez
```

## Example: remove duplicate lines

**Before:**

```
apple
banana
apple
cherry
banana
```

**After (sorted + deduplicated):**

```
apple
banana
cherry
```

## Alphabetical vs reverse vs random sorting

- **A–Z:** Standard alphabetical order for directories and indexes.
- **Z–A:** Reverse order—handy when you want newest-last names pushed to the top visually.
- **Random:** Shuffle lines for raffles, random picks, or quiz order.
- **Reverse:** Flip the current line order without re-sorting.

## Common sorting mistakes

- Pasting a **comma-separated** line instead of one item per row—split first or paste from a column.
- Leading spaces that push lines to the wrong position—trim whitespace before sorting.
- Sorting **Last, First** names as plain text—they sort by surname only if each full name is on one line.
- Forgetting that **capital letters** sort before lowercase in plain ASCII sorts.

## Best practices for clean lists

- Put one entry per line.
- Remove empty lines before sorting if you do not want blank rows.
- Dedupe after sorting so duplicates are easy to spot.
- Keep a copy of the original paste until you verify the output.

## Privacy and browser-side sorting

TextCraft runs entirely in your browser. Your list is not sent to a server, stored in our database, or shared with third parties. Close the tab and the session data is gone from the tool.""",
        "relatedToolSlug": "text-sorter",
        "relatedTools": rt(["text-sorter", "line-breaks", "word-counter"]),
        "relatedPosts": rp([
            ("remove-extra-line-breaks-from-pdf-word-email", "How to Remove Extra Line Breaks From Word, PDF, and Email Paste"),
            ("word-counting-beyond-simple", "Word Counting: Beyond Simple Character Counting"),
        ]),
        "faqs": [
            {"question": "How do I alphabetize a list online?", "answer": "Paste your list into TextCraft Text Sorter with one item per line, select A–Z alphabetical order, and copy the result. No install or account needed."},
            {"question": "Can I remove duplicate lines?", "answer": "Yes. Enable the remove-duplicates option in Text Sorter after pasting your list. Duplicates are removed based on exact line matches."},
            {"question": "Can I sort names alphabetically?", "answer": "Yes. Put each full name on its own line. The tool sorts by character order from left to right—use 'Last, First' format if you need surname-primary sorting."},
            {"question": "Can I randomize a list?", "answer": "Yes. Choose the random/shuffle sort option to reorder lines unpredictably—useful for drawings or random question order."},
            {"question": "Can I sort copied spreadsheet data?", "answer": "Copy a single column from Excel or Google Sheets so each cell becomes one line when pasted. Avoid pasting tab-separated rows if you only want one column sorted."},
            {"question": "Is my text uploaded anywhere?", "answer": "No. TextCraft processes text locally in your browser. Lists are not uploaded to our servers."},
        ],
        "category": "sorting",
        "author": "TextCraft Team",
        "date": "2026-06-24",
        "updated": "2026-06-24",
        "readTime": "6 min read",
        "tags": ["Alphabetize", "Text Sorter", "Sort Lists", "Remove Duplicates"],
        "featured": False,
    },
    # --- NEW POST 2: Line Breaks ---
    {
        "id": 11,
        "slug": "remove-extra-line-breaks-from-pdf-word-email",
        "title": "How to Remove Extra Line Breaks From Word, PDF, and Email Paste",
        "metaTitle": "Remove Extra Line Breaks Online | Clean PDF, Word, and Email Text",
        "metaDescription": "Learn how to remove unwanted line breaks, blank lines, and extra spaces from copied PDF, Word, email, and document text.",
        "excerpt": "Fix broken line breaks from PDF, Word, and email paste—join lines, remove blank rows, and copy clean text with TextCraft's Line Breaks Remover.",
        "quickAnswer": "Paste messy text into TextCraft's Line Breaks Remover, choose whether to join broken lines or remove blank lines, then copy the cleaned text. Processing happens in your browser.",
        "keyTakeaways": [
            "PDF and email paste often inserts a line break at every visual line—not every sentence.",
            "Join lines to turn hard-wrapped paragraphs back into flowing text.",
            "Remove blank lines to compact lists and signatures.",
            "TextCraft does not upload your pasted content.",
        ],
        "content": """## Why copied text gets weird line breaks

PDF viewers, email clients, and some Word exports break text at **visual line width**, not at sentence boundaries. When you paste, each wrapped line becomes its own row—so a single paragraph can look like ten short lines.

Windows, Mac, and older files may also mix **LF**, **CRLF**, or **CR** line endings, which adds invisible inconsistency.

## How to use TextCraft Line Breaks Remover

1. Open [Line Breaks Remover](/line-breaks).
2. Paste the text you copied from PDF, Word, Gmail, Outlook, or Slack.
3. Choose **join lines** to merge broken paragraphs, or **remove blank lines** for extra spacing.
4. Optionally trim trailing spaces on each line.
5. Copy the cleaned text back to your doc, CMS, or email.

## Before and after example

**Before (paste from a PDF):**

```
The quarterly report shows
steady growth across all
regions. Revenue increased
four percent year over year.
```

**After (joined into one paragraph):**

```
The quarterly report shows steady growth across all regions. Revenue increased four percent year over year.
```

## Cleaning text copied from PDFs

PDF text is positioned on a page, not stored as paragraphs. Expect mid-sentence breaks and hyphenation at line ends (`infor-\\nmation`). After joining lines, search for stray hyphens before line breaks and fix words manually if needed.

## Cleaning text copied from emails

Reply chains and mobile signatures introduce blank lines and `>` quote markers. Remove blank lines first, then join remaining content. For heavily quoted threads, paste only the section you need before cleaning.

## Removing blank lines vs joining lines

- **Join lines:** Best for prose paragraphs broken by soft wraps.
- **Remove blank lines:** Best for lists, CSV paste, or signatures with double spacing.
- Use both in sequence: join paragraphs first, then strip empty rows if any remain.

## Common cleanup mistakes

- Joining **poetry or line-based lyrics**—you will merge lines that should stay separate.
- Joining **bulleted lists** without putting each bullet on its own line first.
- Assuming cleanup fixes **missing words** from a bad PDF scan—it only fixes line structure.
- Forgetting to **proofread** once after automated cleanup.

## Best practices for clean text formatting

- Paste into a plain-text tool before moving to Word or HTML.
- Keep the original paste until the cleaned version looks right.
- For publishing, paste cleaned text into your editor and apply styles there—not in the PDF copy step.

## Privacy and browser-side cleanup

TextCraft runs in your browser. Pasted text is not uploaded, logged, or stored on our servers.""",
        "relatedToolSlug": "line-breaks",
        "relatedTools": rt(["line-breaks", "text-sorter", "case-converter"]),
        "relatedPosts": rp([
            ("line-break-handling", "Line Break Handling: Cross-Platform Text Processing"),
            ("alphabetize-list-online", "How to Alphabetize a List of Names or Lines Online"),
        ]),
        "faqs": [
            {"question": "How do I remove line breaks online?", "answer": "Paste your text into TextCraft Line Breaks Remover, select join lines or remove blank lines, and copy the result. The tool works in any modern browser."},
            {"question": "Why does PDF text paste with broken lines?", "answer": "PDFs store positioned text, not flowing paragraphs. Each visual line becomes a separate line when copied."},
            {"question": "Can I remove blank lines?", "answer": "Yes. Use the remove blank lines option to delete empty rows while keeping non-empty lines."},
            {"question": "Can I remove extra spaces too?", "answer": "Line Breaks Remover focuses on line structure. Trim spaces on each line where available, then paste into Word or your editor for full spacing cleanup."},
            {"question": "Will this change my words?", "answer": "No. The tool adjusts line breaks and blank lines—it does not rewrite sentences or change spelling."},
            {"question": "Is my pasted text uploaded anywhere?", "answer": "No. Cleanup runs locally in your browser."},
        ],
        "category": "tools",
        "author": "TextCraft Team",
        "date": "2026-06-24",
        "updated": "2026-06-24",
        "readTime": "7 min read",
        "tags": ["Line Breaks", "PDF Paste", "Email Text", "Text Cleanup"],
        "featured": False,
    },
    # --- NEW POST 3: Diff Checker ---
    {
        "id": 12,
        "slug": "compare-two-text-versions-online",
        "title": "How to Compare Two Text Versions Online Without Installing Software",
        "metaTitle": "Compare Two Text Versions Online | Find Text Differences Fast",
        "metaDescription": "Learn how to compare two text versions online, find additions and deletions, review edits, and avoid common text comparison mistakes.",
        "excerpt": "Compare two text versions side by side, spot additions and deletions, and review edits in your browser with TextCraft's Diff Checker.",
        "quickAnswer": "Paste the original text in the left panel and the revised text in the right panel of TextCraft's Diff Checker. Added and removed segments are highlighted so you can review changes without installing diff software.",
        "keyTakeaways": [
            "A text diff shows what changed between two versions of the same content.",
            "Line diff is best for documents; word diff helps with small edits in long paragraphs.",
            "Useful for blog drafts, contract reviews, homework revisions, and config checks.",
            "TextCraft compares text locally—nothing is uploaded to a server.",
        ],
        "content": """## What is a text diff checker?

A diff checker compares two text inputs and highlights **additions**, **deletions**, and sometimes **moves**. Instead of reading both versions word by word, you see exactly what changed.

## When should you compare two text versions?

- **Bloggers & writers:** Compare draft 2 vs draft 3 before publishing.
- **Students:** See what you changed between essay revisions.
- **Legal & ops:** Review clause edits in contracts or policy updates.
- **Developers:** Sanity-check config or snippet changes without opening IDE plugins.
- **Teams:** Verify email copy or release notes before send.

## How to use TextCraft Diff Checker

1. Open [Text Diff Checker](/diff-checker).
2. Paste the **original** text in the first box.
3. Paste the **updated** text in the second box.
4. Switch between **line** and **word** diff if the tool offers both modes.
5. Scan highlighted changes and copy the version you need.

## Example: original vs edited paragraph

**Original:**

```
Our shipping policy covers domestic orders only.
Returns are accepted within 30 days.
```

**Edited:**

```
Our shipping policy covers domestic and international orders.
Returns are accepted within 45 days with receipt.
```

The diff highlights `and international`, `45` instead of `30`, and `with receipt` as changes—so you approve only what you expect.

## Line diff vs word diff

- **Line diff:** Compares row by row—best for code, lists, policies, and multi-paragraph docs.
- **Word diff:** Finer granularity inside long lines—best when a single paragraph changed slightly.

## Reviewing blog edits, contracts, and code snippets

- **Blog posts:** Line diff shows moved paragraphs; word diff catches swapped adjectives.
- **Contracts:** Read every highlighted clause; do not rely on diff alone for legal sign-off.
- **Code:** Line diff maps to how version control shows patches, but always run tests after merging.

## Common comparison mistakes

- Comparing **different documents** entirely—diff works best on related versions.
- Ignoring **whitespace-only** changes that still highlight as edits.
- Pasting with **different line endings** (Windows vs Mac) and misreading formatting noise.
- Forgetting that order matters—swapped paragraphs show as delete + add.

## Best practices for reviewing changes

- Label mentally which box is “before” and which is “after.”
- Collapse unrelated sections before paste so the diff stays focused.
- After review, save the approved version in your CMS or doc system.

## Privacy and browser-side comparison

Both texts stay in your browser during comparison. TextCraft does not upload them for processing or storage.""",
        "relatedToolSlug": "diff-checker",
        "relatedTools": rt(["diff-checker", "word-counter", "case-converter"]),
        "relatedPosts": rp([
            ("text-diff-algorithms", "Text Diff Algorithms: Understanding and Implementing Change Detection"),
            ("compare-two-text-versions-online", "How to Compare Two Text Versions Online Without Installing Software"),
        ]),
        "faqs": [
            {"question": "How do I compare two texts online?", "answer": "Paste the original and updated text into the two panels in TextCraft Diff Checker. Changes are highlighted automatically."},
            {"question": "What is a text diff checker?", "answer": "It is a tool that shows additions and deletions between two text versions so you can review edits quickly."},
            {"question": "What is the difference between line diff and word diff?", "answer": "Line diff compares whole lines; word diff compares within lines. Use line diff for structured docs and word diff for small in-paragraph edits."},
            {"question": "Can I compare code snippets?", "answer": "Yes. Paste code into both panels. Line diff behaves similarly to patch views, but use your IDE or git for production merges."},
            {"question": "Can I compare document text?", "answer": "Yes. Copy text from Word or Google Docs into both boxes. Remove track-changes markup first for a cleaner comparison."},
            {"question": "Is my text uploaded anywhere?", "answer": "No. Comparison runs locally in your browser."},
        ],
        "category": "diff",
        "author": "TextCraft Team",
        "date": "2026-06-24",
        "updated": "2026-06-24",
        "readTime": "7 min read",
        "tags": ["Text Diff", "Compare Text", "Document Review", "Editing"],
        "featured": False,
    },
]

# Fix self-reference in compare post related posts
for p in posts:
    if p["slug"] == "compare-two-text-versions-online":
        p["relatedPosts"] = rp([
            ("text-diff-algorithms", "Text Diff Algorithms: Understanding and Implementing Change Detection"),
            ("word-counting-beyond-simple", "Word Counting: Beyond Simple Character Counting"),
        ])

# --- REFRESHED EXISTING POSTS (ids 1-9, keep slugs) ---

posts.extend([
    {
        "id": 1,
        "slug": "mastering-text-case-conversion",
        "title": "Mastering Text Case Conversion: A Developer's Complete Guide",
        "metaTitle": "Text Case Conversion Guide | camelCase, snake_case, Title Case",
        "metaDescription": "Learn text case formats, when writers and developers use each style, and how to convert case online with TextCraft's Case Converter.",
        "excerpt": "camelCase, snake_case, Title Case, and more—when to use each format, with fixed examples and a link to TextCraft's Case Converter.",
        "quickAnswer": "Pick the case style that matches your context—Title Case for headings, sentence case for body copy, camelCase or snake_case for code. Convert instantly with TextCraft's Case Converter by pasting text and selecting the target format.",
        "keyTakeaways": [
            "Title Case and sentence case matter for blogs, ads, and UI labels.",
            "camelCase and snake_case are standard in JavaScript, Python, and APIs.",
            "Consistent casing prevents broken URLs and variable names.",
            "TextCraft converts case in the browser without uploading your text.",
        ],
        "content": """## Understanding text case formats

### Common case types

**sentence case** — First word capitalized: `Convert my headline`

**Title Case** — Major Words Capitalized: `Convert My Headline`

**camelCase** — `convertMyHeadline`

**PascalCase** — `ConvertMyHeadline`

**snake_case** — `convert_my_headline`

**kebab-case** — `convert-my-headline`

**UPPERCASE** — `CONVERT MY HEADLINE`

## When writers use case conversion

- **Blog titles:** Switch ALL CAPS email subjects to Title Case.
- **Amazon listings:** Normalize supplier titles to readable Title Case.
- **Social bios:** Fix accidental `shift key` ALL CAPS paragraphs.

## When developers use case conversion

- **API fields:** `user_id` in JSON → `userId` in TypeScript.
- **CSS classes:** BEM or kebab-case from component names.
- **Database columns:** snake_case to match SQL conventions.

## How to convert case with TextCraft

Open [Case Converter](/case-converter), paste your text, and pick the target format. Copy the result into your editor, CMS, or codebase.

## Example: fix an ALL CAPS subject line

**Before:** `TEAM OFFSITE AGENDA FOR MARCH`

**After (Title Case):** `Team Offsite Agenda For March`

## Example: variable naming

**Before:** `user profile id`

**After (snake_case):** `user_profile_id`

**After (camelCase):** `userProfileId`

## Working code samples (JavaScript)

```javascript
function toSnakeCase(str) {
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\\s-]+/g, '_')
    .toLowerCase();
}

function toKebabCase(str) {
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\\s_]+/g, '-')
    .toLowerCase();
}
```

## Best practices

1. Pick one convention per project and document it.
2. Do not hand-edit hundreds of labels—use a converter for bulk renames.
3. Watch acronyms (`API`, `URL`)—some style guides keep them uppercase in Title Case.

## Common pitfalls

- Applying Title Case to **code symbols** breaks compilation.
- Kebab-case in **JavaScript variable names** is invalid.
- Locale rules differ—Turkish dotted/dotless I needs special handling in production i18n apps.""",
        "relatedToolSlug": "case-converter",
        "relatedTools": rt(["case-converter", "word-counter", "line-breaks"]),
        "relatedPosts": rp([
            ("alphabetize-list-online", "How to Alphabetize a List of Names or Lines Online"),
            ("word-counting-beyond-simple", "Word Counting: Beyond Simple Character Counting"),
        ]),
        "faqs": [
            {"question": "What is the difference between camelCase and PascalCase?", "answer": "camelCase starts lowercase (myVariable); PascalCase starts uppercase (MyClass). Both join words without spaces."},
            {"question": "When should I use Title Case?", "answer": "Use Title Case for headlines, product names, and buttons where each major word should be capitalized."},
            {"question": "Can I convert an entire paragraph at once?", "answer": "Yes. Paste the full paragraph into Case Converter and choose the target format."},
            {"question": "Does TextCraft upload my text?", "answer": "No. Conversion runs locally in your browser."},
        ],
        "category": "case",
        "author": "TextCraft Team",
        "date": "2025-09-05",
        "updated": "2026-06-24",
        "readTime": "8 min read",
        "tags": ["Case Conversion", "Title Case", "camelCase", "snake_case"],
        "featured": False,
    },
    {
        "id": 2,
        "slug": "text-diff-algorithms",
        "title": "Text Diff Algorithms: Understanding and Implementing Change Detection",
        "metaTitle": "Text Diff Algorithms Explained | LCS, Myers, and Line Diff",
        "metaDescription": "Learn how text diff algorithms work, when to use line vs word diff, and how to compare text online with TextCraft's Diff Checker.",
        "excerpt": "How diff algorithms detect changes, when line or word diff wins, and where to compare text online without installing tools.",
        "quickAnswer": "Diff algorithms find the shortest edit path between two strings. For everyday review, use TextCraft's Diff Checker; for version control, tools like git use optimized algorithms such as Myers diff on lines.",
        "keyTakeaways": [
            "Character diffs are noisy; line diffs match how people edit documents.",
            "LCS (longest common subsequence) underpins many diff implementations.",
            "Writers and lawyers review meaning; developers review patches.",
            "TextCraft offers instant browser-based comparison for two pasted versions.",
        ],
        "content": """## What is text diffing?

Diffing finds insertions, deletions, and replacements between two texts. Good diffs minimize noise so humans approve the right changes.

## Line diff vs word diff

| Mode | Best for |
|------|----------|
| Line | Code, policies, lists |
| Word | Long paragraphs with tiny edits |

Try both in [Text Diff Checker](/diff-checker) when unsure.

## Basic approach: longest common subsequence

Many tools build a table of matching segments between two sequences, then walk backward to mark changes. Lines are the usual unit in documents; characters in spell-check UIs.

## Simple word diff sketch (JavaScript)

```javascript
function wordDiff(oldText, newText) {
  const oldWords = oldText.split(/\\s+/);
  const newWords = newText.split(/\\s+/);
  const changes = [];
  const max = Math.max(oldWords.length, newWords.length);
  for (let i = 0; i < max; i++) {
    if (oldWords[i] !== newWords[i]) {
      changes.push({ index: i, from: oldWords[i] ?? '', to: newWords[i] ?? '' });
    }
  }
  return changes;
}
```

Production systems add smarter matching so shifted paragraphs do not look like total rewrites.

## When to compare online vs in git

- **Online (TextCraft):** One-off paste from email, Word, or CMS previews.
- **Git / IDE:** Ongoing project history with merge and blame.

See also: [Compare two text versions online](/blog/compare-two-text-versions-online).

## Best practices

- Normalize line endings before diffing Windows vs Mac paste.
- Collapse unrelated sections so highlights stay readable.
- Never treat a visual diff as legal approval by itself.

## Common pitfalls

- Huge files in the browser can slow down—split chapters first.
- Whitespace-only edits still count as changes.
- Unicode combining characters can look identical but diff differently.""",
        "relatedToolSlug": "diff-checker",
        "relatedTools": rt(["diff-checker", "word-counter"]),
        "relatedPosts": rp([
            ("compare-two-text-versions-online", "How to Compare Two Text Versions Online Without Installing Software"),
        ]),
        "faqs": [
            {"question": "What diff algorithm does git use?", "answer": "Git uses a Myers diff implementation with histogram and patience improvements in newer versions—optimized for source lines."},
            {"question": "Should I use line or word diff for essays?", "answer": "Start with line diff for structure; switch to word diff if one paragraph changed slightly."},
            {"question": "Can I diff without installing software?", "answer": "Yes. Use TextCraft Diff Checker in your browser."},
        ],
        "category": "diff",
        "author": "TextCraft Team",
        "date": "2025-09-05",
        "updated": "2026-06-24",
        "readTime": "10 min read",
        "tags": ["Text Diff", "Algorithms", "Version Control"],
        "featured": False,
    },
    {
        "id": 3,
        "slug": "word-counting-beyond-simple",
        "title": "Word Counting: Beyond Simple Character Counting",
        "metaTitle": "Word Count Guide | Essays, SEO, Reading Time, and Edge Cases",
        "metaDescription": "Word counts for essays, blogs, and social posts—plus reading time, speaking time, and how to count accurately with TextCraft Word Counter.",
        "excerpt": "Word counts for school essays, SEO posts, and social captions—plus reading time, speaking time, and edge cases handled by TextCraft Word Counter.",
        "quickAnswer": "Paste your draft into TextCraft Word Counter to see words, characters, sentences, paragraphs, and estimated reading time instantly—all in your browser.",
        "keyTakeaways": [
            "Essay limits count words, not characters—verify with the same rules your school uses.",
            "Bloggers target reading time (often 5–8 minutes) as much as raw word count.",
            "Hyphenated words and numbers may count differently per style guide.",
            "Reading time ≈ words ÷ 225 wpm; speaking time ≈ words ÷ 130 wpm (TextCraft shows both).",
        ],
        "content": """## Why word count still matters

Teachers set **500 words**. SEO teams want **1,500-word guides**. Speakers need **7-minute scripts**. Each scenario cares about a different metric—words, characters, or time.

## For students and writers

- **Essays:** Hit assignment minimums without padding.
- **Cover letters:** Stay under one page (~250–400 words).
- **NaNoWriMo:** Track daily word totals.

Open [Word Counter](/word-counter), paste your draft, and watch counts update as you edit.

## For bloggers and marketers

- **Reading time:** 1,000 words ≈ 4–5 minutes at average reading speed.
- **Meta descriptions:** ~150–160 characters, not words.
- **Newsletters:** Shorter issues often improve completion rates—count before send.

## Reading and speaking time example

| Words | Reading (~225 wpm) | Speaking (~130 wpm) |
|-------|--------------------|---------------------|
| 300 | ~1.3 min | ~2.3 min |
| 800 | ~3.6 min | ~6.2 min |
| 1,500 | ~6.7 min | ~11.5 min |

TextCraft calculates these from your paste automatically.

## Edge cases that trip counters

- **Hyphenated words:** `state-of-the-art` may count as one or three depending on rules.
- **Numbers:** `2026` may or may not count as a word.
- **Footnotes and citations:** Decide whether references count toward limits.
- **CJK text:** Character-based limits differ from English word counts.

## Simple JavaScript word split (English)

```javascript
function countWords(text) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\\s+/).filter(Boolean).length;
}
```

For production multilingual apps, use locale-aware segmenters (`Intl.Segmenter`).

## Best practices

- Count the **final exported text**, not the Google Doc with comments.
- Match your school's definition before submitting.
- Pair word count with [Case Converter](/case-converter) for headline cleanup.""",
        "relatedToolSlug": "word-counter",
        "relatedTools": rt(["word-counter", "case-converter", "diff-checker"]),
        "relatedPosts": rp([
            ("compare-two-text-versions-online", "How to Compare Two Text Versions Online Without Installing Software"),
        ]),
        "faqs": [
            {"question": "How many words should a blog post be?", "answer": "Many informational posts land between 1,000 and 2,000 words, but intent matters more than a fixed number. Match depth to the query."},
            {"question": "Do emojis count in word count?", "answer": "Usually no—they are symbols, not words—unless your instructor or platform says otherwise."},
            {"question": "How is reading time calculated?", "answer": "TextCraft divides word count by an average reading speed (about 225 words per minute) to estimate minutes."},
            {"question": "Is my essay text uploaded?", "answer": "No. Counting happens locally in your browser."},
        ],
        "category": "counting",
        "author": "TextCraft Team",
        "date": "2025-09-05",
        "updated": "2026-06-24",
        "readTime": "9 min read",
        "tags": ["Word Counting", "Reading Time", "Essays", "Blogging"],
        "featured": False,
    },
    {
        "id": 4,
        "slug": "lorem-ipsum-generation",
        "title": "Lorem Ipsum Generation: Beyond Placeholder Text",
        "metaTitle": "Lorem Ipsum Guide | Placeholder Text for Mockups and Layouts",
        "metaDescription": "Use Lorem Ipsum and realistic placeholder text in mockups, wireframes, and prototypes—with TextCraft's Lorem Ipsum Generator.",
        "excerpt": "Placeholder text for wireframes and mockups—how much to generate, paragraph vs words, and using TextCraft's Lorem Ipsum Generator in your design workflow.",
        "quickAnswer": "Generate Latin placeholder or word-count–based filler in TextCraft's Lorem Ipsum Generator, then paste into Figma frames, HTML prototypes, or slide decks to judge layout before real copy exists.",
        "keyTakeaways": [
            "Placeholder text tests line length and hierarchy—not final meaning.",
            "Match paragraph count and word count to expected real content.",
            "Latin Lorem is neutral; English-like filler can distract in user tests.",
            "TextCraft generates placeholder text locally—no external API required.",
        ],
        "content": """## Why designers still use Lorem Ipsum

Clients focus on **words** when they should judge **layout**. Neutral Latin (or structured gibberish) keeps reviews about spacing, type size, and grid—not draft marketing copy.

## Designer / mockup workflow

1. **Wireframe** — Block paragraphs with rough counts.
2. **Hi-fi mock** — Generate exact paragraphs in [Lorem Ipsum Generator](/lorem-ipsum).
3. **Prototype** — Paste into Figma, Webflow, or HTML.
4. **User test** — Swap in real copy only when testing comprehension.

## How much placeholder to generate

| UI element | Starting point |
|------------|----------------|
| Hero | 8–15 words headline + 20–40 words subcopy |
| Card grid | 2–3 sentences per card |
| Blog template | 3–5 paragraphs, ~400–600 words total |

Generate by **paragraphs** when layout is paragraph-based; by **words** when filling a fixed box.

## Example: card blurb

**Words:** 24

```
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus at urna interdum gravida.
```

## Built-in generation (no external API)

TextCraft generates placeholder text **in your browser**. You do not need a third-party API key or network call—paste results directly into your project.

> **Note:** Earlier drafts of generic articles sometimes claim multi-language Lorem or live API services. TextCraft's tool outputs Latin-style placeholder and word-count-based filler—switch to real localized copy before launch.

## Best practices

- Label design files `COPY TBD` so stakeholders know text is temporary.
- Match **line length** (characters per line) to production CMS width.
- Do not ship Lorem to production—search engines and users expect real content.

## Common pitfalls

- Too little text hides overflow bugs.
- Too much text breaks mobile layouts.
- Using joke filler text in compliance or health UI looks unprofessional.""",
        "relatedToolSlug": "lorem-ipsum",
        "relatedTools": rt(["lorem-ipsum", "word-counter"]),
        "relatedPosts": rp([
            ("word-counting-beyond-simple", "Word Counting: Beyond Simple Character Counting"),
        ]),
        "faqs": [
            {"question": "How many paragraphs of Lorem do I need for a blog mockup?", "answer": "Start with 3–5 paragraphs (400–600 words) to stress-test headings, pull quotes, and images."},
            {"question": "Is Lorem Ipsum readable Latin?", "answer": "It is scrambled Latin-like text meant to be unreadable so viewers focus on design."},
            {"question": "Does TextCraft call an external API?", "answer": "No. Generation runs locally in the browser."},
        ],
        "category": "tools",
        "author": "TextCraft Team",
        "date": "2025-09-05",
        "updated": "2026-06-24",
        "readTime": "7 min read",
        "tags": ["Lorem Ipsum", "Placeholder Text", "Design", "Mockups"],
        "featured": False,
    },
    {
        "id": 7,
        "slug": "line-break-handling",
        "title": "Line Break Handling: Cross-Platform Text Processing",
        "metaTitle": "Line Break Formats | LF, CRLF, and Normalization Guide",
        "metaDescription": "Understand LF vs CRLF line endings, normalize text for code and documents, and clean pasted breaks with TextCraft Line Breaks Remover.",
        "excerpt": "LF vs CRLF explained for developers and anyone cleaning pasted text—plus when to use TextCraft's Line Breaks Remover for practical cleanup.",
        "quickAnswer": "Windows often uses CRLF (`\\r\\n`), Unix/Mac uses LF (`\\n`). Normalize line endings when code or copy behaves differently across machines—or use TextCraft Line Breaks Remover for quick paste cleanup.",
        "keyTakeaways": [
            "Mixed line endings cause noisy diffs and broken scripts.",
            "Normalize early in ETL and document pipelines.",
            "Writers care about joined paragraphs; developers care about `\\n` bytes.",
            "For PDF/Word paste fixes, see the practical cleanup guide linked below.",
        ],
        "content": """## Understanding line break formats

| Name | Sequence | Common on |
|------|----------|-----------|
| LF | `\\n` | Linux, macOS, modern editors |
| CRLF | `\\r\\n` | Windows, some enterprise apps |
| CR | `\\r` | Legacy Mac (rare today) |

## Detect line ending type (JavaScript)

```javascript
function detectLineBreakType(text) {
  const crlf = (text.match(/\\r\\n/g) || []).length;
  const lf = (text.match(/\\n/g) || []).length - crlf;
  const cr = (text.match(/\\r/g) || []).length - crlf;
  if (crlf > 0 && lf === 0 && cr === 0) return 'CRLF';
  if (lf > 0 && cr === 0) return 'LF';
  if (cr > 0 && lf === 0) return 'CR';
  return 'MIXED';
}
```

## Normalize to LF

```javascript
function toLf(text) {
  return text.replace(/\\r\\n/g, '\\n').replace(/\\r/g, '\\n');
}
```

## Practical paste cleanup (writers)

If you are fixing **PDF or email paste** rather than byte-level endings, use the step-by-step guide: [Remove extra line breaks from PDF, Word, and email](/blog/remove-extra-line-breaks-from-pdf-word-email) with [Line Breaks Remover](/line-breaks).

## Best practices for developers

- Set `core.autocrlf` intentionally in git—know your team's OS mix.
- Strip `\\r` before JSON APIs that reject control characters.
- Log mixed-ending files in CI when linting fixtures.

## Common pitfalls

- Regex counts wrong when CRLF pairs overlap LF counts.
- Joining lines destroys poetry, lyrics, and line-based code.
- Assuming Notepad and VS Code save the same bytes by default.""",
        "relatedToolSlug": "line-breaks",
        "relatedTools": rt(["line-breaks", "text-sorter"]),
        "relatedPosts": rp([
            ("remove-extra-line-breaks-from-pdf-word-email", "How to Remove Extra Line Breaks From Word, PDF, and Email Paste"),
        ]),
        "faqs": [
            {"question": "What is the difference between LF and CRLF?", "answer": "LF is one newline character; CRLF is carriage return plus line feed. Windows traditionally uses CRLF; Unix uses LF."},
            {"question": "How do I fix PDF paste line breaks?", "answer": "Use TextCraft Line Breaks Remover to join broken lines—see our dedicated PDF/Word/email cleanup article."},
            {"question": "Will normalization change my words?", "answer": "It only changes invisible line ending characters, not letters."},
        ],
        "category": "tools",
        "author": "TextCraft Team",
        "date": "2025-09-05",
        "updated": "2026-06-24",
        "readTime": "7 min read",
        "tags": ["Line Breaks", "CRLF", "LF", "Normalization"],
        "featured": False,
    },
    {
        "id": 6,
        "slug": "text-processing-performance",
        "title": "Text Processing Performance Optimization",
        "metaTitle": "Text Processing Performance | Fast String Ops in JavaScript",
        "metaDescription": "Optimize text processing in browser apps: avoid slow string concat, cache regex, debounce input, and keep TextCraft tools snappy on large paste.",
        "excerpt": "Make browser-based text tools feel instant—string building, regex reuse, debouncing, and chunking large inputs.",
        "quickAnswer": "Build strings with arrays and `.join()`, compile regex once, debounce live counters on large paste, and avoid blocking the main thread—patterns TextCraft uses across Word Counter, Diff Checker, and other tools.",
        "keyTakeaways": [
            "Repeated string `+=` in loops allocates new strings each time.",
            "Reuse `RegExp` objects instead of creating them per keystroke.",
            "Debounce 150–300ms for word count on 10k+ character paste.",
            "Chunk work with `requestIdleCallback` or Web Workers for huge files.",
        ],
        "content": """## Why text performance matters in browser tools

TextCraft tools run **client-side**. A sluggish loop on a 50k-character paste feels broken even if the math is correct. Performance is UX.

## Measure before optimizing

```javascript
function measure(label, fn) {
  const start = performance.now();
  const result = fn();
  console.log(`${label}: ${(performance.now() - start).toFixed(2)} ms`);
  return result;
}
```

## Fast string building

```javascript
// Slow for huge arrays of parts
let out = '';
for (const part of parts) out += part;

// Faster
const out = parts.join('');
```

## Cache regular expressions

```javascript
const WORD_RE = /\\b[\\w']+\\b/gu;
function countWords(text) {
  return (text.match(WORD_RE) || []).length;
}
```

## Debounce live counters

For word counters and diff previews, wait until typing pauses:

```javascript
function debounce(fn, ms = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}
```

## When this article is enough

This is a **developer supplement**, not a tool tutorial. Users fixing paste or counting words should start with [Word Counter](/word-counter) or [Line Breaks Remover](/line-breaks). Engineers extending TextCraft-style apps should profile real paste sizes first.

## Common pitfalls

- Optimizing regex before proving paste size is the bottleneck.
- Running diff on megabyte logs in the main thread—chunk or workerize.
- Forgetting mobile CPUs—test on a phone, not only a laptop.""",
        "relatedToolSlug": "word-counter",
        "relatedTools": rt(["word-counter", "diff-checker"]),
        "relatedPosts": rp([
            ("word-counting-beyond-simple", "Word Counting: Beyond Simple Character Counting"),
        ]),
        "faqs": [
            {"question": "Why is my word counter slow on large text?", "answer": "Recalculating on every keypress with heavy regex can block the UI—debounce input and reuse compiled patterns."},
            {"question": "Are TextCraft tools server-side?", "answer": "No. They run in your browser, so main-thread performance directly affects responsiveness."},
        ],
        "category": "performance",
        "author": "TextCraft Team",
        "date": "2025-09-05",
        "updated": "2026-06-24",
        "readTime": "8 min read",
        "tags": ["Performance", "JavaScript", "Text Processing"],
        "featured": False,
    },
])

# Keep unchanged orphan posts 5, 8, 9 with minimal new fields
posts.extend([
    {
        "id": 5,
        "slug": "text-encoding-character-sets",
        "title": "Text Encoding and Character Sets: A Complete Guide",
        "metaDescription": "UTF-8, Unicode, BOM, and mojibake explained for developers handling multilingual text.",
        "excerpt": "UTF-8, Unicode, BOM, and mojibake—how to store and exchange text without corruption.",
        "quickAnswer": "Use UTF-8 for new projects. Decode bytes with the correct encoding, strip BOMs when they cause double-encoding, and never assume ASCII when users paste international text.",
        "keyTakeaways": ["UTF-8 is the default for web and APIs.", "Mojibake means bytes were read with the wrong encoding.", "BOMs can break scripts that expect raw UTF-8."],
        "content": """## What is text encoding?

Computers store text as bytes. Encoding maps characters to bytes; decoding maps bytes back to characters. Wrong guesses produce **mojibake** (`Ã©` instead of `é`).

## Prefer UTF-8

UTF-8 encodes ASCII in one byte and uses multiple bytes only for other scripts. It is the standard for HTML, JSON, and modern databases.

## Detect and strip BOM

```javascript
function stripBom(text) {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}
```

## Best practices

- Declare `<meta charset=\"utf-8\">` in HTML.
- Set `Content-Type: charset=utf-8` on APIs.
- Test paste with emoji and accented characters in browser tools like [Line Breaks Remover](/line-breaks).""",
        "relatedTools": rt(["line-breaks", "word-counter"]),
        "relatedPosts": rp([("line-break-handling", "Line Break Handling: Cross-Platform Text Processing")]),
        "faqs": [{"question": "Should I still use Latin-1?", "answer": "Only for legacy systems. New work should use UTF-8 end to end."}],
        "category": "encoding",
        "author": "TextCraft Team",
        "date": "2025-09-05",
        "updated": "2026-06-24",
        "readTime": "8 min read",
        "tags": ["Text Encoding", "Unicode", "UTF-8"],
        "featured": False,
    },
    {
        "id": 8,
        "slug": "text-validation-sanitization",
        "title": "Text Validation and Sanitization: Security Best Practices",
        "metaDescription": "Validate and sanitize text input to reduce XSS risk and data quality issues in web apps.",
        "excerpt": "Validate format early, sanitize before storage, escape on output—text security basics for web apps.",
        "quickAnswer": "Validate structure on the server, reject unexpected control characters, sanitize HTML if you must accept rich text, and escape output in templates. Client-side checks in browser tools are for UX only—not security boundaries.",
        "keyTakeaways": ["Never trust pasted text from the clipboard for security policy.", "Whitelist allowed patterns when possible.", "Escape HTML on output unless using a vetted sanitizer."],
        "content": """## Validation vs sanitization

- **Validation:** Is this string allowed? (email format, max length)
- **Sanitization:** Remove or neutralize dangerous fragments

## XSS-aware handling

```javascript
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;');
}
```

Browser text tools like TextCraft process input locally—they are not a substitute for server-side sanitization in your app.

## Best practices

- Validate on server regardless of client checks.
- Log rejected payloads for abuse monitoring.
- Use CSP headers to limit inline script damage.""",
        "relatedTools": rt(["case-converter", "line-breaks"]),
        "relatedPosts": rp([]),
        "faqs": [{"question": "Does TextCraft sanitize my text on a server?", "answer": "TextCraft does not upload your text. Your own apps must still sanitize before storing user content."}],
        "category": "security",
        "author": "TextCraft Team",
        "date": "2025-09-05",
        "updated": "2026-06-24",
        "readTime": "8 min read",
        "tags": ["Security", "Validation", "XSS"],
        "featured": False,
    },
    {
        "id": 9,
        "slug": "text-analysis-nlp-basics",
        "title": "Text Analysis and NLP Basics for Developers",
        "metaDescription": "Tokenization, stop words, and simple frequency analysis—practical NLP starters without a ML stack.",
        "excerpt": "Tokenization, stop words, and frequency sketches—NLP starters without a machine learning stack.",
        "quickAnswer": "Start NLP experiments with tokenization, lowercasing, stop-word removal, and frequency counts—then use TextCraft Word Counter when you only need words, characters, and reading time without building a pipeline.",
        "keyTakeaways": ["Preprocessing quality dominates simple NLP results.", "Stop words skew keyword lists if not removed.", "Word frequency ≠ importance without TF-IDF or embeddings."],
        "content": """## Basic pipeline

1. Lowercase and normalize whitespace
2. Tokenize on spaces or `Intl.Segmenter`
3. Remove stop words
4. Count or score tokens

```javascript
function tokens(text) {
  return text.toLowerCase().split(/\\s+/).filter(Boolean);
}
```

For production keyword extraction, pair counts with domain dictionaries—not raw frequency alone.

When you only need **word and character metrics**, use [Word Counter](/word-counter) instead of building a one-off script.""",
        "relatedToolSlug": "word-counter",
        "relatedTools": rt(["word-counter"]),
        "relatedPosts": rp([("word-counting-beyond-simple", "Word Counting: Beyond Simple Character Counting")]),
        "faqs": [{"question": "Do I need machine learning for word frequency?", "answer": "No. Counts are deterministic; ML helps classification, entities, and sentiment at scale."}],
        "category": "analysis",
        "author": "TextCraft Team",
        "date": "2025-09-05",
        "updated": "2026-06-24",
        "readTime": "9 min read",
        "tags": ["NLP", "Text Analysis", "Tokenization"],
        "featured": False,
    },
])

posts.sort(key=lambda p: p["id"])

OUT.write_text(json.dumps(posts, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"Wrote {len(posts)} posts to {OUT}")

SEARCH_OUT = ROOT / "src" / "data" / "blogSearchIndex.json"
search_index = [
    {
        "slug": p["slug"],
        "title": p["title"],
        "excerpt": p["excerpt"],
        "tags": p["tags"],
        "category": p["category"],
    }
    for p in posts
]
SEARCH_OUT.write_text(json.dumps(search_index, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"Wrote {len(search_index)} search entries to {SEARCH_OUT}")
