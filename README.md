# vue 实现仿美团App

> Vue web application

> UI

![如果图片打不开请在lookImg文件夹观看mt.gif](./lookImg/mt.git)

> files

```
    .
    ├── README.md
    ├── build
    │   ├── build.js
    │   ├── check-versions.js
    │   ├── logo.png
    │   ├── utils.js
    │   ├── vue-loader.conf.js
    │   ├── webpack.base.conf.js
    │   ├── webpack.dev.conf.js
    │   └── webpack.prod.conf.js
    ├── config
    │   ├── dev.env.js
    │   ├── index.js
    │   └── prod.env.js
    ├── datas
    │   ├── goods.json
    │   ├── ratings.json
    │   └── seller.json
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── App.vue
    │   ├── assets
    │   │   ├── ash_bin.png
    │   │   ├── btn_yellow_highlighted@2x.png
    │   │   ├── search.png
    │   │   ├── star.png
    │   │   ├── star24_half@2x.png
    │   │   ├── star24_off@2x.png
    │   │   └── star24_on@2x.png
    │   ├── components
    │   │   ├── addcontrol
    │   │   │   └── AddControl.vue
    │   │   ├── detail
    │   │   │   ├── Detail.vue
    │   │   │   └── img
    │   │   │       ├── more.png
    │   │   │       └── share.png
    │   │   ├── evaluate
    │   │   │   ├── Evaluate.vue
    │   │   │   └── img
    │   │   │       └── anonymity.png
    │   │   ├── goods
    │   │   │   └── Goods.vue
    │   │   ├── header
    │   │   │   └── Header.vue
    │   │   ├── nav
    │   │   │   └── Nav.vue
    │   │   ├── ratings
    │   │   │   ├── Ratings.vue
    │   │   │   └── img
    │   │   │       ├── anonymity.png
    │   │   │       ├── icon_sub_tab_dp_highlighted@2x.png
    │   │   │       └── icon_sub_tab_dp_normal@2x.png
    │   │   ├── seller
    │   │   │   ├── Seller.vue
    │   │   │   └── img
    │   │   │       ├── address.png
    │   │   │       ├── delivery.png
    │   │   │       ├── line.png
    │   │   │       ├── phone.png
    │   │   │       ├── safety.png
    │   │   │       ├── server.png
    │   │   │       └── time.png
    │   │   ├── shopcart
    │   │   │   └── Cart.vue
    │   │   ├── star
    │   │   │   ├── Star.vue
    │   │   │   └── image
    │   │   │       ├── star24_half@2x.png
    │   │   │       ├── star24_off@2x.png
    │   │   │       └── star24_on@2x.png
    │   │   └── transversLine
    │   │       └── transversLine.vue
    │   ├── icomoon
    │   │   ├── css
    │   │   │   └── fonts.css
    │   │   └── fonts
    │   │       ├── mt-app.eot
    │   │       ├── mt-app.svg
    │   │       ├── mt-app.ttf
    │   │       └── mt-app.woff
    │   ├── main.js
    │   └── routes
    │       └── routes.js
    └── static
        └── reset.css

    27 directories, 61 files

```


Copy right displayli 转载请加备注 或 联系 QQ：463961434
 
Author By displayLi @ [LINK + 创意工作室](http://www.link97.com)