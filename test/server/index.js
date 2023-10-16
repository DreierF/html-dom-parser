const { expect } = require('chai');
const sinon = require('sinon');
const mock = require('mock-require');

function resetModules() {
  Object.keys(require.cache).forEach((key) => {
    delete require.cache[key];
  });
}

const parserEnd = sinon.spy();
const Parser = sinon.spy(function () {
  this.end = parserEnd;
});

const DomHandler = sinon.spy(function () {
  this.dom = [
    {
      type: 'tag',
      name: 'html',
      attribs: {},
      children: [],
      next: null,
      prev: null,
      parent: null,
    },
  ];
});

const html = '<html>';

describe('server parser', () => {
  // before
  mock('htmlparser2', { Parser });
  mock('domhandler', { DomHandler });
  const parse = require('../../src').default;

  it('calls `DomHandler` and `Parser`', () => {
    parse(html);
    expect(DomHandler.called).to.equal(true);
    expect(Parser.called).to.equal(true);
    expect(parserEnd.called).to.equal(true);
  });

  it('passes options to `DomHandler` and `Parser`', () => {
    const options = { decodeEntities: true };
    parse(html, options);
    expect(DomHandler.calledWith(undefined, options)).to.equal(true);
    expect(Parser.calledWith(DomHandler, options));
  });

  it('passes html to `Parser` end', () => {
    parse(html);
    expect(parserEnd.calledWith(html)).to.equal(true);
  });

  it('returns `DomHandler` dom', () => {
    expect(parse(html)).to.equal(DomHandler.lastCall.returnValue.dom);
  });

  // after
  mock.stopAll();
  resetModules();
});
