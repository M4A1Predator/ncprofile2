import path from 'path'

const mime = Object.freeze({
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
})

export const getFileType = (fname) => {
  return mime[path.extname(fname).slice(1).toLowerCase()] || 'text/plain';
}