#!/bin/bash

echo "🔧 Fixing case sensitivity issues in HTML files..."

cd public

# Fix HTML file references
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

# Fix image file references
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

echo "✅ Case sensitivity fixes applied!"
echo "📝 Run this script before pushing to ensure all files are properly referenced." 