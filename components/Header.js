import { useData, } from '../hooks/useData'
import { Button, Switch, useTheme, } from '@nextui-org/react'
import { useTheme as useNextTheme, } from 'next-themes'
import { useEffect, } from 'react'

const Header = () => {
    const data = useData()
    const { deleteSession, session, } = data

    const { setTheme } = useNextTheme()
    const { isDark, type } = useTheme()

    return (
        <div>
            { session && <Button onPress={deleteSession}> Logout </Button> }
            <Switch
                checked={isDark}
                onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            />
        </div>
    )
}

export default Header
