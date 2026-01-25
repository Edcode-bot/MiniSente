'use client'

import { useEffect, useRef } from 'react'
import QRCodeLib from 'qrcode'
import { Download } from 'lucide-react'
import { toast } from 'sonner'

interface QRCodeProps {
  address: string
  size?: number
}

export function QRCode({ address, size = 200 }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current && address) {
      QRCodeLib.toCanvas(canvasRef.current, address, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      }, (error: any) => {
        if (error) console.error('Error generating QR code:', error)
      })
    }
  }, [address, size])

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      link.download = `minisente-${address.slice(-8)}.png`
      link.href = canvasRef.current.toDataURL()
      link.click()
      toast.success('QR code downloaded')
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-4 rounded-lg border-2 border-gray-200 mb-4">
        <canvas
          ref={canvasRef}
          className="block"
          style={{ width: size, height: size }}
        />
      </div>
      <p className="text-sm text-gray-600 mb-4">Scan to receive USDC</p>
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Download className="w-4 h-4" />
        Download QR
      </button>
    </div>
  )
}
