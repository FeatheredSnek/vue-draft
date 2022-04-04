# vueDraft

Card game drafting - build (and inspect) your deck from a series of random deals.
Check it out at [my website](https://dorianm.com/demos/vue-draft/).

## Background and purpose

I wanted to get some experience Vue 3 Composition API - which also allowed for easy usage of TypeScript - and I conceived this little demo to mess with it. The UI is inspired by countless similar card games - with its structure - and countless similar websites about css - with dark+gradients colorscheme.

## How it's made

Vue 3 with Composition API and TypeScript, styled with SCSS.

## Concluding remarks

The Composition API turned out to be quite pleasant to use, it surely made my files more concise and readable. No complaints about TS+Vue+VSCode tooling combo whatsoever.
Although transition components were a great help overall, custom animations turned out to be a little tricky with positioning calculations. Animated positioning is also the primary reason why I did not bother with making the app responsive - it remains desktop only, even though the overall layout is grid-based.
I have not found suitable apis to fetch randomized card data so I grabbed some mollusk names from wikipedia, words from lorem ipsum and image urls from lorempicsum. I put all of them into premade lists, which are then fed into random card generator.
Licensed MIT.
