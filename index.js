'use strict';
var join = require('url').resolve;
var Request = require('request');

module.exports = function(options) {
  var request = Request.defaults({ jar: !!options.jar});
  return new Promise(function (resolve) {
    var ctx = options.ctx
    var url = join(options.host, ctx.request.path)
    var parsedBody = getParsedBody(ctx);
    var opt = {
      url: url + (ctx.querystring ? '?' + ctx.querystring : ''),
      headers: ctx.header,
      encoding: null,
      followRedirect: true,
      body: parsedBody,
      method: ctx.method,
    };
    opt.headers.host = options.host.slice(options.host.indexOf('://')+3).replace(/\/$/,'');
    request(opt, function (error, res) {
      ctx.status = res.statusCode;
      for (var name in res.headers) {
        if (name === 'transfer-encoding') {
          continue;
        }
        ctx.set(name, res.headers[name]);
      }
      ctx.body = res.body;
      resolve()
    })
  })
};


function getParsedBody(ctx){
  var body = ctx.request.body;
  if (body === undefined || body === null){
    return undefined;
  }
  let bodystr = ''

  if (!Buffer.isBuffer(body) && typeof body !== 'string'){
    for(let i in body) {
      bodystr += `${i}=${body[i]}&`
    }
  }
  return bodystr.slice(0, -1);
}
