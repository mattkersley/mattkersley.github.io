---
layout: post
title:  Design Decisions
date:   2016-01-09 07:10:00 +0000
categories: design
---

Most websites I design and build have a bit more to them than my own websites, so it’s been a pleasure working with just content for a change.
That’s all this site is… content. The only superfluous design “fluff” is the logo animation on the [homepage](/).

For the new design, I wanted to focus entirely on content.  
Just the stuff that you, the user would visit for.

## Typography

The start of any content-focussed site _should_ be to make the content as readable as possible. If you’re not interested at all in typography, I’d skip this section.

### Font choices

The web fonts being used:

- [Lato](https://www.google.com/fonts/specimen/Lato) for headings
- [Esteban](https://www.google.com/fonts/specimen/Esteban) for the rest (almost)

I liked the combination of the two fonts while I was testing a few out.  
There was something visually appealing to me, your opinion may differ though.

Lato works well as a heading font (with a small about of kerning) – setting the H1 a a heavier weight to emphasise the post title.

Esteban is a lovely, readable font too. It seems to work well with differing font-sizes as the device width is altered.

### Line length & leading

With the line length being kept around 70 characters (slighly less on mobile), and the leading at 150%, I’m fairly certain the type can be easily and effortlessly read without losing which line you’re on or having to re-read anything.

The text has enough room to breathe, and not look cluttered and unappealing.

### Responsive sizing

To keep the line-length and form of the text roughly the same on as many screen widths as possible, the “vw” (viewport width) unit has been used for sizing the text.

As the viewport (screen) changes size, the text does too.  
There are “breakpoints” at which the “vw” unit is slightly tweaked to ensure readability remains optimised.

## Loading process

If you have JavaScript enabled, the page will show you a joyful set of bouncing balls until the whole post has loaded.

This ensures there’s no jumpy font loading, images or any other assets causing the experience to be horrific looking.

## No Navigation?

At the moment, there isn't enough content on the site to warrant navigation as such. You’ve got the back button on your browser, and the logo for the homepage, what more do you want?
