import { Button, Input } from '@nextui-org/react'

const AddBookmark = () => {
    return (
        <>
            <div>
                <label htmlFor='bookmarkUrl'> Add the Bookmark URL: </label>
                <Input id='bookmarkUrl' placeholder='Add the Bookmark URL'/>
            </div>
            <Button>
                Add Bookmark
            </Button>
        </>
    )
}

export default AddBookmark
