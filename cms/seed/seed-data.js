"use strict";

/**
 * Seed data for City of Saints CMS
 *
 * Auto-runs from bootstrap lifecycle on first boot.
 */

const seedData = {
  // ── Locations ──────────────────────────────────────────
  locations: [
    {
      name: "Łódź Centrum",
      slug: "lodz-centrum",
      address: "ul. Piotrkowska 104",
      city: "Łódź",
      postal_code: "90-004",
      voivodeship: "Łódzkie",
      country: "Poland",
      email: "centrum@cityofsaints.pl",
      phone: "+48 42 123 45 67",
      description:
        "Our main gathering place in the heart of Łódź, on the iconic Piotrkowska Street. Join us for Sunday worship, midweek groups, and community events.",
      google_maps_embed:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.5!2d19.456!3d51.759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDQ1JzMyLjQiTiAxOcKwMjcnMjEuNiJF!5e0!3m2!1sen!2spl!4v1" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
      service_times: [
        { label: "Sunday", times: "10:00 AM | 6:00 PM" },
        { label: "Wednesday", times: "7:00 PM (Bible Study)" },
      ],
      publishedAt: new Date().toISOString(),
    },
  ],

  // ── Team Members ────────────────────────────────────────
  teamMembers: [
    {
      name: "Pastor Marek Kowalski",
      slug: "marek-kowalski",
      title: "Lead Pastor",
      email: "marek@cityofsaints.pl",
      bio: "Pastor Marek founded City of Saints with a vision to see a thriving Protestant community in Łódź. He holds a Master of Divinity and has served in pastoral ministry for over 15 years.",
      role: "Elder",
      division: "Pastoral",
      publishedAt: new Date().toISOString(),
    },
    {
      name: "Anna Nowak",
      slug: "anna-nowak",
      title: "Worship Director",
      email: "anna@cityofsaints.pl",
      bio: "Anna leads our worship ministry with a heart for authentic, Christ-centered worship. She studied music at the Academy of Music in Łódź.",
      role: "Staff",
      division: "Worship",
      publishedAt: new Date().toISOString(),
    },
    {
      name: "Tomasz Wiśniewski",
      slug: "tomasz-wisniewski",
      title: "Youth Pastor",
      email: "tomasz@cityofsaints.pl",
      bio: "Tomasz is passionate about reaching the next generation with the Gospel. He oversees both the Students and Young Adults ministries.",
      role: "Staff",
      division: "Youth & Young Adults",
      publishedAt: new Date().toISOString(),
    },
  ],

  // ── Ministries ──────────────────────────────────────────
  ministries: [
    {
      name: "Kids",
      slug: "kids",
      tagline: "Helping children discover the love of Jesus",
      description:
        "City of Saints Kids exists to partner with parents in laying a foundation of faith for the youngest members of our church. Through age-appropriate Bible teaching, worship, and fun activities, we help kids aged 0-12 discover God's love for them.",
      icon: "Baby",
      email: "kids@cityofsaints.pl",
      cta_text: "Want to serve in Kids Ministry?",
      what_we_do: [
        { heading: "Sunday Kids Church", body: "During the 10:00 AM service, children enjoy their own age-appropriate worship, Bible lesson, and activities.", icon: "Church" },
        { heading: "Midweek Kids Club", body: "Wednesday evenings include games, crafts, Bible stories, and snacks for children aged 4-12.", icon: "Star" },
      ],
      faqs: [
        { question: "What ages are included in Kids Ministry?", answer: "We welcome children from birth through age 12 (6th grade equivalent)." },
        { question: "Is there a check-in process?", answer: "Yes, all children are checked in by a parent or guardian before each service. You will receive a security tag to pick up your child afterward." },
      ],
      publishedAt: new Date().toISOString(),
    },
    {
      name: "Students",
      slug: "students",
      tagline: "Growing together in faith during the teen years",
      description: "Our Students Ministry is for teenagers aged 13-18. We gather for worship, teaching, and small groups where students can ask real questions and build lasting friendships rooted in Christ.",
      icon: "Backpack",
      email: "students@cityofsaints.pl",
      cta_text: "Get involved with Students Ministry",
      publishedAt: new Date().toISOString(),
    },
    {
      name: "Young Adults",
      slug: "young-adults",
      tagline: "Community and calling for the next generation",
      description: "City of Saints Young Adults is for those aged 18-30. We meet weekly for Bible study, prayer, and fellowship.",
      icon: "GraduationCap",
      email: "youngadults@cityofsaints.pl",
      cta_text: "Join Young Adults",
      publishedAt: new Date().toISOString(),
    },
  ],

  // ── Initiatives ─────────────────────────────────────────
  initiatives: [
    {
      name: "For the City",
      slug: "for-the-city",
      tagline: "Serving Łódź with the love of Christ",
      description: "For the City is our community outreach initiative. We partner with local organizations in Łódź to serve the homeless, support refugees, tutor children, and care for the elderly.",
      email: "forthecity@cityofsaints.pl",
      publishedAt: new Date().toISOString(),
    },
    {
      name: "For the Nations",
      slug: "for-the-nations",
      tagline: "Taking the Gospel to the ends of the earth",
      description: "For the Nations coordinates our global mission partnerships. We support missionaries in Central Asia, East Africa, and Western Europe.",
      email: "forthenations@cityofsaints.pl",
      publishedAt: new Date().toISOString(),
    },
  ],

  // ── Sermon Series ───────────────────────────────────────
  sermonSeries: [
    {
      title: "Foundations of Faith",
      slug: "foundations-of-faith",
      description: "A journey through the core beliefs of the Christian faith.",
      is_current: true,
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Letters to the Church",
      slug: "letters-to-the-church",
      description: "Walking through the letter to the Ephesians.",
      is_current: false,
      publishedAt: new Date().toISOString(),
    },
  ],

  // ── Sermons ─────────────────────────────────────────────
  sermons: [
    {
      title: "The Authority of Scripture",
      slug: "the-authority-of-scripture",
      date: "2026-03-22",
      scripture: "2 Timothy 3:16-17",
      book: "Second Timothy",
      format: "Audio & Video",
      audio_url: "https://example.com/sermons/authority-of-scripture.mp3",
      video_url: "https://example.com/sermons/authority-of-scripture.mp4",
      notes: "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness.",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Grace Alone",
      slug: "grace-alone",
      date: "2026-03-15",
      scripture: "Ephesians 2:8-9",
      book: "Ephesians",
      format: "Audio & Video",
      audio_url: "https://example.com/sermons/grace-alone.mp3",
      notes: "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God.",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Christ Our Cornerstone",
      slug: "christ-our-cornerstone",
      date: "2026-03-08",
      scripture: "Ephesians 2:19-22",
      book: "Ephesians",
      format: "Audio",
      audio_url: "https://example.com/sermons/christ-our-cornerstone.mp3",
      notes: "Built on the foundation of the apostles and prophets, Christ Jesus himself being the cornerstone.",
      publishedAt: new Date().toISOString(),
    },
  ],

  // ── Events ──────────────────────────────────────────────
  events: [
    {
      title: "Easter at City of Saints",
      slug: "easter-at-city-of-saints",
      description: "Join us for a special Easter celebration! All are welcome. Services in Polish and English.",
      date: "2026-04-05",
      time: "9:00 AM & 11:00 AM",
      category: "General",
      registration_required: false,
      has_food: false,
      offers_childcare: true,
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Marriage Retreat Weekend",
      slug: "marriage-retreat-weekend",
      description: "A weekend getaway for couples to reconnect and grow together in faith. Cost: 800 PLN per couple.",
      date: "2026-05-15",
      end_date: "2026-05-17",
      time: "Friday 6 PM — Sunday 12 PM",
      category: "Retreat",
      registration_required: true,
      max_attendees: 30,
      registration_deadline: "2026-05-01",
      has_food: true,
      offers_childcare: false,
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Community Service Day",
      slug: "community-service-day",
      description: "Join us as we serve the city of Łódź together!",
      date: "2026-04-18",
      time: "9:00 AM — 2:00 PM",
      category: "Service",
      registration_required: true,
      max_attendees: 50,
      registration_deadline: "2026-04-15",
      has_food: true,
      offers_childcare: false,
      publishedAt: new Date().toISOString(),
    },
  ],

  // ── Articles ────────────────────────────────────────────
  articles: [
    {
      title: "What Does Sola Scriptura Mean for Us Today?",
      slug: "what-does-sola-scriptura-mean-today",
      date: "2026-03-10",
      category: "Theology",
      body: "The Protestant Reformation was built on five pillars. Among them, Sola Scriptura stands as the foundation. At City of Saints, we are committed to this principle.",
      excerpt: "Exploring the Protestant principle of Sola Scriptura.",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Finding Community in a New City",
      slug: "finding-community-in-a-new-city",
      date: "2026-02-20",
      category: "Christian Living",
      body: "Moving to a new city can be lonely. At City of Saints, we believe small groups are the heartbeat of community.",
      excerpt: "How small groups can help you find authentic community in Łódź.",
      publishedAt: new Date().toISOString(),
    },
  ],

  // ── Classes ─────────────────────────────────────────────
  classes: [
    {
      title: "Discovering City of Saints",
      slug: "discovering-city-of-saints",
      type: "Connect",
      start_date: "2026-04-12",
      end_date: "2026-04-12",
      time: "12:30 PM — 2:00 PM (lunch provided)",
      description: "New to City of Saints? Learn about who we are, what we believe, and how to get connected.",
      frequency: "One-time",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Foundations: Core Beliefs",
      slug: "foundations-core-beliefs",
      type: "Class",
      start_date: "2026-04-15",
      end_date: "2026-06-03",
      time: "Wednesdays, 7:00 PM — 8:30 PM",
      description: "An 8-week course exploring the foundational doctrines of the Protestant Christian faith.",
      frequency: "Weekly",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Baptism Class",
      slug: "baptism-class",
      type: "Baptism",
      start_date: "2026-05-03",
      end_date: "2026-05-03",
      time: "Sunday, 12:30 PM — 1:30 PM",
      description: "Interested in being baptized? This class explains what baptism is, why it matters, and what to expect.",
      frequency: "One-time",
      publishedAt: new Date().toISOString(),
    },
  ],

  // ── Single Types ────────────────────────────────────────
  homePage: {
    hero_heading: "City of Saints",
    hero_subheading: "A Protestant church in Łódź, Poland — gathering to love God, the church, the city, and the nations.",
    welcome_overline: "WHO WE ARE",
    welcome_heading: "We're a Protestant church in Łódź, gathering to love God, the church, the city, and the nations.",
    publishedAt: new Date().toISOString(),
  },

  givePage: {
    give_url: "https://give.cityofsaints.pl",
    intro_heading: "Why We Give",
    why_give: "Giving is an act of worship and obedience to God (2 Corinthians 9:7).",
    why_give_to_us: "Your giving directly supports the ministry and mission of City of Saints in Łódź.",
    primary_methods: [
      { icon: "Landmark", label: "Bank Transfer (Przelew)", fee: "Free", recommended: true, url: "https://give.cityofsaints.pl/bank" },
      { icon: "CreditCard", label: "Debit/Credit Card", fee: "Small processing fee", recommended: false, url: "https://give.cityofsaints.pl/card" },
      { icon: "Smartphone", label: "BLIK / Online Payment", fee: "Varies by provider", recommended: false, url: "https://give.cityofsaints.pl/blik" },
    ],
    other_methods: [
      { icon: "FileCheck", label: "Cash / Envelope", body: "You can give in person during any Sunday service." },
      { icon: "TrendingUp", label: "Standing Order (Zlecenie stałe)", body: "Set up a recurring transfer through your bank." },
      { icon: "ShieldCheck", label: "International Transfer", body: "Contact us for IBAN and SWIFT details." },
    ],
    faqs: [
      { question: "How can I set up a recurring gift?", answer: "Set up a standing order (zlecenie stałe) through your bank." },
      { question: "Will I receive a confirmation?", answer: "Yes, all electronic gifts receive an automatic email confirmation." },
      { question: "Can I give in a currency other than PLN?", answer: "Yes! Contact info@cityofsaints.pl for IBAN/SWIFT details." },
      { question: "How is the budget managed?", answer: "Our elders oversee the church budget with full transparency." },
    ],
    publishedAt: new Date().toISOString(),
  },

  siteSettings: {
    church_name: "City of Saints",
    church_name_polish: "Miasto Świętych",
    tagline: "A Protestant church in Łódź, Poland",
    contact_email: "info@cityofsaints.pl",
    contact_phone: "+48 42 123 45 67",
    give_url: "https://give.cityofsaints.pl",
    default_currency: "PLN",
    default_locale: "en",
    social_facebook: "https://facebook.com/cityofsaintspl",
    social_instagram: "https://instagram.com/cityofsaintspl",
    social_youtube: "https://youtube.com/@cityofsaintspl",
  },
};

async function runSeed(strapi) {
  const entityCount = await strapi.query("api::location.location").count();
  if (entityCount > 0) {
    strapi.log.info("[seed] Data already exists — skipping seed.");
    return;
  }

  strapi.log.info("[seed] Seeding City of Saints development data...");

  // 1. Locations
  const locationMap = {};
  for (const loc of seedData.locations) {
    const { service_times, ...locData } = loc;
    const created = await strapi.documents("api::location.location").create({
      data: { ...locData, service_times },
      status: "published",
    });
    locationMap[loc.slug] = created;
  }
  strapi.log.info("[seed] Created " + seedData.locations.length + " locations");

  // 2. Initiatives
  const initiativeMap = {};
  for (const init of seedData.initiatives) {
    const created = await strapi.documents("api::initiative.initiative").create({
      data: init,
      status: "published",
    });
    initiativeMap[init.slug] = created;
  }
  strapi.log.info("[seed] Created " + seedData.initiatives.length + " initiatives");

  // 3. Ministries
  const ministryMap = {};
  for (const min of seedData.ministries) {
    const { what_we_do, faqs, ...minData } = min;
    const created = await strapi.documents("api::ministry.ministry").create({
      data: { ...minData, what_we_do, faqs },
      status: "published",
    });
    ministryMap[min.slug] = created;
  }
  strapi.log.info("[seed] Created " + seedData.ministries.length + " ministries");

  // 4. Team Members
  const teamMap = {};
  for (const member of seedData.teamMembers) {
    const created = await strapi.documents("api::team-member.team-member").create({
      data: {
        ...member,
        congregation: locationMap["lodz-centrum"] ? locationMap["lodz-centrum"].documentId : undefined,
      },
      status: "published",
    });
    teamMap[member.slug] = created;
  }
  strapi.log.info("[seed] Created " + seedData.teamMembers.length + " team members");

  // 5. Sermon Series
  const seriesMap = {};
  for (const series of seedData.sermonSeries) {
    const created = await strapi.documents("api::sermon-series.sermon-series").create({
      data: series,
      status: "published",
    });
    seriesMap[series.slug] = created;
  }
  strapi.log.info("[seed] Created " + seedData.sermonSeries.length + " sermon series");

  // 6. Sermons
  for (const sermon of seedData.sermons) {
    await strapi.documents("api::sermon.sermon").create({
      data: {
        ...sermon,
        preacher: teamMap["marek-kowalski"] ? teamMap["marek-kowalski"].documentId : undefined,
        series: seriesMap["foundations-of-faith"] ? seriesMap["foundations-of-faith"].documentId : undefined,
      },
      status: "published",
    });
  }
  strapi.log.info("[seed] Created " + seedData.sermons.length + " sermons");

  // 7. Events
  for (const event of seedData.events) {
    await strapi.documents("api::event.event").create({
      data: {
        ...event,
        location: locationMap["lodz-centrum"] ? locationMap["lodz-centrum"].documentId : undefined,
      },
      status: "published",
    });
  }
  strapi.log.info("[seed] Created " + seedData.events.length + " events");

  // 8. Articles
  for (const article of seedData.articles) {
    await strapi.documents("api::article.article").create({
      data: {
        ...article,
        author: teamMap["marek-kowalski"] ? teamMap["marek-kowalski"].documentId : undefined,
      },
      status: "published",
    });
  }
  strapi.log.info("[seed] Created " + seedData.articles.length + " articles");

  // 9. Classes
  for (const cls of seedData.classes) {
    await strapi.documents("api::class.class").create({
      data: {
        ...cls,
        location: locationMap["lodz-centrum"] ? locationMap["lodz-centrum"].documentId : undefined,
      },
      status: "published",
    });
  }
  strapi.log.info("[seed] Created " + seedData.classes.length + " classes");

  // 10. Single types
  await strapi.documents("api::home-page.home-page").create({
    data: seedData.homePage,
    status: "published",
  });
  strapi.log.info("[seed] Created home page content");

  await strapi.documents("api::give-page.give-page").create({
    data: seedData.givePage,
    status: "published",
  });
  strapi.log.info("[seed] Created give page content");

  await strapi.documents("api::site-setting.site-setting").create({
    data: seedData.siteSettings,
  });
  strapi.log.info("[seed] Created site settings");

  strapi.log.info("[seed] Seeding complete!");
}

module.exports = { seedData, runSeed };
