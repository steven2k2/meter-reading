// src/index.html

import _ from 'lodash'
import { MetersString } from './utils/String'

function component () {
  const element = document.createElement('div')

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')

  let result = MetersString.capitalize('hello, webpack!')
  console.log(result) // Output: "Hello, webpack!"

  return element
}

document.body.appendChild(component())