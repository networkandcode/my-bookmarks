import { useData } from '../hooks/useData'
import { Button, Input, } from '@nextui-org/react'
import { useState, } from 'react'

const AddBookmark = () => {
    const data = useData()
    const { addDocument, } = data

    const [ newBookmark, setNewBookmark, ] = useState({})

    const onChange = e => {
        e.preventDefault()
        const { name, value, } = e.target
        setNewBookmark({ ...newBookmark, [name]: value, })
    }

    const onClick = () => {
        addDocument(newBookmark)
        setNewBookmark({})
    }

    return (
        <div>
            <div>
                <label htmlFor='bookmarkUrl'> Add the Bookmark URL: </label>
                <Input id='bookmarkUrl' name='url' onChange={onChange} placeholder='Add the Bookmark URL' value={newBookmark.url || ''}/>
            </div>
            <Button onClick={onClick}>
                Add Bookmark
            </Button>
        </div>
    )
}

export default AddBookmark
