import AddBookmark from '../components/AddBookmark'
import { useData, } from '../hooks/useData'
import { useRouter, } from 'next/router'
import { useEffect, } from 'react'

const Bookmarks = () => {
    const data = useData()
    const { bookmarks, session, } = data

    const router = useRouter()

    useEffect(() => {
        if (!session) {
            router.push('/')
        }
    }, [router, session,])

    return (
        <div>
            <AddBookmark />
            {bookmarks.map(bookmark => (
                <div>
                    {bookmark.$id}
                    {bookmark.url}
                </div>
            ))}
        </div>
    )
}

export default Bookmarks