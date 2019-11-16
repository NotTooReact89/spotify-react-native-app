import CryptoJS from 'crypto-js'

var _0xd7fa = [
  'SDd2w48=',
  'fwTCpQ==',
  'XEHDq8KFZULDlQ==',
  'wq/CisOyw4nCgsKrETbCgMOUwrscwoBEZMOywovCp8Oow69Ww7lLw6PCviwUY1xEw5JITsKAYy3DjGFfw4TDicOsV8O0GVpBccKpCsKEYsO2w5kHw7kuwrrClBwdw4zDrcKnw7rCrMOnLcOtw7wtQwPDhyXCqxRuVMKxUMKSVcOdw5wowrFy',
  'SUvCnFReLQ83LTNGXBZGwq8Yw5fCl3/DoMOYwqLDhsOhNw==',
  'w57CosOyb8KGwq8yEQ==',
  'w7dgwoo=',
]
;(function(a, c) {
  var b = function(b) {
    while (--b) {
      a['push'](a['shift']())
    }
  }
  b(++c)
})(_0xd7fa, 0x127)
var _0xad7f = function(b, e) {
  b = b - 0x0
  var a = _0xd7fa[b]
  if (_0xad7f['initialized'] === undefined) {
    ;(function() {
      var a
      try {
        var b = Function(
          'return\x20(function()\x20' +
            '{}.constructor(\x22return\x20this\x22)(\x20)' +
            ');'
        )
        a = b()
      } catch (b) {
        a = window
      }
      var c =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
      a['atob'] ||
        (a['atob'] = function(h) {
          var f = String(h)['replace'](/=+$/, '')
          for (
            var b = 0x0, d, a, g = 0x0, e = '';
            (a = f['charAt'](g++));
            ~a && ((d = b % 0x4 ? d * 0x40 + a : a), b++ % 0x4)
              ? (e += String['fromCharCode'](0xff & (d >> ((-0x2 * b) & 0x6))))
              : 0x0
          ) {
            a = c['indexOf'](a)
          }
          return e
        })
    })()
    var d = function(d, k) {
      var b = [],
        c = 0x0,
        f,
        i = '',
        h = ''
      d = atob(d)
      for (var g = 0x0, j = d['length']; g < j; g++) {
        h += '%' + ('00' + d['charCodeAt'](g)['toString'](0x10))['slice'](-0x2)
      }
      d = decodeURIComponent(h)
      for (var a = 0x0; a < 0x100; a++) {
        b[a] = a
      }
      for (a = 0x0; a < 0x100; a++) {
        c = (c + b[a] + k['charCodeAt'](a % k['length'])) % 0x100
        f = b[a]
        b[a] = b[c]
        b[c] = f
      }
      a = 0x0
      c = 0x0
      for (var e = 0x0; e < d['length']; e++) {
        a = (a + 0x1) % 0x100
        c = (c + b[a]) % 0x100
        f = b[a]
        b[a] = b[c]
        b[c] = f
        i += String['fromCharCode'](
          d['charCodeAt'](e) ^ b[(b[a] + b[c]) % 0x100]
        )
      }
      return i
    }
    _0xad7f['rc4'] = d
    _0xad7f['data'] = {}
    _0xad7f['initialized'] = !![]
  }
  var c = _0xad7f['data'][b]
  if (c === undefined) {
    if (_0xad7f['once'] === undefined) {
      _0xad7f['once'] = !![]
    }
    a = _0xad7f['rc4'](a, e)
    _0xad7f['data'][b] = a
  } else {
    a = c
  }
  return a
}
exports['me'] = () =>
  (ciphertext = CryptoJS[_0xad7f('0x0', 'E]Yn')]
    [_0xad7f('0x1', 'vV#g')](_0xad7f('0x2', 'TlLx'), _0xad7f('0x3', '6gsb'))
    [_0xad7f('0x4', 'La)O')](
      CryptoJS[_0xad7f('0x5', '%MPg')][_0xad7f('0x6', 'HIE1')]
    ))
