import { Client, Databases, } from 'appwrite'
import { createContext, useContext, useState, } from 'react'

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJ_ID)

const databases = new Databases(client)

const DataContext = createContext()
const { Provider } = DataContext

export const useData = () => useContext(DataContext)

const useDataProvider = () => {
    const [ bookmarks, setBookmarks ] = useState([])

    const addDocument = async(newBookmark) => {
        const { url } = newBookmark

        const promise = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
            process.env.NEXT_PUBLIC_APPWRITE_COLL_ID,
            ID.unique(),
            { url },
            [
                Permission.read(Role.user(userId)),
                Permission.update(Role.user(userId)),
                Permission.delete(Role.user(userId))
            ]
        )

        promise.then((resp) => {
            const newBookmark = resp
            setBookmarks([ ...docs, newBookmark ])
            return newBookmark.$id
        }),(err => {
            console.log(err)
        })
    }

    return {
        addDocument,
        bookmarks,
    }
}

export const DataProvider = ({ children }) => {
    const data = useDataProvider()
    return <Provider value={data}> {children} </Provider>
}
