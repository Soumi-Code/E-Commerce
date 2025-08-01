import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import axios from 'axios'

const NewArrivals = () => {
    const scrollRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const [newArrivals, setNewArrivals] = useState([])

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`)
                setNewArrivals(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchNewArrivals()
    }, [])

    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setCanScrollLeft(scrollRef.current.scrollLeft)
    }
    const handleMouseMove = (e) => {
        if(!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk
    }

    const handleMouseUpOrLeave = () => {
        setIsDragging(false)
    }



    const scroll = (direction) => {
        const container = scrollRef.current;
        const childWidth = container?.firstChild?.offsetWidth || 300;
        const scrollAmount = direction === "left" ? -childWidth : childWidth;
  
        container.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });
    }




    const updateScrollButtons = () => {
        const container = scrollRef.current;
        
        if(container) {
            const leftScroll = container.scrollLeft
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth
            setCanScrollLeft(leftScroll > 0)
            setCanScrollRight(rightScrollable)
        }

    }

    useEffect(() => {
        const container = scrollRef.current;
        if(container) {
            container.addEventListener("scroll", updateScrollButtons)
            updateScrollButtons();
            return () => container.removeEventListener("scroll",updateScrollButtons)
        }
    } , [newArrivals])



  return (
    <section className='py-16 px-4 lg:px-8'>
      <div className='container mx-auto text-center mb-10 relative'>
        <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
        <p className='text-lg text-gray-600 mb-8'>Discover the latest trends in fashion and style.</p>

        <div className='absolute right-0 bottom-[-30px] flex space-x-2'>
            <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${canScrollLeft ?"bg-white text-black":"bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                <FiChevronLeft className='text-2xl' />
            </button>
            <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border ${canScrollRight ?"bg-white text-black":"bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                <FiChevronRight className='text-2xl' />
            </button>
        </div>
      </div>

      <div 
      ref={scrollRef} 
      className={`container mx-auto overflow-x-scroll scrollbar-hide flex space-x-6 relative px-4 sm:px-8 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}>
        {newArrivals.map((product) => (
            <Link 
            to={`/product/${product._id}`} 
            key={product._id} 
            className='flex-shrink-0 w-[80%] sm:w-[60%] md:w-[40%] lg:w-[250px] relative hover:shadow-lg transition duration-200 transform hover:scale-105'
            >
            <img 
                src={product.images[0]?.url} 
                alt={product.images[0]?.altText || product.name} 
                className='w-full aspect-[2/3] object-cover rounded-lg'
                draggable="false"
            />
            <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg'>
                <h4 className='font-medium'>{product.name}</h4>
                <p className='mt-1'>$ {product.price}</p>
            </div>
            </Link>


        ))}
      </div>
    </section>
  )
}

export default NewArrivals
