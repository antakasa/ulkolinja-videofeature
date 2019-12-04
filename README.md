# Dataviz starter kit 

Note: Under development - not properly tested as of 28.3.2019.

Powered by [Parcel](https://parceljs.org).

*  Automates the boring stuff: Fynd hooks etc. 
*  Deploy your project to lusi-dataviz S3 bucket with one command. 
* `CSS-prefixer` - CSS classes get ```#dataviz-app``` prefix 
* `autoprefixer` - vendor prefixes added according to predefined settings
* `babel-preset-env` & `babel-polyfill` & `babel-preset-react` – use modern Javascript features. Code gets transpiled into es5.
* `react` && `react-dom`  **You can also drop React from your project easily if you don't need it**

## Prerequisities

* Node v. 8 or above 
* In order to push your app to S3, AWS Cli and Yle AWS credentials with ```lusi-aws-yle``` account are required. Create credentials by following [Yle's instructions](https://github.com/Yleisradio/wiki/wiki/01-Credentials). AWS Cli installation is also detailed in [Yleisradio wiki](https://github.com/Yleisradio/wiki/wiki/05-Tools#aws-cli).

## Getting started

```
git clone git@github.com:Yleisradio/lusi-dataviz-starter-kit.git [your-project-name]
cd [your-project-name]
rm -rf .git
git init
npm install
```

After install, open ```package.json``` and change the ```name``` property. This is important because it gives an unique identifier to your project which is used to create S3 directory etc.

Then start your dev environment by:

```npm start```

Open `http://localhost:1234` in your browser and edit `src/app.js` and press save. ```Index.js``` contains Fynd specific stuff. You never need to edit it unless you want to. 

## Remove React
It's completely ok to use this repo to non-React projects too. Just remove everything on ```src/app.js```. 

Optionally, if you don't want React libs to bloat you dev environment, you can also run ```npm uninstall react react-dom @babel/preset-react``` and remove ```@babel/preset-react``` from .babelrc.

## Styling

Per default, all classes in css-files are prefixed.

```css
.hello {
    font-size: 3em;
}

```

becomes to 

```css
#dataviz-app .hello {
    font-size: 3em;
}
```

Vendor prefixes are added by Autoprefixer.

```css
::placeholder {
  color: gray;
}
```

becomes


```css
::-webkit-input-placeholder {
  color: gray;
}
:-ms-input-placeholder {
  color: gray;
}
::-ms-input-placeholder {
  color: gray;
}
::placeholder {
  color: gray;
}
```

Want to try [CSS modules]("https://css-tricks.com/css-modules-part-1-need/")? Turn ```postcss.modules``` to ```true``` in package.json.

## Build & Deploy

``` 
npm run build
```

* Creates static html site to ```build``` folder.

```
npm run deploy
```

* Creates static html site to ```build``` folder 
* Creates ```conf.json``` and ```dataviz.html``` and puts them to ```build```
* Syncs build folder to ```https://lusi-dataviz.ylestatic.fi/$npm_package_name/``` where $npm_package_name is the name of the project. You can paste this URL to yle visualisation node.  

## Yle Player

Fynd and Synd have Yle Player v2 under the hood, and you can use the dynamic embed (see more [here](https://github.com/Yleisradio/player-static/wiki/Player-embed-instructions))  with the ```embedYlePlayer``` helper function:

```js
yleVisualisation.embedYlePlayer(root, "1-12345678", { playFullScreen: true });
```

The ```root``` should be an empty div or similar and ```id``` has to be a string in form ```"1-12345678"```. Both are required. 

**options** is a non-required object where following properties could be declared: 

* **verticalVideo** boolean,
* **autoplay** boolean
* **seek** number in seconds
* **playFullScreen** boolean
* **onPlayerReady** function

For more information about the player, please have a look at [Yle Player Docs](https://github.com/Yleisradio/player-static/wiki/Player-embed-instructions)


## Yle Analytics

Yle Analytics SDK is available via global object ```window.yleAnalytics```. To read more about yleAnalytics SDK in Finnish, see [documentation](http://chili.yle.fi/confluence/display/YLEWEB/Yle+Analytics+SDK).

Moreover, `yleVisualisation.trackEvent()` works the same way as [yleAnalytics.trackEvent](http://chili.yle.fi/confluence/display/YLEWEB/Yle+Analytics+SDK#YleAnalyticsSDK-yleAnalytics.trackEvent(eventName[,settings])).

```js
yleVisualisation.trackEvent('my-event-name-prefix.my-vis-was-loaded');
```
