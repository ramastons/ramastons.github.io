# Build site
bundle exec jekyll build

# Clean existing files and copy artifact
rmdir ../_site -recurse -force -Confirm:$false -ErrorAction:SilentlyContinue
Copy-Item "./_site" -Destination "../_site" -Recurse
cd ../_site

# Init repo for gh-pages
git init
git checkout -b gh-pages
git add *
git commit -m "gh-pages deployment"

# Upload site to github
git remote add origin https://github.com/ramastons/web.git
git push origin gh-pages:gh-pages -f

# Return to path and clean up
cd ../www.ramastons.com
rmdir ../_site -recurse -force -Confirm:$false -ErrorAction:SilentlyContinue