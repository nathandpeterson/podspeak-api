
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('podcasts').del()
    .then(function () {
      // Inserts seed entries
      return knex('podcasts').insert([
          {id: 1, 
          title: 'Hanselminutes',
          image_URL: 'http://www.pwop.com/itunes_hanselminutes.jpg',
          description: 'Fresh Air for Developers is a weekly talk show that brings interesting people together to talk about the web, culture, education, technology and more. Hosted by Scott Hanselman, this show promises fresh ideas and great people.',
          rss_feed: 'http://feeds.podtrac.com/P-4IIgRqsKI_',
          latest_pub_date: 'Mon, 15 Feb 2016 00:00:00 EST',
          website: 'https://hanselminutes.com/'},
          {id: 2, 
          title: 'Serial',
          image_URL: 'https://serialpodcast.org/sites/all/modules/custom/serial/img/serial-itunes-logo.png',
          description: "Serial is a podcast from the creators of This American Life, hosted by Sarah Koenig. Serial unfolds one story - a true story - over the course of a whole season. The show follows the plot and characters wherever they lead, through many surprising twists and turns. Sarah won't know what happens at the end of the story until she gets there, not long before you get there with her. Each week she'll bring you the latest chapter, so it's important to listen in, starting with Episode 1. New episodes are released on Thursday mornings.",
          rss_feed: 'http://feeds.serialpodcast.org/serialpodcast',
          latest_pub_date: 'Tue, 28 Mar 2017 13:15:00 +0000',
          website: 'https://serialpodcast.org/'},
          {id: 3, 
          title: 'The Tim Ferriss Show',
          image_URL: 'https://dfkfj8j276wwv.cloudfront.net/images/69/10/10/fb/691010fb-625e-4abe-993c-a57228b28dbe/91cb53ae0d5dbb379b9dffecf0a772593891d0d09bbe6d90ee746edbdb79e3ec75584f2ceb8260e9f675a90c05419b9b99842a76905b686f0f51c1a9d3e227ab.jpeg',
          description: 'Tim Ferriss is a self-experimenter and bestselling author, best known for The 4-Hour Workweek, which has been translated into 40+ languages.  Newsweek calls him "the world\'s best human guinea pig," and The New York Times calls him "a cross between Jack Welch and a Buddhist monk."  In this show, he deconstructs world-class performers from eclectic areas (investing, chess, pro sports, etc.), digging deep to find the tools, tactics, and tricks that listeners can use.',
          rss_feed: 'https://rss.art19.com/tim-ferriss-show',
          latest_pub_date: 'Thu, 18 Jan 2018 20:48:21 -0000',
          website: 'https://tim.blog/podcast/'},
          {id: 4, 
          title: 'Vox\'s The Weeds',
          image_URL: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/54055979/The_Weeds_podcast_Vox.0.png',
          description: 'Everyone is always warning you not to get lost in the weeds. But not Vox\'s Ezra Klein, Sarah Kliff, and Matthew Yglesias. They love the weeds. That\'s where all the policy is. This is the podcast for people who follow politics because they love thinking about health care, economics, and zoning. It is not a podcast for people who like hearing talk about gaffes.',
          rss_feed: 'http://feeds.feedburner.com/voxtheweeds',
          latest_pub_date: 'Tue, 16 Jan 2018 22:23:34 -0000',
          website: 'https://www.vox.com/the-weeds'},
          {id: 5, 
          title: 'Software Engineering Daily',
          image_URL: 'http://is1.mzstatic.com/image/thumb/Music62/v4/6e/3a/7f/6e3a7f2d-b42a-fddd-8761-f2bc316d20b9/source/170x170bb.jpg',
          description: 'We create and organize technical content about software.',
          rss_feed: 'http://softwareengineeringdaily.com/feed/podcast/',
          latest_pub_date: 'Fri, 19 Jan 2018 10:00:46 +0000',
          website: 'https://softwareengineeringdaily.com/'},
          {id: 6, 
          title: 'Recode Decode, hosted by Kara Swisher',
          image_URL: 'http://is4.mzstatic.com/image/thumb/Music62/v4/8c/43/83/8c4383ee-a7cd-6fcb-49df-6245c46fdd10/source/1200x630bb.jpg',
          description: 'One of tech\'s most prominent journalists, Kara Swisher is known for her insightful reporting and straight-shooting style. Listen in as she hosts hard-hitting interviews about the week in tech with influential business leaders and outspoken personalities from media, politics and more.',
          rss_feed: 'http://feeds.feedburner.com/Recode-Decode?format=xml',
          latest_pub_date: 'Wed, 17 Jan 2018 05:01:00 -0000',
          website: 'https://www.recode.net/podcasts/'},
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('podcasts_id_seq', (SELECT MAX(id) FROM podcasts));`
      )
    })
}
