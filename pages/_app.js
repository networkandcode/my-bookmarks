import Header from '../components/Header'
import { DataProvider, } from '../hooks/useData'
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
                <DataProvider>
                    <Header/>
                    <Component {...pageProps} />
                </DataProvider>
            </NextUIProvider>
        </ThemeProvider>

    )
}

export default MyApp
