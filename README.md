# Liribot play link
Except this time I suppose this isn't helpful. Video demo link!
https://youtu.be/Lz27dIfhU1E

# Liribot Repo
https://github.com/Nackles/liribot

# Liribot Instructions
1. Clone the repo to your computer.
2. Obtain API access from Spotify. https://developer.spotify.com/documentation/web-api/quick-start/
3. Create a file named '.env' with the following (minus accent marks), then save it in your liribot root.:
```
# Spotify API keys

SPOTIFY_ID=your CLIENT ID from Spotify
SPOTIFY_SECRET=your CLIENT SECRET from Spotify
```
4. To use Liribot, navigate to its folder using Bash or another CLI and type "node liri.js" FOLLOWED BY one of the following command strings (do not include the quotations)

"concert-list" + "a band you want to see is touring"
"spotify-this-song" + "the title of a track you want to know more about"
"movie-this" + "title of a movie you want to know more about"
"do-what-it-says" + leave this one blank. Just do what it says.
5. Enjoy and feel free to contact me via Github with questions! Thanks for operating Liribot.

# Known bugs
One of the concert date functions is being returned incorrectly as today's date - this is likely due to a mishandling of the 'moment' package.

# Nice-To-Haves
*I want to make the input an inqurier prompt for nicer usability and recursion.
