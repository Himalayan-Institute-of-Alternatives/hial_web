#!/bin/bash

echo "🔧 Fixing ALL case sensitivity issues in the entire project..."

cd public

echo "📁 Processing HTML files..."

# Fix HTML file references in all HTML files
echo "Fixing HTML file references..."
find . -name "*.html" -type f -exec sed -i 's/href="\.\/executiveTeam\.html"/href=".\/executiveteam.html"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/href="\.\/hillsFello\.html"/href=".\/hillsfello.html"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/href="\.\/ladakhFellow\.html"/href=".\/ladakhfellow.html"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/href="\.\/osDA\.html"/href=".\/osda.html"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/href="\.\/dwF\.html"/href=".\/dwf.html"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/href="\.\/campusLife\.html"/href=".\/campuslife.html"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/href="\.\/joinTheCause\.html"/href=".\/jointhecause.html"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/href="\.\/SEF\/index\.html"/href=".\/sef\/index.html"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/href="\.\/AnualReport\//href=".\/anualreport\//g' {} \;
find . -name "*.html" -type f -exec sed -i 's/href="\.\/lifeAtPhyangvillage\.html"/href=".\/lifeatphyangvillage.html"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/href="\.\/agriVoltac\.html"/href=".\/agrivoltac.html"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/href="\.\/IsAutomation\.html"/href=".\/isautomation.html"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/href="\.\/solarTent\.html"/href=".\/solartent.html"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/href="\.\/GTS\.html"/href=".\/gts.html"/g' {} \;

# Fix image file case sensitivity issues
echo "Fixing image file references..."
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/Tarchit_Trek\.jpeg"/src=".\/static\/tarchit_trek.jpeg"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/Model-PSH-Buildings-at-HIAL\.webp"/src=".\/static\/model-psh-buildings-at-hial.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/LIVE-SIMPLY-1024x683\.webp"/src=".\/static\/live-simply-1024x683.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/RTc\.webp"/src=".\/static\/rtc.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/solarTent1\.jpeg"/src=".\/static\/solartent1.jpeg"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/solarTent2\.jpg"/src=".\/static\/solartent2.jpg"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/solarTent4\.JPG"/src=".\/static\/solartent4.jpg"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/IS1\.JPG"/src=".\/static\/is1.jpg"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/IS2\.JPG"/src=".\/static\/is2.jpg"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/IS3\.JPG"/src=".\/static\/is3.jpg"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/IS4\.jpg"/src=".\/static\/is4.jpg"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/psh2\.JPG"/src=".\/static\/psh2.jpg"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/psh3\.JPG"/src=".\/static\/psh3.jpg"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/DfW\/DFWLadakh\.jpg"/src=".\/static\/dfw\/dfwladakh.jpg"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/S&Eposter\.jpg"/src=".\/static\/s&eposter.jpg"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/osda\/osdaPoster\.jpg"/src=".\/static\/osda\/osdaposter.jpg"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/osda\/Sonam_Wangchuk\.png"/src=".\/static\/osda\/sonam_wangchuk.png"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/osda\/Gitanjali_J_Angmo\.png"/src=".\/static\/osda\/gitanjali_j_angmo.png"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/osda\/Richa_Hushing\.png"/src=".\/static\/osda\/richa_hushing.png"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/osda\/Rrivu_Laha\.png"/src=".\/static\/osda\/rrivu_laha.png"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/The-SPV-car-shed\.png"/src=".\/static\/the-spv-car-shed.png"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/The-Battery-house\.webp"/src=".\/static\/the-battery-house.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/The-PreFREB-Net-Energy-Positive-Prototype-Building-at-HIAL\.webp"/src=".\/static\/the-prefreb-net-energy-positive-prototype-building-at-hial.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/Representation-of-Ex-fill-Construction-Type-3-150x150\.webp"/src=".\/static\/representation-of-ex-fill-construction-type-3-150x150.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/Representation-of-Ex-fill-Construction-Type-1-150x150\.webp"/src=".\/static\/representation-of-ex-fill-construction-type-1-150x150.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/Representation-of-Confined-masonry-ex-fill-Construction-Type-1-150x112\.webp"/src=".\/static\/representation-of-confined-masonry-ex-fill-construction-type-1-150x112.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/Representation-of-Confined-masonry-ex-fill-Construction-Type-2-150x112\.webp"/src=".\/static\/representation-of-confined-masonry-ex-fill-construction-type-2-150x112.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/Representation-of-Ex-fill-Construction-Type-2-150x150 (1)\.webp"/src=".\/static\/representation-of-ex-fill-construction-type-2-150x150 (1).webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/Representation-of-Ex-fill-Construction-Type-2-150x150\.webp"/src=".\/static\/representation-of-ex-fill-construction-type-2-150x150.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/Largescale-Ex-fill-construction-Prototype-Building-being-constructed-at-HIAL\.webp"/src=".\/static\/largescale-ex-fill-construction-prototype-building-being-constructed-at-hial.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/Straw-clay-arch-as-roof-for-an-upcoming-building-at-HIAL\.png"/src=".\/static\/straw-clay-arch-as-roof-for-an-upcoming-building-at-hial.png"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/The-prototype-solar-tent-at-HIAL\.webp"/src=".\/static\/the-prototype-solar-tent-at-hial.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/Rehabilitation2\.webp"/src=".\/static\/rehabilitation2.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/Rehabilitation3\.webp"/src=".\/static\/rehabilitation3.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/High valley desert greening1\.webp"/src=".\/static\/high valley desert greening1.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/High valley desert greening2\.webp"/src=".\/static\/high valley desert greening2.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/Average-and-Minimum-temperatures-of-PSH-vs-Non-PSH-buildings\.webp"/src=".\/static\/average-and-minimum-temperatures-of-psh-vs-non-psh-buildings.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/Thermal-Blocks-with-an-Illustration-of-Modified-Trombe-Walls-in-PSH-Buildings-of-HIAL\.webp"/src=".\/static\/thermal-blocks-with-an-illustration-of-modified-trombe-walls-in-psh-buildings-of-hial.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/A-Strawclay-brick\.jpg"/src=".\/static\/a-strawclay-brick.jpg"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/hial_conceptual_model\.webp"/src=".\/static\/hial_conceptual_model.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/4_key_pillars\.webp"/src=".\/static\/4_key_pillars.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/mission_side_photo\.webp"/src=".\/static\/mission_side_photo.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/values_side_phpto\.webp"/src=".\/static\/values_side_phpto.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/osda\/osdaHero\.png"/src=".\/static\/osda\/osdahero.png"/g' {} \;

# Fix logo and other image references
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/logo_axixBank\.png"/src=".\/static\/logo_axixbank.png"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/logo_CHRobinson\.png"/src=".\/static\/logo_chrobinson.png"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/logo_infoEdge\.gif"/src=".\/static\/logo_infoedge.gif"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/logo_jainIrrigation\.png"/src=".\/static\/logo_jainirrigation.png"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/logo_LNG\.jpg"/src=".\/static\/logo_lng.jpg"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/logo_PWC\.png"/src=".\/static\/logo_pwc.png"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/logo_R2F\.jpg"/src=".\/static\/logo_r2f.jpg"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/logo_sterlingIndia\.webp"/src=".\/static\/logo_sterlingindia.webp"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/logo_TT_Tibet\.png"/src=".\/static\/logo_tt_tibet.png"/g' {} \;

# Fix video references
find . -name "*.html" -type f -exec sed -i 's/src="\.\/static\/videos\/Ladakh_Fellow_Promo\.mp4"/src=".\/static\/videos\/ladakh_fellow_promo.mp4"/g' {} \;

# Fix PDF references
find . -name "*.html" -type f -exec sed -i 's/href="\.\/static\/osda\/OSDA 2025-26 Brochure - Latest Update\.pdf"/href=".\/static\/osda\/osda 2025-26 brochure - latest update.pdf"/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/href="\.\/static\/DfW\/61\. Hands On Documentary Film Workshop in Ladakh - Updated\.pdf"/href=".\/static\/dfw\/61. hands on documentary film workshop in ladakh - updated.pdf"/g' {} \;

# Fix Tailwind config case sensitivity
echo "Fixing Tailwind config case sensitivity..."
sed -i 's/heroSlider\.gif/heroslider.gif/g' tailwind.config.js

echo "✅ All case sensitivity fixes applied!"
echo "📝 Run this script before pushing to ensure all files are properly referenced."
echo "🚀 Ready for deployment!" 