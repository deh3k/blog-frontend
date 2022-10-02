import React, { RefObject } from 'react'
import { getTopCoords } from '../utils/getTopCoords';
import { useScrollDirection } from './useScrollDirections';


const useStickySidebar = (sidebarRef: RefObject<HTMLDivElement>) => {
  const scrollDirection = useScrollDirection();
  
  const [edge, setEdge] = React.useState<'bot' | 'top' | null>('bot')
  const [marginT, setMarginT] = React.useState(0)
  const [sidebarPos, setSidebarPos] = React.useState<'absolute' | 'sticky'>('absolute')

  const scrollHeight = (Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  ) - 402)
  

  React.useEffect(() => {
    

    const scrollHandler = () => {

      if(sidebarRef.current) {
        const sidebarTop = sidebarRef.current.getBoundingClientRect().top
        const sidebarBot = sidebarRef.current.getBoundingClientRect().bottom - window.innerHeight

        if(sidebarTop >= 10 && scrollDirection === 'up') {
          setSidebarPos('sticky')
          setEdge('top')
          setMarginT(0)
        }

        else if (sidebarBot <= 10 && scrollDirection === 'down') {
          setSidebarPos('sticky')
          setEdge('bot')
          setMarginT(0)
        }
        
        else if (sidebarPos !== 'absolute') {
          setSidebarPos('absolute')
          setEdge(null)
          setMarginT(getTopCoords(sidebarRef.current) - 145)
        }
      }
    }
  
    window.addEventListener('scroll', scrollHandler)

    //@ts-ignore
    const sidebarHeight = sidebarRef.current?.getBoundingClientRect().height || 0
    if(sidebarHeight <= window.innerHeight || sidebarHeight >= scrollHeight) {
      window.removeEventListener('scroll', scrollHandler);
      
      setSidebarPos('sticky')
      setEdge('top')
      setMarginT(0)
    }

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    }
  }, [scrollDirection, sidebarPos])




  return {
    edge,
    marginT,
    sidebarPos
  }
}

export { useStickySidebar }
