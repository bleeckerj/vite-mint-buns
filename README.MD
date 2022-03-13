npm create vite@latest
cd vite-project
npm install
code . (or editor of choice..)
npm run dev
npm run build
npm run preview

runs on netlify 
does not run on heroku

had it on this deploy on netlify: https://ecstatic-knuth-365a43.netlify.app/

lots of shenanigans i don't understand about how netlify builds and throws some assets under public for some reason..not sure why it just doesn't run from the way the build is set up.