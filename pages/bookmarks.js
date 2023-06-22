import AddBookmark from '../components/AddBookmark'
import { useData, } from '../hooks/useData'

const Bookmarks = () => {
    const data = useData()
    const { bookmarks, } = data

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