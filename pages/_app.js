import Header from '../components/Header'
import { createTheme, NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'

const MyApp = ({ Component, pageProps }) => {
    const lightTheme = createTheme({
        type: 'light',
    })

    const darkTheme = createTheme({
        type: 'dark',
    })

    return (
        <ThemeProvider
            defaultTheme="system"
            attribute="class"
            value={{
                light: lightTheme.className,
                dark: darkTheme.className
            }}
        >
            <NextUIProvider>
                <Header/>
                <Component {...pageProps} />
            </NextUIProvider>
        </ThemeProvider>

    )
}

export default MyApp
