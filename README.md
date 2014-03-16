SF-Movies
=========

See where movies have been filmed in San Francisco.

### Demo

A demo of the application is running at [tk-sf-movies.herokuapp.com](http://tk-sf-movies.herokuapp.com).

### Running the Application

In order to run this application you will need to:

- Install Node.js
- Install MySQL
- Install Gulp
- Install the application's dependencies (`npm install`)
- Set the `SFMOVIES_MYSQL_HOST`, `SFMOVIES_MYSQL_USER`, `SFMOVIES_MYSQL_PASSWORD`, and `SFMOVIES_MYSQL_DB` environment variables.
- Run either `node index.js` or `gulp` (for development)

-----

### Technical Track

Front end

### Technical Choices

- My original plan was to use the SFData JSON API directly from the front-end (but that did not happen, see below). I've never used the SFData's "SODA 2.0" API before.
- I wanted to geocode things client side, as I was pulling data from SFData directly via the API. I never used Mapbox or Google's geocoding services before.
- I used Backbone.js because it was advised, and a good fit for an application of this level of complexity. I'm very familiar with Backbone.js and use it for a variety of projects.
- Asset compilation was handled with a simple Gulp setup. I've been using Grunt for a while and have recently switched to Gulp due to its simplicity and speed.
- Node.js was used to create a small static file server and barebones API. I've been writing applications with Node.js for a while, and the rest of the application is client-side JS, so it was a natural fit.
- The demo is hosted on Heroku because it provides a free tier for hosting and simple access to a free MySQL provider.

### Trade-offs, Left-outs, and Do-differentlies

- The SFData JSON API could only do full text search (rather than search only the `title` field), which made it impossible to implement proper autocomplete. I had to import the data into a local MySQL database and build an API for my own purposes.
- The `locations` field from the SFData API is occasionally unusable for geocoding. Ideally I would have done a one-off geocoding on every db item, then identified uncoded locations and fixed them.
- Geocoding in real-time comes with request limits, which can come into play if the user is too enthusiastic with the `prev` and `next` buttons. In retrospect, it might have been wise to just do a one-off geocoding of all the location data once I imported it into my own database.
- I would have liked to improve the design and UX of the application more, but time constraints prevented anyhting too fancy.
- I unfortunately didn't have time to get to a proper test suite. The code is nicely modularized and should be eminently testable, however.
- If I had more time, I might try to pull in photos of some locations and display them somewhere in the interface where possible. Movie posters/stills might also be a good way to make the interface more visually interesting.

### Other Code I'm Proud of

Just about all of that is covered on [kempfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.info](http://kempfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.info). There's also the (very) incomplete [tandem.io](https://github.com/Fauntleroy/tandem.io), which is my currently active side project.

### Resume or Public Profile

- Personal website - [kempfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.info](http://kempfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.info)
- LinkedIn - [linkedin.com/in/timothykempf](http://www.linkedin.com/in/timothykempf)