const fs = require('fs')
fs.writeFileSync('./env.js', `export const WXLOGINAPPID = "${process.env.WXLOGINAPPID}"\nexport const WXLOGINSECRET = "${process.env.WXLOGINSECRET}"\nexport const SERVERURL = "${process.env.SERVERURL}"`)