/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],

  theme: {
    extend: {
      content: {
        title_msg: "Message From Founding Director",
      },
      display: ["group-hover"],
      display: {
        "mega-menu-full": "none",
      },
      backgroundImage: {
        hero: "url('https://s0kfx0z4.tinifycdn.com/static/hills-f.jpg')",
        learningByDoing: "url('./static/11.png')",
        RtoH: "url('./static/3h3rr.png')",
        collab: "url('./static/22.png')",
        givingBack: "url('./static/33.png')",
        sw: "url('./static/sw.jpg')",
        gjb: "url('./static/GJA.jpeg')",
        hero_hial_campus_aab: "url('./static/hial_campus_aab.jpg')",
        slider: "url('./static/heroSlider.gif')",

        pattern: "url('/img/pattern.png')",
        anualReport: "url('./static/gallery.jpg')",

        designFestTexture: "url('./static/designFest/bg_texture.jpg')",
        designFestTexture1: "url('./static/designFest/bg_texture1.jpg')",
        designFestTexture2: "url('./static/designFest/bg_texture2.jpg')",
      },
      colors: {
        "theme-maroon": "#711117",
        "theme-golden": "#886729",
        "theme-golden-light": "#ffb606",
        "theme-golden-2": "#bd9236",
        "old-yelloow": "#ffb606",
      },
    },
  },
  plugins: [],
};
