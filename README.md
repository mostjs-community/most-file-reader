# most-file-reader

FileReader for [most](https://github.com/cujojs/most)

## Install

`npm install most-file-reader`


## API

### readAsDataUrl :: Stream File → Stream Event

```js
import {readAsDataUrl} from 'most-file-reader'
import {change} from '@most/dom-event'
import {from} from 'most'

const filesStream = change(document.body)
    .chain(event => from(event.target.files).filter(file => file.type.match('image')))

readAsDataUrl(filesStream)
    .observe(console.info.bind(console))
```

or fluently with `thru`

```js
import {readAsDataUrl} from 'most-file-reader'
import {change} from '@most/dom-event'
import {from} from 'most'

change(document.body)
    .chain(event => from(event.target.files).filter(file => file.type.match('image')))
    .thru(readAsDataUrl)
    .observe(console.info.bind(console))
```
`readAsDataUrl` will output a `ProgressEvent` which contains a base64 encoded url.


### readAsArrayBuffer :: Stream File → Stream Event

`readAsArrayBuffer` will output a `ProgressEvent` which contains a `ArrayBuffer` of file data.

### readAsText :: Stream File → Stream Event

`readAsText` will output a `ProgressEvent` which contains a text string of the file contents.

### fileReader :: String → Stream File → Stream Event

`fileReader` is the underlying method for the above functions.

```js
import {fileReader} from 'most-file-reader'
import {change} from '@most/dom-event'
import {from} from 'most'

const fileStream = change(document.body)
    .chain(event => from(event.target.files))

fileReader('readAsDataUrl', fileStream)
    .observe(console.info.bind(console))
```

## Todo
- [ ] Add tests
- [ ] Publish to npm