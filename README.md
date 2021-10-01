# searx-penguin-theme

This, in the end, will be a modern theme for serax based on the Figma
designs ( [mobile](https://www.figma.com/proto/AhiYjWXBXMSTunOrVr1Zrk/SearX-redesign?node-id=69%3A1&scaling=min-zoom)
, [desktop](https://www.figma.com/proto/AhiYjWXBXMSTunOrVr1Zrk/SearX-redesign?node-id=2%3A433&scaling=min-zoom) )
from [@BurlyMynah](https://github.com/BurlyMynah) mentioned
in [this issue](https://github.com/searx/searx/issues/2440#issuecomment-803084218).

It's currently quite messy and under development and not complete, so it shouldn't be used yet. If you're interested in
developing this theme, feel free to create merge requests or issues :)

## how to start this?

The easiest way to start developing this theme is to start the docker container using `docker-compose up -d` which will
mount the theme and template directories. While developing the theme, don't forget to run `npm run start` to live build
the source stylesheets, js-files and bundle them.
