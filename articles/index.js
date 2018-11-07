const fs = require('fs');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}
 
var path = process.argv[2];

let catalog = {};
 
fs.readdir(path, function(err, items) {
    const files = []; 
    for (var i = 0; i < items.length; i++) {
        files.push(new Promise((resolve, reject) => {
          fs.readFile(items[i], (err, data) => {
            if (err) return reject(err);
            let text = '';
            if (data.toString) text = data.toString();
            let titleText = text.match(/([^\n]+)/)[0].slice(3);
            resolve({
              url: (/\[(.*?)\]/g).exec(text)[1],
              text: titleText
            });
          });
        }));
    }

    Promise.all(files)
      .then(values => {
        console.log('finally: ', values);
        catalog.values = values;
        fs.writeFile('data.json', JSON.stringify(catalog, null, 2));
      }).catch(err => {
        console.log('final catch', err); 
      });
 
    console.log(catalog);
});

