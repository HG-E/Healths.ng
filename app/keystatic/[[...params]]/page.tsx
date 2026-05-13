'use client'

import dynamic from 'next/dynamic'
import config from '../.././../keystatic.config'

const KeystaticApp = dynamic(() => import('@keystatic/next/keystatic-app'), { ssr: false })

export default function KeystaticPage() {
  return <KeystaticApp config={config} />
}
