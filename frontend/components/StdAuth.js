import { useRouter } from 'next/router'
import { useEffect } from 'react'

const StdAuth = WrappedComponent => {
    const Wrapper = props => {
        const { token } = props
        const router = useRouter()
        useEffect(() => {
            if (!token)
                router.push('/DisStudent')
            else
                router.push('/ChangeStudent')
        }, [token])
        return (<WrappedComponent {...props} />)
    }
    return Wrapper
}

export default StdAuth 