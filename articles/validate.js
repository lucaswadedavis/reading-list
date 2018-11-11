const fs = require('fs');
const isUrl = require('is-url-superb');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}
 
var path = process.argv[2];

fs.readFile(path, (err, data) => {
  if (err) return console.log(err);
  let catalog = null;
  if (data.toString) catalog = JSON.parse(data.toString());
  let numberOfGarbageUrls = 0;
  for (var i = 0; i < catalog.values.length; i++) {
    let n = catalog.values[i];
    if (isUrl(n.url)) {
    } else {
      console.log('Text: ', n.text);
      console.log('URL: ', n.url);
      console.log('---');
      catalog.values[i].url = '';
    }
  }
  console.log(numberOfGarbageUrls);
  fs.writeFile('replacement.json', JSON.stringify(catalog, null, 2), err => {
    console.log('error: ', err);
  });
});

