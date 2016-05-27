import { FileReaderSink } from './FileReaderSink'

export class FileReaderSource {
  constructor (method, stream) {
    this.method = method
    this.source = stream.source
  }

  run (sink, scheduler) {
    return this.source.run(new FileReaderSink(this.method, sink), scheduler)
  }

}
