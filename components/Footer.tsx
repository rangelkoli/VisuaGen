import Link from "next/link";

export default function Footer() {
  return (
    <footer className='bg-gray-100 py-8 px-4 md:px-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-xl font-bold mb-4'>VisuaGen</h3>
            <p className='text-gray-400'>
              Transform your ideas into beautiful visualizations with AI.
            </p>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Product</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/features'
                  className='text-gray-400 hover:text-white'
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href='/pricing'
                  className='text-gray-400 hover:text-white'
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href='/templates'
                  className='text-gray-400 hover:text-white'
                >
                  Templates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Company</h4>
            <ul className='space-y-2'>
              <li>
                <Link href='/about' className='text-gray-400 hover:text-white'>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-gray-400 hover:text-white'
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link href='/blog' className='text-gray-400 hover:text-white'>
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Legal</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/privacy'
                  className='text-gray-400 hover:text-white'
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link href='/terms' className='text-gray-400 hover:text-white'>
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='mt-8 pt-8 border-t border-gray-200 text-center md:text-left'>
          <p>© {new Date().getFullYear()} VisuaGen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
