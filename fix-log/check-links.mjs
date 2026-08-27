import https from 'node:https';
const urls = [
  'https://github.com/KaziAfrozAlam/CHECKMATE---An-AI-Powered-Automated-Evaluation-and-Assessment-System',
  'https://doi.org/10.1007/978-981-95-5835-3_74',
];
for (const u of urls) {
  https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    console.log(u.split('/').slice(2, 3)[0] + ' ->', res.statusCode, res.headers.location ? '-> ' + res.headers.location : '');
    res.resume();
  }).on('error', (e) => console.log(u, 'ERROR', e.message));
}
