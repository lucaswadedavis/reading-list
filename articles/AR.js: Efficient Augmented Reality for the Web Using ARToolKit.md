# [AR.js: Efficient Augmented Reality for the Web Using ARToolKit](https://github.com/jeromeetienne/ar.js)

    # [AR.js - Efficient Augmented Reality for the Web using ARToolKit][0]

I am focusing hard on making AR for the web a reality.
This repository is where I publish the code.
Contact me anytime [@jerome\_etienne][1].
Stuff are still moving fast, We reached a good status tho.
So I wanted to publish thus people can try it and have fun with it :)

* **Very Fast** : it runs efficiently even on phones. [60 fps on my 2 year-old phone][2]!
* **Web-based** : It is a pure web solution, so no installation required. Full javascript based on three.js jsartoolkit5
* **Open Source** : It is completely open source and free of charge!
* **Standards** : It works on any phone with [webgl][3] and [webrtc][4]

[![AR.js 1.0 Video](https://cloud.githubusercontent.com/assets/252962/23441016/ab6900ce-fe17-11e6-971b-24614fb8ac0e.png)][5]

# [Try it on Mobile][6]

It works on **any browser with WebGL and WebRTC**. So android works. Window mobile works.
IOS doesnt work unfortunately. IOS safari doesn't support WebRTC at the moment. 
Apple is [currently working on it][7] tho. 

To try on your phone is only 2 easy steps, check it out!

1. Open this [hiro marker image][8] in your desktop browser.
2. Open this [augmented reality webapps][9] in your phone browser, and point it 
to your screen.

**You are done!** It will open a webpage which read the phone webcam, localize a hiro marker and add 3d on top of it, as you can see below.

[![screenshot](https://cloud.githubusercontent.com/assets/252962/23072106/73a0656c-f528-11e6-9fcd-3c900d1d47d3.jpg)][10]

# [Standing on the Shoulders of Giants][11]

So we shown it is now possible to do 60fps web-based augmented reality on a phone. 
This is great for sure but how did we get here ? **By standing on the shoulders of giants!**
It is thanks to the hard work from others, that we can today reach this mythic 60fps AR.
So i would like to thanks :

* **three.js** for being a great library to do 3d on the web.
* **artoolkit!** years of development and experiences on doing augmented reality
* **emscripten and asm.js**! thus we could compile artoolkit c into javascript
* **chromium**! thanks for being so fast!

Only thanks to all of them, i could do my part : Optimizing performance from 5fps on high-end
phone, to 60fps on 2years old phone.

After all this work done by a lot of people, we have a _web-based augmented reality solution fast enough for mobile_!

Now, many people got a phone powerful enough to do web AR in their pocket.
I think this performance improvement makes web AR a reality.
i am all exited by what people are gonna with it :)

# [Performance][12]

We are still early in the project but here are some initial numbers to give you an idea.

Obviously you mileage may vary. The performance you get will depend on 3 things: How heavy your 3D is, How you tune your parameters
and the hardware that you are using.

[![screenshot](https://cloud.githubusercontent.com/assets/252962/23068128/40343608-f51a-11e6-8cb3-900e37a7f658.jpg)][13]

# [Full Featured Marker based][14]

With this project, we bring more performance to artoolkit. 
artoolkit is a software with years of experience doing augmented reality. It is able to do a lot!

It is marker based. It supports a wide range of markers: multiple types of markers [pattern][15]/[barcode][16]
multiple independant markers at the same time, or [multiple markers acting as a single marker][17]
up to you to choose.

# [Status][18]

* At the three.js level is the main one. It is working well and efficiently
* a-frame component - it export ``

[0]: https://github.com/jeromeetienne/ar.js#arjs---efficient-augmented-reality-for-the-web-using-artoolkit
[1]: https://twitter.com/jerome_etienne
[2]: https://twitter.com/jerome_etienne/status/831333879810236421
[3]: http://caniuse.com/#feat=webgl
[4]: http://caniuse.com/#feat=stream
[5]: https://youtu.be/0MtvjFg7tik
[6]: https://github.com/jeromeetienne/ar.js#try-it-on-mobile
[7]: https://webkit.org/status/#specification-webrtc
[8]: https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg
[9]: https://jeromeetienne.github.io/AR.js/three.js/examples/mobile-performance.html
[10]: https://cloud.githubusercontent.com/assets/252962/23072106/73a0656c-f528-11e6-9fcd-3c900d1d47d3.jpg
[11]: https://github.com/jeromeetienne/ar.js#standing-on-the-shoulders-of-giants
[12]: https://github.com/jeromeetienne/ar.js#performance
[13]: https://cloud.githubusercontent.com/assets/252962/23068128/40343608-f51a-11e6-8cb3-900e37a7f658.jpg
[14]: https://github.com/jeromeetienne/ar.js#full-featured-marker-based
[15]: https://artoolkit.org/documentation/doku.php?id=3_Marker_Training:marker_training
[16]: https://artoolkit.org/documentation/doku.php?id=3_Marker_Training:marker_barcode
[17]: https://artoolkit.org/documentation/doku.php?id=3_Marker_Training:marker_multi
[18]: https://github.com/jeromeetienne/ar.js#status
  