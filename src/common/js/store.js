// export function saveToLocal(userInfo, put = false) {
//   let user = window.localStorage.user
//   if (put) {
//     user = JSON.parse(user)
//     userInfo = {
//       ...user,
//       ...userInfo
//     }
//   }
//   window.localStorage.user = JSON.stringify(userInfo)
// }

// export function loadFromLocal() {
//   let user = window.localStorage.user
//   if (!user) {
//     return ''
//   }
//   user = JSON.parse(user)
//   return user
// }

let dbConfig = {
  dbName: 'db',
  version: 1,
  objectStoreConfig: {
    objectStoreName: 'users',
    keyPath: 'account'
  }
}

function openDB(dbName, version, objectStoreConfig) {
  let {objectStoreName, keyPath} = objectStoreConfig

  return new Promise((resolve, reject) => {
    let request = window.indexedDB.open(name, version)
    
    request.onupgradeneeded = (e) => {
      let db = e.target.result
      if  (!db.objectStoreNames.contains(objectStoreName)) {
        let objectStore = db.createObjectStore(objectStoreName, {keyPath: keyPath})
      }
    }

    request.onsuccess = (e) => {
      let db = e.target.result
      let transaction = db.transaction([objectStoreName], 'readwrite')
      let objectStore = transaction.objectStore(objectStoreName)
      resolve(objectStore)
    }

    request.onerror = (e) => {
      reject(e)
    }
  })
}

export function putToDB(userInfo) {
  let {dbName, version, objectStoreConfig} = dbConfig
  
  openDB(dbName, version, objectStoreConfig)
    .then((objectStore) => {
      objectStore.put(userInfo)
    })
    .catch((e) => {
      console.log(e)
    })
}

export function getFromDB(account) {
  let {dbName, version, objectStoreConfig} = dbConfig

  return openDB(dbName, version, objectStoreConfig)
          .then((objectStore) => {
            return new Promise((resolve, reject) => {
              let getRequest = objectStore.get(account)
          
              getRequest.onsuccess = (e) => {
                resolve(e.target.result)
              }

              getRequest.onerror = (e) => {
                reject(e)
              }
            })
          })
          .catch((e) => {
            console.log(e)
          })
}

export function deleteFromDB(account) {
  let {dbName, version, objectStoreConfig} = dbConfig

  openDB(dbName, version, objectStoreConfig)
    .then((objectStore) => {
      objectStore.delete(account)
    })
    .catch((e) => {
      console.log(e)
    })
}
