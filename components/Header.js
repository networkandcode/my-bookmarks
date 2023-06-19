import { Switch, useTheme } from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'

const Header = () => {
    const { setTheme } = useNextTheme()
    const { isDark, type } = useTheme()

    return (
        <>
            The current theme type is {type}
            <Switch
                checked={isDark}
                onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            />
        </>

    )
}

export default Header
