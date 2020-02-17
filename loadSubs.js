var fs = require('fs'),
  path = require('path');

const fsPromises = require('fs').promises;

function fromDir(startPath, filter) {
  //console.log('Starting from dir '+startPath+'/');

  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return;
  }

  const subsPaths = [];
  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter); //recurse
    } else if (filename.indexOf(filter) >= 0) {
      subsPaths.push(filename);
    }
  }
  return subsPaths;
}

const subs = fromDir('./src/public/uploads', '.vtt');

let subsJSON = {};

const func = filenames => {
  return Promise.all(
    filenames.map(f => fsPromises.readFile('./' + f, 'utf-8')),
  );
};

func(subs)
  .then(res => {
    console.log('files read', res.length);
    let data = res.map((e, i) => {
      return {[subs[i]]: res[i]};
    });
    let obj = {};
    for (let i = 0; i < data.length; i++) {
      let newValue = data[i];
      obj = {...obj, ...newValue};
    }
    let jsonData = JSON.stringify(obj, null, 2);
    fs.writeFile('subs.json', jsonData, err => {
      if (err) throw err;
      console.log('Data written to file');
    });
  })
  .catch(console.log);
