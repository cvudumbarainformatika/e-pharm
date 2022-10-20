import { date } from 'quasar'

const dateDbFormat = (val) => {
  return date.formatDate(val, 'YYYY-MM-DD')
}

const dateFormat = (val) => {
  return date.formatDate(val, 'DD MMM YYYY')
}
const dateFullFormat = (val) => {
  return date.formatDate(val, 'DD MMMM YYYY')
}
const dateHumanHour = (val) => {
  return date.formatDate(val, 'DD MMMM YYYY HH:mm:ss')
}
const dateExpire = (val) => {
  return date.formatDate(val, 'DD MM YYYY')
}

const formatRp = (value) => {
  if (value !== null) {
    return 'Rp. ' + Number(value)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.')
  }
}

const formatDouble = (value, dg) => {
  if (value !== null) {
    return Number(value)
      .toFixed(dg)
      .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
  }
}

function formatMoney(amount, decimalCount = 2, decimal = '.', thousands = ',') {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? '-' : ''

    const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
    const j = (i.length > 3) ? i.length % 3 : 0

    return negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '')
  } catch (e) {
    console.log(e)
  }
}

const hurufBesar = (val) => {
  return val.toUpperCase()
}

const olahUang = (val) => {
  // console.log('olah uang type', typeof val)
  if (typeof val === 'string') {
    let data = ''
    const array = val.split(',')
    for (let i = 0; i < array.length; i++) {
      data += array[i]
    }
    // console.log('olah uang return', parseFloat(data))
    return parseFloat(data)
  } else { return val }
}

const isHas = (test, val) => {
  if (typeof test === 'string' && typeof val === 'string') {
    let data = []
    const array = test.split(' ')
    data = array.filter(check => { return check === val })
    console.log('ishas', data)
    return data
  } else { return val }
}
const titleCase = (str) => {
  const splitStr = str.toLowerCase().split(' ')
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  // Directly return the joined string
  return splitStr.join(' ')
}

export {
  dateHumanHour,
  dateDbFormat,
  formatRp,
  formatDouble,
  formatMoney,
  hurufBesar,
  olahUang,
  isHas,
  dateFormat,
  dateFullFormat,
  dateExpire,
  titleCase
}
