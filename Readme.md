# withings-stream <sup>[![Version Badge](http://vb.teelaun.ch/tellnes/withings-stream.svg)](https://npmjs.org/package/withings-stream)</sup>

[![Dependency Status](https://david-dm.org/tellnes/withings-stream.png)](https://david-dm.org/tellnes/withings-stream)
[![devDependency Status](https://david-dm.org/tellnes/withings-stream/dev-status.png)](https://david-dm.org/tellnes/withings-stream#info=devDependencies)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/tellnes/withings-stream/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

[![NPM](https://nodei.co/npm/withings-stream.png)](https://nodei.co/npm/withings-stream/)


Streams Withings Measures. (`measure / getmeas`)

Getting the token and token secret is outside the scope of this lib. You can use
[passport-withings](https://github.com/mowens/passport-withings)
to do that.

## Usage

```js
var options =
  { consumerKey: '...'
  , consumerSecret: '...'
  , token: '...'
  , tokenSecret: '...'
  , userid: '...'
  , startdate: 1222819200
  , enddate: 1223190167
  }
var WithingStream = require('withings-stream')

var stream = WithingsStream(options)

stream.on('data', function (measuregrp) {
  // Do something with measuregrp
})
```

## Install

    $ npm install withings-stream

## License

MIT
