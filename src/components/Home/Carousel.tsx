
import { useEffect, useState } from "react"
import { BiChevronRight,BiChevronLeft } from "react-icons/bi"
import Iphone from "../../assets/iphone.avif"
import PS5 from "../../assets/ps5.webp"
import TV from "../../assets/tv.webp"


const images = [Iphone,PS5,TV]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const prevSlide = () => {
    const isFirstSlide : boolean = currentIndex === 0
    const newIndex : number = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide :boolean = currentIndex === images.length - 1
    const newIndex : number = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div className="relative w-full max-w-full h-[35vh]  md:h-[700px] ">
      <img
        src={images[currentIndex]}
        className="w-full h-full duration-500  object-cover rounded-md"
      />
      {/* Left Arrow */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2">
        <button onClick={prevSlide} className="p-2 bg-black/20 text-white rounded-full hover:bg-black/30 transition cursor-pointer">
          <BiChevronLeft size={24} />
        </button>
      </div>
      {/* Right Arrow */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2">
        <button onClick={nextSlide} className="p-2 bg-black/20 text-white rounded-full hover:bg-black/30 transition cursor-pointer">
          <BiChevronRight size={24} />
        </button>
      </div>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
          ></button>
        ))}
      </div>
    </div>
  )
}

