'use strict';

const path = require('path');
const less = require('less');
const root = fis.project.getProjectPath();
const _ = fis.util;

module.exports = function(content, file, conf) {
    conf = _.assign({
        filename: path.basename(file.realpath),
        syncImport: true,
        relativeUrls: true,
        javascriptEnabled: true,
    }, conf);

    // conf.sourceMap
    let sourceMap = conf.sourceMap;
    if (sourceMap) {
        if (_.isBoolean(sourceMap)) {
            sourceMap = {};
        }

        const sourceMapFile = fis.file.wrap(file.realpath + '.map');

        sourceMapFile.setContent('');
        conf.sourceMap = _.assign({
            outputSourceFiles: true,
            sourceMapURL: path.basename(sourceMapFile.url),
            sourceMapBasepath: root,
            sourceMapRootpath: '/source',
            sourceMapFileInline: false
        }, sourceMap);
    }

    // conf.paths
    if (!Array.isArray(conf.paths)) {
        conf.paths = [ file.dirname, root ];
    }

    [file.dirname, root].forEach(function (item) {
        if (!conf.paths.includes(item)) {
            confPaths.push(item);
        }
    });

    less.render(content, conf, function (err, output) {
        if (err) {
            console.warn(err);
            // throw err;
            return content;
        }

        content = output.css;
        output.imports.forEach(function (path) {
            file.cache.addDeps(path);
        });
    });

    return content;
};
