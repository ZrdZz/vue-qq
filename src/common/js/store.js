export function saveToLocal(userInfo, put = false) {
  let user = window.localStorage.user
  if (put) {
    user = JSON.parse(user)
    userInfo = {
      ...user,
      ...userInfo
    }
  }
  window.localStorage.user = JSON.stringify(userInfo)
}

export function loadFromLocal() {
  let user = window.localStorage.user
  if (!user) {
    return ''
  }
  user = JSON.parse(user)
  return user
}
