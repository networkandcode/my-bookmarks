import { Account, Client, Databases, ID, Permission, Role, } from 'appwrite'
import { createContext, useContext, useEffect, useState, } from 'react'

let account
let client
let databases

if (!client) {
    client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJ_ID)

    account = new Account(client)
    databases = new Databases(client)
}

const DataContext = createContext()
const { Provider } = DataContext

export const useData = () => useContext(DataContext)

const useDataProvider = () => {
    const [ user, setUser ] = useState()
    const [ bookmarks, setBookmarks ] = useState([])
    const [ session, setSession ] = useState()

    const addDocument = async(newBookmark) => {
        const { url } = newBookmark

        const promise = databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
            process.env.NEXT_PUBLIC_APPWRITE_COLL_ID,
            ID.unique(),
            { url },
            [
                Permission.read(Role.user(user.$id)),
                Permission.update(Role.user(user.$id)),
                Permission.delete(Role.user(user.$id))
            ]
        )

        promise.then(resp => {
            const newBookmark = resp
            setBookmarks([ ...bookmarks, newBookmark ])
            return newBookmark.$id
        }),(err => {
            console.log(err)
        })
    }

    const addEmailSession = (email, password) => {
        const promise = account.createEmailSession(email, password)

        promise.then(resp => {
            console.log(resp)
            setSession(resp)
        }).catch(err => {
            console.log(err)
        })
    }

    const deleteSession = () => {
        const promise = account.deleteSession(session.$id)

        promise.then(() => {
            setSession()
            setUser()
        }).catch(err => {
            console.log(err)
        })
    }

    const getAccount = () => {
        const promise = account.get()

        promise.then(resp => {
            setUser(resp)
        }).catch(err => {
            console.log(err)
        })
    }

    const getSession = ()  => {
        const promise = account.getSession(['current'])

        promise.then(resp => {
            const expiryDate = new Date(resp.expire)
            const currentDate = new Date()

            if (expiryDate >= currentDate) {
                setSession(resp)
            } else {
                deleteSession(resp.$id)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAccount()
    }, [])

    useEffect(() => {
        if(user) {
            getSession()
        }
    }, [user])

    return {
        addEmailSession,
        addDocument,
        bookmarks,
        deleteSession,
        session,
    }
}

export const DataProvider = ({ children }) => {
    const data = useDataProvider()
    return <Provider value={data}> {children} </Provider>
}
