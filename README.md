# Open Source Software Project

Site advocating for the adoption of Open Source Software.

## Contributing

The site has a simple build process powered by nodejs/npm and gulp. The file `main.html` is technically a (GitHub flavoured) markdown file with HTML embedded, and is compiled using `marked`. (For all intents and purposes the `main.html` file is an HTML file with embedded markdown.) Also, the CSS is written in the `index.scss` file and compiled using the build process. If you want to edit the site, you will need to set up the build process as detailed below:

Install npm packages: `npm install` and `sudo npm install --global gulp`

Run build process: `gulp`

Watch (automatically rerun build on file save): `gulp watch`

Please always build before committing.

## License

Copyright (c) Oliver Balfour 2018. Licensed under the [zlib/libpng license.](https://github.com/Tobsta/OpenSource/blob/master/LICENSE.md)
