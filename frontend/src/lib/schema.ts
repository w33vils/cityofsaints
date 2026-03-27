export function churchSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Church",
    name: "City of Saints",
    alternateName: "Miasto Świętych",
    description: "A Protestant evangelical church in Łódź, Poland",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Piotrkowska 104",
      addressLocality: "Łódź",
      postalCode: "90-004",
      addressRegion: "Łódzkie",
      addressCountry: "PL",
    },
    telephone: "+48421234567",
    email: "info@cityofsaints.pl",
  };
}

export function eventSchema(event: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: typeof event.description === "string" ? event.description.slice(0, 200) : "",
    startDate: event.date,
    endDate: event.end_date || event.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location?.name || "City of Saints",
      address: { "@type": "PostalAddress", addressLocality: "Łódź", addressCountry: "PL" },
    },
    organizer: { "@type": "Organization", name: "City of Saints", url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001" },
  };
}

export function sermonSchema(sermon: any) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: sermon.title,
    datePublished: sermon.date,
    author: { "@type": "Person", name: sermon.preacher?.name || sermon.preacher || "City of Saints" },
    description: sermon.scripture || "",
    inLanguage: "en",
    provider: { "@type": "Organization", name: "City of Saints" },
  };
}

export function articleSchema(article: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.date,
    author: { "@type": "Person", name: article.author?.name || article.author || "City of Saints" },
    description: article.excerpt || "",
    publisher: { "@type": "Organization", name: "City of Saints" },
  };
}
