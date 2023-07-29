'use client'
import { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useThreadStore } from '@/stores'
import AddPost from './add'
import UpdatePost from './update'

function PostPlaceholder () {
  const emptyArray = (length = 5) => (Array.from(Array(length).keys()))

  return <div>
    {emptyArray(20).map(i => (<div key={i} className='flex md:rounded-xl my-2 animate-pulse opacity-20'>
    <div className='flex flex-col self-stretch w-full p-4 bg-gray-50'>
      <div className='flex item-between'>
        <div className='self-stretch mb-4 bg-gray-200 rounded-full w-64 h-8' />
        <div className='flex-grow self-stretch mb-2 rounded-full w-96 h-[15px]' />
        <div className='self-stretch mb-2 bg-gray-200 rounded-full w-16 h-[15px]' />
      </div>
      <div className='self-stretch mb-2 bg-gray-200 rounded-full w-96 h-[15px]' />
      <div className='self-stretch mb-2 bg-gray-200 rounded-full w-64 h-[15px]' />
      <div className='self-stretch mb-2 bg-gray-200 rounded-full w-48 h-[15px]' />
    </div>
  </div>))}
  </div>
}

function Post ({ data }) {
  data.path.shift()
  switch (data.op) {
    case 'add':
      return (<AddPost data={data} />)
    case 'update':
      return (<UpdatePost data={data} />)
    // case 'delete':
    //   return (<div className=''>sad</div>)
    default:
      return (<Fragment></Fragment>)
  }
}

export default function Thread ({thread}) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (thread.length > 0) setLoading(false)
  }, [thread])

  return (
    <div className='flex flex-col py-4 w-full md:max-w-2xl'>
      <div className='flex flex-col'>
        <div className='flex justify-end text-xs pr-2'>
          <div>{loading ? (<span className='animate-pulse'>...</span>) : (<span>{thread.length}</span>)} updates</div>
        </div>
        <>
          {loading && <PostPlaceholder />}
        </>
        <>
          {thread.length > 0 && thread.map((post, i) =>
          <Link key={i} href={`/project/${post.projectId}`} className='flex flex-col'>
            <Post data={post} />
          </Link>
          )}
        </>
      </div>
    </div>
  )
}

export { Post }
