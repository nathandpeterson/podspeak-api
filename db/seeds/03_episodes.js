
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('episodes').del()
    .then(function () {
      // Inserts seed entries
      return knex('episodes').insert([
          {id: 1, 
          podcast_id: 1,
          title: 'Developing ON (not for) a Nokia Feature Phone with Elvis Chidera',
          description: 'In 2012, Elvis Chidera wrote his first app on a Nokia feature (J2ME) phone. He wrote the Java App ON the phone (literally writing the Java code with T9 text on a numeric keypad.) Today, he\'s an Android developer at dotlearn.io who has worked on over 50 apps and currently works for an MIT startup. He chats with Scott about the Nigerian mobile market, how feature phones work, and where Android is headed.',
          pub_date: 'Fri, 19 Jan 2018 00:00:00 EDT',
          audio_URL: 'https://www.podtrac.com/pts/redirect.mp3/s3.amazonaws.com/hanselminutes/hanselminutes_0615.mp3',
          duration: '00:30:00'},
          {id: 2, 
          podcast_id: 1,
          title: 'Staying Secure and "Getting Pwned" with Troy Hunt',
          description: 'Troy Hunt runs HaveIBeenPwned.com as a service to us all, but it\'s also a massive learning playground for him. He schools Scott on all things security and privacy. Is your password known? Let\'s ask Troy.',
          pub_date: 'Fri, 12 Jan 2018 00:00:00 EDT',
          audio_URL: 'https://www.podtrac.com/pts/redirect.mp3/s3.amazonaws.com/hanselminutes/hanselminutes_0614.mp3',
          duration: '00:33:00'},
          {id: 3, 
          podcast_id: 1,
          title: 'Functional Programming, F#, and Cloud Containers with Lena Hall',
          description: 'Scott checks in with Alena (Lena) Hall about her thoughts around F#, functional programming, microservices, Kubernetes and containers in the cloud. Where are we heading and are we moving too fast? Is F# well-positioned for the cloud-based future?',
          pub_date: 'Fri, 05 Jan 2018 00:00:00 EDT',
          audio_URL: 'https://www.podtrac.com/pts/redirect.mp3/s3.amazonaws.com/hanselminutes/hanselminutes_0613.mp3',
          duration : '00:31:00'},
          {id: 4,
          podcast_id: 12,
          title: 'Lessons and Warnings from Successful Risk Takers',
          description: 'This is a special episode of the podcast, which features three guests: author Soman Chainani (@SomanChainani), author Susan Cain (@susancain), and East Rock Capital co-founder and investor Graham Duncan. All three are featured in my latest book, Tribe of Mentors, and all three share something in common: they\'re experts at mitigating risk. I don\'t view them as a throw-caution-to-the-wind; nonetheless, they\'ve been good at capping downsides and making various career decisions that have paid off in large ways. I hope you enjoy this episode with these three brilliant guests!',
          pub_date: 'Thu, 18 Jan 2018 20:48:21 -0000',
          audio_URL: 'https://rss.art19.com/episodes/a5fe1e27-0fc8-4134-a007-6bd2a1c4c988.mp3',
          duration: '01:16:43'},
          {id: 5,
          podcast_id: 6,
          title: 'Quart: Flask, but 3x faster',
          description: 'There has been a bunch of new Python web frameworks coming out in the past few years. Generally, these have been focused solely on Python 3 and have tried to leverage Python\'s new async and await features. ',
          pub_date: 'Fri, 19 Jan 2018 00:00:00 -0800',
          audio_URL: 'https://talkpython.fm/episodes/download/147/quart-flask-but-3x-faster.mp3',
          duration: '00:51:02'},
          {id: 6,
          podcast_id: 7,
          title: 'Wednesday, Jan. 24, 2018',
          description: 'Tonya Harding had talent, but the world of figure skating wanted nothing to do with her. She was called “white trash.” And when Nancy Kerrigan was bashed in the knee just before the 1994 Winter Olympics, Ms. Harding became a villain. Now, 24 years later, her narrative is being revisited — and she is back in the spotlight. Guest: Taffy Brodesser-Akner, who interviewed Tonya Harding (now Tonya Price) for The New York Times.',
          pub_date: 'Wed, 24 Jan 2018 11:03:36 -0000',
          audio_URL: 'https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/e32648ad-875d-4d3c-9dec-d05b33c7eb4c.mp3',
          duration: '00:36:55'}
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('episodes_id_seq', (SELECT MAX(id) FROM episodes));`
      )
    })
}
