'use strict';

const Metalsmith         = require('metalsmith');
const prism              = require('metalsmith-prism');
const drafts             = require('metalsmith-drafts');
const assets             = require('metalsmith-assets');
const layouts            = require('metalsmith-layouts');
const inPlace            = require('metalsmith-in-place');
const paginate           = require('metalsmith-paginate');
const gravatar           = require('metalsmith-gravatar');
const excerpts           = require('metalsmith-excerpts');
const redirect           = require('metalsmith-redirect');
const permalinks         = require('metalsmith-permalinks');
const collections        = require('metalsmith-collections');
const discoverHelpers    = require('metalsmith-discover-helpers');
const discoverPartials   = require('metalsmith-discover-partials');
const markdownRemarkable = require('metalsmith-markdown-remarkable');

const remarkableEmoji    = require('remarkable-emoji');
const remarkableMentions = require('remarkable-mentions');

console.log(process.env.NODE_ENV);
Metalsmith(__dirname)
.metadata({
  site: {
    // Site Info
    title: "Peden Software",
    description: "Projects and Experiments",
    url: process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "http://peden.software",
    // url: "http://peden.software",

    reading_time: true,
    words_per_minute: 200,

    disqus: 'peden-software',
    google_analytics: 'UA-85015540-1',

    // Site Locale Info
    timezone: 'America/Chicago',
    locale: 'en_US',

    // Site Menu
    menu: [{
      title: 'Blog',
      url: '/blog',
    }, {
      title: 'Home',
      url: '/',
    }],

    // Generator Info
    generator: {
      name: 'Matalsmith',
      url: "http://www.metalsmith.io/",
    },

    // Theme Info
    theme: {
      name: 'Neo-HPSTR Metalsmith',
      url: "https://github.com/tjpeden/nep-hpstr-metalsmith-theme",
    },

    // Owner Info
    owner: {
      name: "TJ Peden",
      url: "http://peden.software",
      bio: "I'm a software developer, programming language enthusiast, hardware and software guru, tech fanatic.",
      twitter: 'tjpeden',
      networks: [{
        name: 'GitHub',
        icon: 'github-alt',
        url: "https://github.com/tjpeden",
      }, {
        name: 'CodePen',
        icon: 'codepen',
        url: "http://codepen.io/tjpeden/",
      }, {
        name: 'Facebook',
        icon: 'facebook-official',
        url: "https://www.facebook.com/tj.peden",
      }, {
        name: 'Twitter',
        icon: 'twitter',
        url: "https://twitter.com/tjpeden",
      }, {
        name: 'LinkedIn',
        icon: 'linkedin',
        url: "https://www.linkedin.com/in/tjpeden",
      }],
    },
  },
})
// .source('./content')
.destination('./public')
.clean(true)
.use(drafts())
.use(
  markdownRemarkable('full', {
    html: true,
    linkify: true,
    typographer: true,
  })
  .use(remarkableEmoji)
  .use(remarkableMentions())
)
.use(prism({
  lineNumbers: true,
}))
.use(excerpts())
.use(collections())
.use(gravatar({
  owner: "tj@tjcoding.com",
}))
.use(permalinks({
  pattern: ':title',
  linksets: [
    {
      match: { collection: 'posts' },
      pattern: 'blog/:date/:title',
    },
  ],
}))
.use(paginate({
  path: 'blog/page',
}))
.use(discoverHelpers())
.use(discoverPartials())
.use(inPlace({
  engine: 'handlebars',
}))
.use(layouts({
  engine: 'handlebars',
  default: 'page.html',
}))
.use(redirect({
  '/2016/09/13/on-the-fence.html': '/on-the-fence',
}))
.use(assets({
  source: './assets',
}))
.build((error, files) => { if(error) { throw error; } });