const fs = require('fs')
fs.writeFileSync('./env.js', `export const WXLOGINAPPID = "${process.env.WXLOGINAPPID}"\nexport const SERVERURL = "${process.env.SERVERURL}"`)