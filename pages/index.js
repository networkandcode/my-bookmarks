import { Button, Input, Spacer, Text, } from '@nextui-org/react'
import { useData, } from '../hooks/useData'
import { useRouter, } from 'next/router'
import { useEffect, useState, } from 'react'

const Home = () => {
    const data = useData()
    const { addEmailSession, session, } = data

    const router = useRouter()

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleLogin = () => {
        addEmailSession(email, password)
    }

    useEffect(() => {
        console.log(session)
        if (session) {
            router.push('/bookmarks')
        }
    }, [ router, session, ])

    return (
        <div>
            <Text h2> Login </Text>
            <label htmlFor='email'> <Text> Email: </Text> </label>
            <Input id='email' name='email' onChange={e => setEmail(e.target.value)} value={email} />
            <label htmlFor='password'> <Text> Password: </Text> </label>
            <Input id='password' name='password' onChange={e => setPassword(e.target.value)} type='password' value={password} />
            <Spacer y={1} />
            <Button onPress={handleLogin}> Login </Button>
        </div>
    )
}

export default Home
