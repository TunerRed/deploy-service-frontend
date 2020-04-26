const key = 'lastClearFolder'

export function getLastLoginDate() {
  if (!localStorage.hasOwnProperty(key)) {
    resetLastLoginDate()
  }
  let retDate = new Date(JSON.parse(localStorage.getItem(key)))
  return retDate
}

export function resetLastLoginDate() {
  localStorage.setItem(key, JSON.stringify(new Date().getTime()))
}

export function daysBetween(dateStart, dateEnd) {
  let dateSpan = Math.abs(dateEnd - dateStart)
  return Math.floor(dateSpan / (24 * 3600 * 1000))
}
