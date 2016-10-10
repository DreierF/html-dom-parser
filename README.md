# html-dom-parser

An HTML to DOM parser that works on both the server and client.

## Installation

```sh
$ npm html-dom-parser
```

## Usage

```js
var Parser = require('html-dom-parser');
Parser('<p>Hello, world!</p>');
```

Output:

```js
[ { type: 'tag',
    name: 'p',
    attribs: {},
    children:
     [ { data: 'Hello, world!',
         type: 'text',
         next: null,
         prev: null,
         parent: [Circular] } ],
    next: null,
    prev: null,
    parent: null } ]
```

The server parser is a wrapper of [htmlparser2](https://github.com/fb55/htmlparser2)'s `parseDOM()` and the client parser uses the browser's [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) API to mimic the output of the server parser.

## Testing

```sh
$ git clone https://github.com/remarkablemark/html-dom-parser.git
$ npm install
$ npm run lint
$ npm test
```

## License

[MIT](https://github.com/remarkablemark/html-dom-parser/blob/master/LICENSE)
