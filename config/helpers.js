"use strict";

const path = require("path");

// Helper functions
const _root = path.resolve(__dirname, "../"); // project root folder

function hasProcessFlag(flag) {
    return process.argv.join("").indexOf(flag) > -1;
}

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ["node_modules"].concat(args));
}

function prependExt(extensions, args) {
    args = args || [];
    if (!Array.isArray(args)) { args = [args] }
    return extensions.reduce((memo, val) => {
        return memo.concat(val, args.map((prefix) => {
            return prefix + val;
        }));
    }, [""]);
}

function packageSort(packages) {
    return function sort(a, b) {
        const order1 = packages.indexOf(a.names[0]);
        const order2 = packages.indexOf(b.names[0]);

        if (order1 > order2) {
            return 1;
        } else if (order1 < order2) {
            return -1;
        } else {
            return 0;
        }
  }
}

function reverse(arr) {
    return arr.reverse();
}

/**
 * Method for removing object properties
 */
const removeObjectProperties = (obj, props) => {
    for(let i = 0; i < props.length; i++) {
        if(obj.hasOwnProperty(props[i])) {
            delete obj[props[i]];
        }
    }
};

/**
 * Retrieve the relative path from the config directory to the path argument value (if provided). That path argument can be passed to only execute a subset of the unit tests (see spec-bundle.ts)
 * @param args the arguments to look into
 * @returns {*} The relative path from this directory (config) to the location pointed at by the path argument value (if provided), an empty string otherwise
 */
function getTestPath(args) {
    for (let i = 0; i < args.length; ++i) {
        if (args[i] === "--path--") {
            let providedPath = args[i+1] || "";
            if(!providedPath.toLocaleLowerCase().startsWith("src/")){
                throw new Error("If you want to execute a subset of the unit tests, then the path you provide MUST start with 'src/'");
            }
            //return path.relative(__dirname, providedPath);
            // posix style to get the expected path separator
            return path.posix.relative(__dirname, providedPath);
        }
    }
    return "";
}

exports.reverse = reverse;
exports.hasProcessFlag = hasProcessFlag;
exports.root = root;
exports.rootNode = rootNode;
exports.prependExt = prependExt;
exports.prepend = prependExt;
exports.packageSort = packageSort;
exports.getTestPath = getTestPath;
exports.removeObjectProperties = removeObjectProperties;
