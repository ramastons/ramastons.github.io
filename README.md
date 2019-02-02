[DEMO](https://tsjensen.github.io/fuse-core/)

# Fuse Core

**A lightweight Jekyll theme for single-page personal websites.**

[![Screenshot](README.pic1.jpg)](https://tsjensen.github.io/fuse-core/)

This [Jekyll](https://jekyllrb.com/) theme is for you if you need a personal website that simply
summarizes the links to your social media profiles and external content.

- *responsive* - adapts to all screen sizes
- *mobile-friendly*
- *lightweight* - no JavaScript (except for Google Analytics, if enabled)
- *easy to configure* - no HTML knowledge required, just change *_config.yml* ([step-by-step guide](https://github.com/tsjensen/fuse-core/wiki/Setup-Instructions))
- *fast* - All third party components loaded via their CDN (with
  [subresource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)),
  so most resources are already cached from visits to other websites.
- Optional Google Analytics support, with IP anonymization and cookie consent popup
  (optional, but these things are helpful to comply with EU data protection laws).
  You'll need to have a Google Analytics account set up for this to work, of course.  
  We even generate statistics on how often people click on your specific social media links, for example:  
  ![GA Outbound Stats](README.pic2.png)


## Performance Hint

It is a good idea to increase the cache lifetime of the background image, so that public proxies and users' browsers
do not need to download it every time. GitHub Pages does not support cache control, but if *your* web server supports
`.htaccess` files, you may want to add one to the *images* folder like so:

```ApacheConf
# Cache the large background image for 1 year
<IfModule mod_headers.c>
    <Files "background.jpg">
        Header unset ETag
        Header set Cache-Control "public, max-age=31536000"
    </Files>
</IfModule>
```


## License

The *Fuse Core* theme is free to use and modify under the terms of the
[CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) license.

## Ancestry

# Ramastons
Visit [www.ramastons.com](http://www.ramastons.com)!