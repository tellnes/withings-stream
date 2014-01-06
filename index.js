var inherits = require('util').inherits
  , wr = require('withings-request')
  , Readable = require('stream').Readable

module.exports = WithingsStream

function WithingsStream(options) {
  if (!(this instanceof WithingsStream)) return new WithingsStream(options)
  options.objectMode = true
  Readable.call(this, options)

  this._request = wr(options)

  this._params = {}

  if (options.userid) this._params.userid = options.userid
  if (options.startdate) this._params.startdate = options.startdate
  if (options.enddate) this._params.enddate = options.enddate
  if (options.devtype) this._params.devtype = options.devtype
  if (options.meastype) this._params.meastype = options.meastype
  if (options.lastupdate) this._params.lastupdate = options.lastupdate
  if (options.category) this._params.category = options.category
  if (options.limit) this._params.limit = options.limit

  this._reading = false
  this._needRead = false
  this._offset = options.offset || 0
}

inherits(WithingsStream, Readable)

WithingsStream.MEASURE_WEIGHT = 1
WithingsStream.MEASURE_HEIGHT = 4
WithingsStream.MEASURE_FAT_FREE_MASS = 5
WithingsStream.MEASURE_FAT_RATIO = 6
WithingsStream.MEASURE_FAT_MASS_WEIGHT = 7
WithingsStream.MEASURE_FAT_MASS_WEIGHT = 8
WithingsStream.MEASURE_DIASTOLIC_BLOOD_PRESSURE = 9
WithingsStream.MEASURE_SYSTOLIC_BLOOD_PRESSURE = 10
WithingsStream.MEASURE_HEART_PULSE = 11

WithingsStream.prototype._read = function () {
  var self = this

  if (this._reading) {
    this._needRead = true
    return
  }
  this._reading = true

  this._params.offset = this._offset

  this._request('measure', 'getmeas', this._params, function (err, data) {
    if (err) return self.emit('error', err)

    if (!Array.isArray(data.measuregrps)) {
      return self.emit('error', 'Invalid data from withings api; measuregrps missing')
    }

    self._offset += data.measuregrps.length

    data.measuregrps.forEach(function (measuregrp) {
      self.push(measuregrp)
    })

    if (!data.more) {
      self.push(null)
      return
    }

    self._reading = false
    if (self._needRead) {
      self._needRead = false
      self._read()
    }
  })
}
