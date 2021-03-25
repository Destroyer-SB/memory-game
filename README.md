# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Stephen Byrnes

Time spent: **33** hours spent in total

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tab), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [ ] Playback speeds up on each turn
* [ ] Computer picks a different pattern each time the game is played
* [ ] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (e.g. add an image)
* [x] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Changed the pitch of the tiles
- [x] Added different difficulty options
- [x] Added support for changing the key of the tile pitches via a slider
- [x] Added a "custom" difficulty option where the user inputs any array as a sequence of tiles
- [x] Added a custom sequence that resembles a song, labeled "Good Morning Song"
- [x] Background color changes based off the selected difficulty
- [x] Tiles change color when user hovers over the tile
- [x] Tiles change size when clicked
- [x] Settings buttons play an audio file when clicked
- [x] Game plays a sound when won or lost

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://i.imgur.com/fNddAX0.gif' title='Final Game Demo' width='' alt='Final Game Demo' />

1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

HTML Color Names: https://www.w3schools.com/tags/ref_colornames.asp

Button Styles: https://www.w3schools.com/css/css3_buttons.asp

Removing Button Highlight: https://stackoverflow.com/questions/14098735/how-to-remove-the-default-button-highlighting-in-safari-when-using-jquery

Filling Array From Array: https://stackoverflow.com/questions/3438027/populating-another-array-from-array-javascript

Note Frequencies: https://pages.mtu.edu/~suits/notefreqs.html

Slider Styles: https://www.w3schools.com/howto/howto_js_rangeslider.asp

Transitioning Background Color: https://css-tricks.com/almanac/properties/t/transition/

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

The most challenging step in completing this project was having the buttons properly play their respective audio. The original issue was that the audio would only properly play when previewing the app next to the code, and not when previewing the app in a new tab. This would also only work in the Google Chrome browser, as I have experimented in the Safari browser with saddening results. I realized, after inspecting the new tab's elements, that there was a consistent error whenever I opened the app in a new tab. This issue was related to the Audio Context function, and that most browsers seem to automatically "suspend" the audio context before a user interacts with the webpage. The most likely reason seems to be in preventing pop-ups and jumpscares to users, though this came as a persistent issue on my end. My solution was to copy and paste the line of code that initiated the audio context into every instance of clicking and holding-down-the-mouse for each and every button. That way, the audio context would be resumed as the user interacted with any button on the webpage. Though, in the amount of time I had for this project, I was not able to fix this issue on other browsers. For instance, Safari does not seem to have a function labelled “AudioContext()”, and I feel that it would be way out of the scope of this project to account for such many exceptions for each browser.


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)

After completing my submission, I ask how certain websites account for audio context for each browser? Do developers create many redundant functions, using different names for the same methods, and then hope one of them is accounted for in the user’s browser of choice? Or is there a more systematic approach, where a certain library is imported into the file, which is then automatically downloaded to each user that visits the site, so there is a standardized way of viewing the website? My next question stems directly from this audio context problem, but more specifically dealing with fonts. For certain websites, where either a logo or block of text is seen by a user, to keep consistency throughout all browsers, do they implement a system for redundant functions calling different fonts? Or do they import a library to each user whenever they visit the site, or even refer to an uploaded image as an asset to the project? One of these must be the case, since the fonts some high-end websites use seem to refrain from any standard fonts in HTML/CSS. 

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) Y

With a few more hours at my disposal to fully complete the project to my liking, I would certainly account for the audio context issue, where I would implement redundant functions for each sound played, so as many users as possible can experience my project on full display. I had another feature in mind, though chose not to implement it, for it was a work-around to the audio context issue, where I would instead use my own recorded audio for pressing each tile, and the user can switch from different instruments (i.e. piano, cello). This, of course, would not have corrected the issue, as audio context suspended all audio from the website, not just the tone generator. Another possibility would have been to externally design a logo for the website title, as well as instructions, difficulty buttons, and start/stop buttons, in replace of the standardized selections of fonts. The idea played in my head of implementing multiple songs as the pattern for the game, which I felt would have been more entertaining for the user.

## License

    Copyright [Stephen Byrnes]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.