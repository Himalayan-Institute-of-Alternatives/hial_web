/*
  ICE STUPA SITE — CONTENT FILE
  ------------------------------------------------------------
  Everything a non-developer needs to update lives in this file.
  Edit the values inside the quotes below and save — the page
  will reflect the change automatically. Don't touch index.html
  or style.css unless you're changing layout/design.

  Fields marked [VERIFY] are best-effort figures drafted from
  public sources and should be checked against HIAL's own
  records before this goes live.
  ------------------------------------------------------------
*/

const ICE_STUPA_DATA = {

  hero: {
    eyebrow: "Himalayan Institute of Alternatives",
    title: "Ice Stupa",
    subtitle: "Cold-desert villages have used gravity and winter air to freeze their own water towers since 2014 — no pumps, no power, no fuel.",
    // this number drives the animated counter in the hero
    totalLitresStored: 67000000, // [VERIFY] cumulative, litres
    totalLitresLabel: "litres of winter water stored to date",
  },

  stats: [
    { value: "2014", label: "Project launched" },
    { value: "24+", label: "Villages building stupas, incl. 8 in Kargil" }, // [VERIFY]
    { value: "33.5m", label: "Height of the tallest stupa on record (2019)" },
    { value: "67M+", label: "Litres of ice stored in a single season" }, // [VERIFY]
  ],

  milestones: [
    {
      year: "2013",
      title: "The spark",
      body: "Engineer Sonam Wangchuk noticed a patch of shaded ice under a footbridge near Leh still holding on in May, long after the surrounding snow had gone. If shade alone could keep ice alive that late, a tall, self-shading cone might hold a village's spring water through the driest weeks."
    },
    {
      year: "2014",
      title: "First structure",
      body: "A small team from the Students' Educational and Cultural Movement of Ladakh (SECMOL) piped stream water through a raised outlet in freezing night air and let gravity do the rest. Within weeks, a cone of ice stood on its own — no electricity, no pump, no fuel."
    },
    {
      year: "Oct 2014",
      title: "Official launch",
      body: "The then Governor of Jammu & Kashmir, N. N. Vohra, formally launched the Ice Stupa Artificial Glacier Project, giving the experiment institutional backing and a mandate to scale beyond a single test site."
    },
    {
      year: "2016",
      title: "World takes notice",
      body: "The project won a Rolex Award for Enterprise, and that same year a team travelled to Switzerland's Engadin valley to raise the first ice stupa outside Ladakh with partner organisation GlaciersAlive — proof the idea could travel to other cold, dry mountains."
    },
    {
      year: "2018–19",
      title: "HIAL is founded",
      body: "The Himalayan Institute of Alternatives opens its campus at Phyang to carry the research further — refining stupa geometry for slower melt, and pairing the work with passive-solar building science for high-altitude homes."
    },
    {
      year: "2019",
      title: "Tallest yet",
      body: "A village team at Shara Phuktsey pushed a single stupa past 33 metres, an unofficial record for Ladakh, climbing the structure through sub-zero nights to keep frozen spray nozzles clear." // [VERIFY exact metres]
    },
    {
      year: "2019–20",
      title: "Bringing hamlets back",
      body: "Working with India's Ministry of Tribal Affairs, HIAL paired a 45-foot stupa with refurbished farm-stays across villages including Kulum, Igoo and Tarchit — a two-year attempt to make abandoned, water-starved settlements liveable again."
    },
    {
      year: "Ongoing",
      title: "A season-by-season practice",
      body: "Each winter now sees stupas rise across more than two dozen villages, with partner initiative Acres of Ice tracking how many litres each season locks away for the spring planting window that follows."
    },
  ],

  // Illustrative positions only — NOT precise GPS. x/y are percentages
  // across the stylised valley illustration (0,0 = top-left).
  places: [
    { name: "Leh", note: "Where the first prototype proved the idea could work.", x: 30, y: 30 },
    { name: "Phyang", note: "HIAL's campus and the base for ongoing R&D.", x: 22, y: 42 },
    { name: "Shara Phuktsey", note: "Site of Ladakh's tallest recorded stupa, 2019.", x: 58, y: 26 },
    { name: "Kulum, Igoo & Tarchit", note: "Villages rehabilitated alongside a 45-ft stupa, 2019–20.", x: 46, y: 62 },
    { name: "Kargil villages", note: "Eight villages in the Kargil district now build stupas each winter.", x: 78, y: 55 },
  ],

  howItWorks: [
    { step: "1", title: "Pipe it high", body: "Stream water is carried by gravity alone through a pipe raised above the village." },
    { step: "2", title: "Let winter freeze it", body: "Released into sub-zero night air, the water freezes mid-fall, building a cone rather than a sheet." },
    { step: "3", title: "Store the shape", body: "A tall, narrow cone exposes less surface to spring sun than flat ice, so it lasts weeks longer." },
    { step: "4", title: "Release it on schedule", body: "As it melts through April and May, it feeds the exact window when sowing season needs water most." },
  ],

  links: {
    mainSite: "https://hial.edu.in",
    apply: "https://hial.edu.in",
  }
};
