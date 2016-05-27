/** @license MIT License (c) copyright 2016 original author or authors */

import {Stream} from 'most'
import {curry2} from '@most/prelude'
import {FileReaderSource} from './FileReaderSource'

export const fileReader = curry2((method, stream) => new Stream(new FileReaderSource(method, stream)))
export const readAsDataURL = fileReader('readAsDataURL')
export const readAsArrayBuffer = fileReader('readAsArrayBuffer')
export const readAsText = fileReader('readAsText')
