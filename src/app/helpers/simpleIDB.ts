const dbName = 'lucifer'
const storeName = 'imageStore'

interface ImageValue {
  key: number
  data: string
}

const getResultFromEvent = (event: Event): unknown => (event.target as IDBOpenDBRequest).result

const dbCreate = () =>
  new Promise<IDBDatabase>((resolve, reject) => {
    const openReq = indexedDB.open(dbName, 1)

    openReq.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = getResultFromEvent(event) as IDBDatabase
      db.createObjectStore(storeName, {
        keyPath: 'key',
      })
    }

    openReq.onsuccess = (event: Event) => {
      resolve(getResultFromEvent(event) as IDBDatabase)
    }
    openReq.onerror = () => {
      reject(new Error('db open failure'))
    }
  })

const dbGetAll = (db: IDBDatabase) =>
  new Promise<ImageValue[]>((resolve, reject) => {
    const trans = db.transaction(storeName, 'readonly')
    const store = trans.objectStore(storeName)
    const getReq = store.getAll()

    getReq.onsuccess = (event: Event) => {
      resolve(getResultFromEvent(event) as ImageValue[])
    }
    getReq.onerror = () => {
      reject(new Error('get failure'))
    }
  })

const dbPut = (db: IDBDatabase, value: ImageValue) =>
  new Promise((resolve, reject) => {
    const trans = db.transaction(storeName, 'readwrite')
    const store = trans.objectStore(storeName)
    const putReq = store.put(value)

    putReq.onsuccess = () => {
      resolve()
    }
    putReq.onerror = () => {
      reject(new Error('put failure'))
    }
  })

const dbDelete = () =>
  new Promise((resolve, reject) => {
    const deleteReq = indexedDB.deleteDatabase(dbName)

    deleteReq.onsuccess = () => {
      resolve()
    }
    deleteReq.onerror = () => {
      reject(new Error('db delete failure'))
    }
  })

export const setImages = async (images: string[]) => {
  let db: IDBDatabase | null = null

  try {
    const imageValues: ImageValue[] = images.map((image: string, index: number) => ({
      key: index,
      data: image,
    }))

    await dbDelete()

    db = await dbCreate()
    await Promise.all(imageValues.map(value => dbPut(db!, value)))
    db.close()
  } catch (e) {
    console.error(e)
    if (db) {
      db.close()
    }
  }
}

export const getImages = async () => {
  let db: IDBDatabase | null = null

  try {
    db = await dbCreate()
    const imageValues = await dbGetAll(db)
    db.close()

    return imageValues.map(value => value.data)
  } catch (e) {
    console.error(e)
    if (db) {
      db.close()
    }
    return []
  }
}
