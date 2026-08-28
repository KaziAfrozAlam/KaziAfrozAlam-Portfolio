import fs from 'node:fs';
const b = fs.readFileSync('public/og-image.png');
const sig = b.slice(1, 4).toString('latin1');
const w = b.readUInt32BE(16);
const h = b.readUInt32BE(20);
console.log('sig=', sig, 'isPNG=', sig === 'PNG', 'width=', w, 'height=', h, 'bytes=', b.length);
