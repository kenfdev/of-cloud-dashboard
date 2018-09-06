'use strict';

const fs = require('fs');

module.exports = (event, context) => {
  const { method, path } = event;
  if (method !== 'GET') {
    context.status(400).fail('Bad Request');
    return;
  }

  let headers = {
    'Content-Type': '',
  };
  if (/.*\.js/.test(path)) {
    headers['Content-Type'] = 'application/javascript';
  } else if (/.*\.css/.test(path)) {
    headers['Content-Type'] = 'text/css';
  } else if (/.*\.ico/.test(path)) {
    headers['Content-Type'] = 'image/x-icon';
  } else if (/.*\.json/.test(path)) {
    headers['Content-Type'] = 'application/json';
  } else if (/.*\.map/.test(path)) {
    headers['Content-Type'] = 'application/octet-stream';
  }

  let content;
  if (headers['Content-Type']) {
    content = fs.readFileSync(`${__dirname}${path}`);
  } else {
    headers['Content-Type'] = 'text/html';
    content = fs.readFileSync(`${__dirname}/dist/index.html`).toString();

    const { base_href, public_url, pretty_url, query_pretty_url } = process.env;
    content = content.replace(/__BASE_HREF__/g, base_href);
    content = content.replace(/__PUBLIC_URL__/g, public_url);
    content = content.replace(/__PRETTY_URL__/g, pretty_url);
    content = content.replace(/__QUERY_PRETTY_URL__/g, query_pretty_url);
  }

  context
    .headers(headers)
    .status(200)
    .succeed(content);
};
