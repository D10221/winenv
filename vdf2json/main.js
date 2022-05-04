var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// node_modules/vdf-parser/main.js
var require_main = __commonJS({
  "node_modules/vdf-parser/main.js"(exports) {
    var TYPEEX = {
      INT: /^\-?\d+$/,
      FLOAT: /^\-?\d+\.\d+$/,
      BOOLEAN: /^(true|false)$/i
    };
    function parse(text, options) {
      if (typeof text !== "string") {
        throw new TypeError("VDF.parse: Expecting parameter to be a string");
      }
      options = {
        types: typeof options === "boolean" ? options : typeof options === "object" && "types" in options ? options.types : true,
        arrayify: typeof options === "object" && "arrayify" in options ? options.arrayify : true,
        conditionals: typeof options === "object" && "conditionals" in options ? options.conditionals : void 0
      };
      if (options.conditionals && !Array.isArray(options.conditionals) && typeof options.conditionals === "string")
        options.conditionals = [options.conditionals];
      lines = text.split("\n");
      var obj = {};
      var stack = [obj];
      var expect_bracket = false;
      var odd = false;
      var re_kv = new RegExp('^[ \\t]*("((?:\\\\.|[^\\\\"])+)"|([a-zA-Z0-9\\-\\_]+))([ \\t]*("((?:\\\\.|[^\\\\"])*)(")?|([a-zA-Z0-9\\-\\_.]+)))?(?:[ \\t]*\\[(\\!?\\$[A-Z0-9]+(?:(?:[\\|]{2}|[\\&]{2})\\!?\\$[A-Z0-9]+)*)\\])?');
      var i = -1, j = lines.length, line, sublines;
      var getNextLine = function() {
        if (sublines && sublines.length) {
          var _subline = sublines.shift();
          if (!odd)
            _subline = _subline.trim();
          return _subline;
        }
        var _line = lines[++i];
        while (!odd && _line !== void 0 && (_line = _line.trim()) && (_line == "" || _line[0] == "/"))
          _line = lines[++i];
        if (_line === void 0)
          return false;
        var comment_slash_pos = -1;
        sanitization:
          for (var l = 0; l < _line.length; l++) {
            switch (_line.charAt(l)) {
              case '"':
                if (_line.charAt(l - 1) != "\\")
                  odd = !odd;
                break;
              case "/":
                if (!odd) {
                  comment_slash_pos = l;
                  break sanitization;
                }
                break;
              case "{":
                if (!odd) {
                  _line = _line.slice(0, l) + "\n{\n" + _line.slice(l + 1);
                  l += 2;
                }
                break;
              case "}":
                if (!odd) {
                  _line = _line.slice(0, l) + "\n}\n" + _line.slice(l + 1);
                  l += 2;
                }
                break;
            }
          }
        if (comment_slash_pos > -1)
          _line = _line.substr(0, comment_slash_pos);
        sublines = _line.split("\n");
        return getNextLine();
      };
      while ((line = getNextLine()) !== false) {
        if (line == "" || line[0] == "/") {
          continue;
        }
        if (line[0] == "{") {
          expect_bracket = false;
          continue;
        }
        if (expect_bracket) {
          throw new SyntaxError("VDF.parse: invalid syntax on line " + (i + 1) + " (expected opening bracket, empty unquoted values are not allowed):\n" + line);
        }
        if (line[0] == "}") {
          if (Array.isArray(stack[stack.length - 2]))
            stack.pop();
          stack.pop();
          continue;
        }
        while (true) {
          m = re_kv.exec(line);
          if (m === null) {
            throw new SyntaxError("VDF.parse: invalid syntax on line " + (i + 1) + ":\n" + line);
          }
          var key = m[2] !== void 0 ? m[2] : m[3];
          var val = m[6] !== void 0 ? m[6] : m[8];
          if (val === void 0) {
            if (stack[stack.length - 1][key] === void 0) {
              stack[stack.length - 1][key] = {};
              stack.push(stack[stack.length - 1][key]);
            } else if (stack[stack.length - 1][key] !== void 0 && !Array.isArray(stack[stack.length - 1][key])) {
              if (options.arrayify) {
                stack[stack.length - 1][key] = [stack[stack.length - 1][key], {}];
                stack.push(stack[stack.length - 1][key]);
                stack.push(stack[stack.length - 1][1]);
              } else {
                stack.push(stack[stack.length - 1][key]);
              }
            } else if (stack[stack.length - 1][key] !== void 0 && Array.isArray(stack[stack.length - 1][key])) {
              if (!options.arrayify)
                throw new Error("VDF.parse: this code block should never be reached with arrayify set to false! [1]");
              stack.push(stack[stack.length - 1][key]);
              stack[stack.length - 1].push({});
              stack.push(stack[stack.length - 1][stack[stack.length - 1].length - 1]);
            }
            expect_bracket = true;
          } else {
            if (m[7] === void 0 && m[8] === void 0) {
              if (i + 1 >= j) {
                throw new SyntaxError("VDF.parse: un-closed quotes at end of file");
              }
              line += "\n" + getNextLine();
              continue;
            }
            if (options.conditionals !== void 0 && Array.isArray(options.conditionals) && m[9]) {
              var conditionals = m[9];
              var single_cond_regex = new RegExp("^(\\|\\||&&)?(!)?\\$([A-Z0-9]+)");
              var ok = false;
              while (conditionals) {
                var d = single_cond_regex.exec(conditionals);
                if (d === null || !d[3])
                  throw new SyntaxError("VDF.parse: encountered an incorrect conditional: " + conditionals);
                conditionals = conditionals.replace(d[0], "").trim();
                var op = d[1];
                var not = d[2] && d[2] === "!";
                var cond = d[3];
                var includes = options.conditionals.indexOf(cond) !== -1;
                var _ok = not ? !includes : includes;
                if (!op || op === "||")
                  ok = ok || _ok;
                else
                  ok = ok && _ok;
              }
              if (!ok) {
                line = line.replace(m[0], "");
                if (!line || line[0] == "/")
                  break;
                continue;
              }
            }
            if (options.types) {
              if (TYPEEX.INT.test(val)) {
                val = parseInt(val);
              } else if (TYPEEX.FLOAT.test(val)) {
                val = parseFloat(val);
              } else if (TYPEEX.BOOLEAN.test(val)) {
                val = val.toLowerCase() == "true";
              }
            }
            if (stack[stack.length - 1][key] === void 0) {
              stack[stack.length - 1][key] = val;
            } else if (stack[stack.length - 1][key] !== void 0 && !Array.isArray(stack[stack.length - 1][key])) {
              if (options.arrayify) {
                stack[stack.length - 1][key] = [stack[stack.length - 1][key], val];
              } else {
                stack[stack.length - 1][key] = val;
              }
            } else if (stack[stack.length - 1][key] !== void 0 && Array.isArray(stack[stack.length - 1][key])) {
              if (!options.arrayify)
                throw new Error("VDF.parse: this code block should never be reached with arrayify set to false! [2]");
              stack[stack.length - 1][key].push(val);
            }
          }
          if (expect_bracket)
            break;
          line = line.replace(m[0], "").trim();
          if (!line || line[0] == "/")
            break;
          line = line.replace(/^\s*\[\!?\$[A-Z0-9]+(?:(?:[\|]{2}|[\&]{2})\!?\$[A-Z0-9]+)*\]/, "").trim();
          if (!line || line[0] == "/")
            break;
        }
      }
      if (stack.length != 1)
        throw new SyntaxError("VDF.parse: open parentheses somewhere");
      return obj;
    }
    function stringify(obj, options) {
      if (typeof obj !== "object") {
        throw new TypeError("VDF.stringify: First input parameter is not an object");
      }
      options = {
        pretty: typeof options === "boolean" ? options : typeof options === "object" && "pretty" in options ? options.pretty : false,
        indent: typeof options === "object" && "indent" in options ? options.indent : "	"
      };
      return _dump(obj, options, 0);
    }
    function _dump(obj, options, level) {
      if (typeof obj !== "object") {
        throw new TypeError("VDF.stringify: a key has value of type other than string or object: " + typeof obj);
      }
      var indent = options.indent;
      var buf = "";
      var line_indent = "";
      if (options.pretty) {
        for (var i = 0; i < level; i++) {
          line_indent += indent;
        }
      }
      for (var key in obj) {
        if (typeof obj[key] === "object") {
          if (Array.isArray(obj[key])) {
            obj[key].forEach(function(element) {
              if (typeof element !== "object") {
                _element = {};
                _element[key] = element;
                buf += _dump(_element, options, level);
              } else {
                buf += [line_indent, '"', key, '"\n', line_indent, "{\n", _dump(element, options, level + 1), line_indent, "}\n"].join("");
              }
            });
          } else
            buf += [line_indent, '"', key, '"\n', line_indent, "{\n", _dump(obj[key], options, level + 1), line_indent, "}\n"].join("");
        } else {
          buf += [line_indent, '"', key, '" "', String(obj[key]), '"\n'].join("");
        }
      }
      return buf;
    }
    exports.parse = parse;
    exports.stringify = stringify;
  }
});

// main.ts
var import_vdf_parser = __toESM(require_main());
process.stdin.on("readable", () => {
  let chunk;
  while (chunk = process.stdin.read()) {
    process.stdout.write(JSON.stringify(import_vdf_parser.default.parse(chunk.toString())));
  }
});
