import React from 'react'

const About = () => {
    return (
        <div className=''>
            <div className='flex flex-col gap-14 lg:px-40 md:px-20 px-7 py-32 bg-slate-100'>
                <h2>About us</h2>
                <h1 className='sm:text-6xl text-4xl font-semibold'>We make it easy for anyone to create awesome WordPress websites.</h1>
            </div>
            <div className='flex gap-14 lg:px-40 md:px-20 px-7 py-32 bg-slate-50 flex-wrap'>
                <div className='flex flex-col gap-14 sm:w-2/5 w-full'>
                    <h2>What we do</h2>
                    <h3 className='sm:text-3xl text-2xl font-semibold'>We build awesome themes & plugins for WordPress</h3>
                </div>
                <div className='sm:w-2/5 w-full'>
                    Habitant faucibus sollicitudin fames quam scelerisque amet urna non risus diam netus pellentesque ac sit malesuada risus nisi, aliquet rutrum scelerisque cras habitant lorem tortor sit mauris eu ac id enim urna, adipiscing convallis viverra egestas.

                    Egestas aliquam, enim at consectetur ullamcorper blandit at nisi, viverra sed nullam nisl, lectus est viverra ultrices accumsan viverra vel. Scelerisque odio id urna, nibh feugiat amet interdum quis eu accumsan, mi mattis feugiat iaculis vitae tempus phasellus adipiscing.
                </div>
            </div>
            {/* <div className='flex gap-14 lg:px-40 md:px-20 px-7 py-32 bg-slate-100 flex-wrap'>
                <div>

                </div>
            </div> */}
        </div>
    )
}

export default About