/* eslint-env browser */

export class FileReaderSink {
  constructor (method, sink) {
    this.method = method
    this.sink = sink
  }
  eventi (time, value) {
    const sink = this.sink
    const method = this.method
    const reader = new FileReader()

    reader.addEventListener('load', sink.event.bind(sink, time), false)
    reader[method](value)
  }
  error (time, err) {
    return this.sink.error(time, err)
  }
  end (time, value) {
    return this.sink.end(time, value)
  }
}
