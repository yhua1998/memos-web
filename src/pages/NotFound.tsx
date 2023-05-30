import notfound from '@/assets/notfound.svg'

export default () => {
    return (
        <div className='w-full h-full'>
            <img className='max-w-full max-h-full' src={notfound} />
        </div>
    )
}