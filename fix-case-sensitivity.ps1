# PowerShell script to fix all case sensitivity issues

Write-Host "Fixing ALL case sensitivity issues in the entire project..." -ForegroundColor Green

Set-Location "public"

Write-Host "Processing HTML files..." -ForegroundColor Yellow

# Get all HTML files
$htmlFiles = Get-ChildItem -Recurse -Filter "*.html"

Write-Host "Found $($htmlFiles.Count) HTML files to process" -ForegroundColor Cyan

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Gray
    
    $content = Get-Content $file.FullName -Raw
    
    # Fix HTML file references
    $content = $content -replace 'href="\.\/executiveTeam\.html"', 'href="./executiveteam.html"'
    $content = $content -replace 'href="\.\/hillsFello\.html"', 'href="./hillsfello.html"'
    $content = $content -replace 'href="\.\/ladakhFellow\.html"', 'href="./ladakhfellow.html"'
    $content = $content -replace 'href="\.\/osDA\.html"', 'href="./osda.html"'
    $content = $content -replace 'href="\.\/dwF\.html"', 'href="./dwf.html"'
    $content = $content -replace 'href="\.\/campusLife\.html"', 'href="./campuslife.html"'
    $content = $content -replace 'href="\.\/joinTheCause\.html"', 'href="./jointhecause.html"'
    $content = $content -replace 'href="\.\/SEF\/index\.html"', 'href="./sef/index.html"'
    $content = $content -replace 'href="\.\/AnualReport\/', 'href="./anualreport/'
    $content = $content -replace 'href="\.\/lifeAtPhyangvillage\.html"', 'href="./lifeatphyangvillage.html"'
    $content = $content -replace 'href="\.\/agriVoltac\.html"', 'href="./agrivoltac.html"'
    $content = $content -replace 'href="\.\/IsAutomation\.html"', 'href="./isautomation.html"'
    $content = $content -replace 'href="\.\/solarTent\.html"', 'href="./solartent.html"'
    $content = $content -replace 'href="\.\/GTS\.html"', 'href="./gts.html"'
    
    # Fix image file references
    $content = $content -replace 'src="\.\/static\/Tarchit_Trek\.jpeg"', 'src="./static/tarchit_trek.jpeg"'
    $content = $content -replace 'src="\.\/static\/Model-PSH-Buildings-at-HIAL\.webp"', 'src="./static/model-psh-buildings-at-hial.webp"'
    $content = $content -replace 'src="\.\/static\/LIVE-SIMPLY-1024x683\.webp"', 'src="./static/live-simply-1024x683.webp"'
    $content = $content -replace 'src="\.\/static\/RTc\.webp"', 'src="./static/rtc.webp"'
    $content = $content -replace 'src="\.\/static\/solarTent1\.jpeg"', 'src="./static/solartent1.jpeg"'
    $content = $content -replace 'src="\.\/static\/solarTent2\.jpg"', 'src="./static/solartent2.jpg"'
    $content = $content -replace 'src="\.\/static\/solarTent4\.JPG"', 'src="./static/solartent4.jpg"'
    $content = $content -replace 'src="\.\/static\/IS1\.JPG"', 'src="./static/is1.jpg"'
    $content = $content -replace 'src="\.\/static\/IS2\.JPG"', 'src="./static/is2.jpg"'
    $content = $content -replace 'src="\.\/static\/IS3\.JPG"', 'src="./static/is3.jpg"'
    $content = $content -replace 'src="\.\/static\/IS4\.jpg"', 'src="./static/is4.jpg"'
    $content = $content -replace 'src="\.\/static\/psh2\.JPG"', 'src="./static/psh2.jpg"'
    $content = $content -replace 'src="\.\/static\/psh3\.JPG"', 'src="./static/psh3.jpg"'
    $content = $content -replace 'src="\.\/static\/DfW\/DFWLadakh\.jpg"', 'src="./static/dfw/dfwladakh.jpg"'
    $content = $content -replace 'src="\.\/static\/S&Eposter\.jpg"', 'src="./static/s&eposter.jpg"'
    $content = $content -replace 'src="\.\/static\/osda\/osdaPoster\.jpg"', 'src="./static/osda/osdaposter.jpg"'
    $content = $content -replace 'src="\.\/static\/osda\/Sonam_Wangchuk\.png"', 'src="./static/osda/sonam_wangchuk.png"'
    $content = $content -replace 'src="\.\/static\/osda\/Gitanjali_J_Angmo\.png"', 'src="./static/osda/gitanjali_j_angmo.png"'
    $content = $content -replace 'src="\.\/static\/osda\/Richa_Hushing\.png"', 'src="./static/osda/richa_hushing.png"'
    $content = $content -replace 'src="\.\/static\/osda\/Rrivu_Laha\.png"', 'src="./static/osda/rrivu_laha.png"'
    $content = $content -replace 'src="\.\/static\/The-SPV-car-shed\.png"', 'src="./static/the-spv-car-shed.png"'
    $content = $content -replace 'src="\.\/static\/The-Battery-house\.webp"', 'src="./static/the-battery-house.webp"'
    $content = $content -replace 'src="\.\/static\/The-PreFREB-Net-Energy-Positive-Prototype-Building-at-HIAL\.webp"', 'src="./static/the-prefreb-net-energy-positive-prototype-building-at-hial.webp"'
    $content = $content -replace 'src="\.\/static\/Representation-of-Ex-fill-Construction-Type-3-150x150\.webp"', 'src="./static/representation-of-ex-fill-construction-type-3-150x150.webp"'
    $content = $content -replace 'src="\.\/static\/Representation-of-Ex-fill-Construction-Type-1-150x150\.webp"', 'src="./static/representation-of-ex-fill-construction-type-1-150x150.webp"'
    $content = $content -replace 'src="\.\/static\/Representation-of-Confined-masonry-ex-fill-Construction-Type-1-150x112\.webp"', 'src="./static/representation-of-confined-masonry-ex-fill-construction-type-1-150x112.webp"'
    $content = $content -replace 'src="\.\/static\/Representation-of-Confined-masonry-ex-fill-Construction-Type-2-150x112\.webp"', 'src="./static/representation-of-confined-masonry-ex-fill-construction-type-2-150x112.webp"'
    $content = $content -replace 'src="\.\/static\/Representation-of-Ex-fill-Construction-Type-2-150x150 \(1\)\.webp"', 'src="./static/representation-of-ex-fill-construction-type-2-150x150 (1).webp"'
    $content = $content -replace 'src="\.\/static\/Representation-of-Ex-fill-Construction-Type-2-150x150\.webp"', 'src="./static/representation-of-ex-fill-construction-type-2-150x150.webp"'
    $content = $content -replace 'src="\.\/static\/Largescale-Ex-fill-construction-Prototype-Building-being-constructed-at-HIAL\.webp"', 'src="./static/largescale-ex-fill-construction-prototype-building-being-constructed-at-hial.webp"'
    $content = $content -replace 'src="\.\/static\/Straw-clay-arch-as-roof-for-an-upcoming-building-at-HIAL\.png"', 'src="./static/straw-clay-arch-as-roof-for-an-upcoming-building-at-hial.png"'
    $content = $content -replace 'src="\.\/static\/The-prototype-solar-tent-at-HIAL\.webp"', 'src="./static/the-prototype-solar-tent-at-hial.webp"'
    $content = $content -replace 'src="\.\/static\/Rehabilitation2\.webp"', 'src="./static/rehabilitation2.webp"'
    $content = $content -replace 'src="\.\/static\/Rehabilitation3\.webp"', 'src="./static/rehabilitation3.webp"'
    $content = $content -replace 'src="\.\/static\/High valley desert greening1\.webp"', 'src="./static/high valley desert greening1.webp"'
    $content = $content -replace 'src="\.\/static\/High valley desert greening2\.webp"', 'src="./static/high valley desert greening2.webp"'
    $content = $content -replace 'src="\.\/static\/Average-and-Minimum-temperatures-of-PSH-vs-Non-PSH-buildings\.webp"', 'src="./static/average-and-minimum-temperatures-of-psh-vs-non-psh-buildings.webp"'
    $content = $content -replace 'src="\.\/static\/Thermal-Blocks-with-an-Illustration-of-Modified-Trombe-Walls-in-PSH-Buildings-of-HIAL\.webp"', 'src="./static/thermal-blocks-with-an-illustration-of-modified-trombe-walls-in-psh-buildings-of-hial.webp"'
    $content = $content -replace 'src="\.\/static\/A-Strawclay-brick\.jpg"', 'src="./static/a-strawclay-brick.jpg"'
    $content = $content -replace 'src="\.\/static\/hial_conceptual_model\.webp"', 'src="./static/hial_conceptual_model.webp"'
    $content = $content -replace 'src="\.\/static\/4_key_pillars\.webp"', 'src="./static/4_key_pillars.webp"'
    $content = $content -replace 'src="\.\/static\/mission_side_photo\.webp"', 'src="./static/mission_side_photo.webp"'
    $content = $content -replace 'src="\.\/static\/values_side_phpto\.webp"', 'src="./static/values_side_phpto.webp"'
    $content = $content -replace 'src="\.\/static\/osda\/osdaHero\.png"', 'src="./static/osda/osdahero.png"'
    
    # Fix logo and other image references
    $content = $content -replace 'src="\.\/static\/logo_axixBank\.png"', 'src="./static/logo_axixbank.png"'
    $content = $content -replace 'src="\.\/static\/logo_CHRobinson\.png"', 'src="./static/logo_chrobinson.png"'
    $content = $content -replace 'src="\.\/static\/logo_infoEdge\.gif"', 'src="./static/logo_infoedge.gif"'
    $content = $content -replace 'src="\.\/static\/logo_jainIrrigation\.png"', 'src="./static/logo_jainirrigation.png"'
    $content = $content -replace 'src="\.\/static\/logo_LNG\.jpg"', 'src="./static/logo_lng.jpg"'
    $content = $content -replace 'src="\.\/static\/logo_PWC\.png"', 'src="./static/logo_pwc.png"'
    $content = $content -replace 'src="\.\/static\/logo_R2F\.jpg"', 'src="./static/logo_r2f.jpg"'
    $content = $content -replace 'src="\.\/static\/logo_sterlingIndia\.webp"', 'src="./static/logo_sterlingindia.webp"'
    $content = $content -replace 'src="\.\/static\/logo_TT_Tibet\.png"', 'src="./static/logo_tt_tibet.png"'
    
    # Fix video references
    $content = $content -replace 'src="\.\/static\/videos\/Ladakh_Fellow_Promo\.mp4"', 'src="./static/videos/ladakh_fellow_promo.mp4"'
    
    # Fix PDF references
    $content = $content -replace 'href="\.\/static\/osda\/OSDA 2025-26 Brochure - Latest Update\.pdf"', 'href="./static/osda/osda 2025-26 brochure - latest update.pdf"'
    $content = $content -replace 'href="\.\/static\/DfW\/61\. Hands On Documentary Film Workshop in Ladakh - Updated\.pdf"', 'href="./static/dfw/61. hands on documentary film workshop in ladakh - updated.pdf"'
    
    # Save the updated content
    Set-Content -Path $file.FullName -Value $content -NoNewline
}

# Fix Tailwind config case sensitivity
Write-Host "Fixing Tailwind config case sensitivity..." -ForegroundColor Yellow
$tailwindConfig = Get-Content "tailwind.config.js" -Raw
$tailwindConfig = $tailwindConfig -replace 'heroSlider\.gif', 'heroslider.gif'
Set-Content -Path "tailwind.config.js" -Value $tailwindConfig -NoNewline

Write-Host "All case sensitivity fixes applied!" -ForegroundColor Green
Write-Host "Run this script before pushing to ensure all files are properly referenced." -ForegroundColor Cyan
Write-Host "Ready for deployment!" -ForegroundColor Green 