---
title: Entertainment Web
slug: entertainment_web
liveUrl: "https://entertainment-web-996.netlify.app/"
description: "Multipage Entertainment app built with React, Typescript and Tailwind"
---

## The challenge

Your challenge is to build out this entertainment web application and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

We provide the data in a local `data.json` file, so use that to populate the content on the first load. If you want to take it up a notch, feel free to build this as a full-stack application!

Your users should be able to:

- [x] View the optimal layout for the app depending on their device's screen size
- [x] See hover states for all interactive elements on the page
- [x] Navigate between Home, Movies, TV Series, and Bookmarked Shows pages
- [x] Add/Remove bookmarks from all movies and TV series

## Stack

- React
- Typescript
- Tailwind
- localforage ( storing the bookmarks within the user's browser )
- Redux toolkit

## Thought process

Initially rendering the discover page with one single slider was simple task with one `useState`. I used the `useEffect` to get the details from `TMDB API` and stored it in the localUseState. When I had to render more than rows, I had to fetch different resources i.,e 3 different API calls which fetches the latest movies , tv and the collections.

I could have gone with 3 separate useState but that actually messed up the code and thought if I had to render another two blocks on the same page then I would have to use 5 separate useState. It did not feel right. Quickly researched and found out instead of having 5 `useState` , I can just have one `useReducer` or may be even use `Redux toolkit's slice and thunks` to manage the state.

Ref: [Replace useState with useReducer](https://levelup.gitconnected.com/why-and-how-to-replace-usestate-with-usereducer-eaaf1d12e02a)

Once I re-organized my code as per the Redux toolkit's principle , things started to look cleaner. From their , it was pretty easy all I had to create was two common component for displaying the cards. First three pages Discover, Movies and Series pages got over quickly.

Now the bookmarks , for that I used `localforage` to store the bookmarks. Since there was some existing issues on the way of importing the [package](https://github.com/localForage/localForage/issues/976) , I had to shutoff the typescript for that line.

In the end , all the pages are done and delivered.

## Preview

<img width="1440" alt="image" src="https://github.com/skarthikeyan96/entertainment-web/assets/23126394/98d0f45e-be40-46f0-b4cf-6d645d0a0e2b">

## Setup 

1. Clone the repo.
2. Rename the `.env.dev` to `.env`.
3. Update the API key from the TMDB site.
4. Run `npm install`.
5. Run `npm run dev`.

## Future plans

- [ ] Making it a Full stack application
- [ ] Integrating search
- [ ] Comprehensive details page

