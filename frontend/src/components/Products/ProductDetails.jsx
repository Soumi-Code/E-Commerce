import React from 'react'
const selectedProduct = {
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description: "A stylish jacket perfect for all occasions. Made with high-quality materials to ensure comfort and durability.",
  brand: "FashionBrand",
  material: "Leather",
  sizes: ["S","M" ,"L","XL"],
  colors: ["Black", "Red"],
  images: [
    {
      url: 'https://picsum.photos/500/500?random=1',
      altText: 'Stylish Jacket 1'
    },
    {
      url: 'https://picsum.photos/500/500?random=2',
      altText: 'Stylish Jacket 2'
    }
  ]
}

const ProductDetails = () => {
  return (
    <div className='p-6'>
        <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
            <div className='flex flex-col md:flex-row'>
                <div className='hidden md:flex flex-col space-y-4 mr-6'>
                    {selectedProduct.images.map((image, index) => (
                        <img  
                            key={index}
                            src={image.url} 
                            alt={image.altText || `Thumbnail ${index}`}
                            className='w-20 h-20 object-cover rounded-lg cursor-pointer border'
                        />
                    ))}
                </div>
                {/* Main Product Image */}
                <div className='md:w-1/2'>
                    <div className='mb-4'>
                    <img
                        src={selectedProduct.images[0]?.url}
                        alt= 'Main Product Image'
                        className='w-full h-auto object-cover rounded-lg'
                    />
                    </div>
                </div>
                {/*Mobile Product Image */}
                <div className='md:hidden flex overscroll-x-scroll space-x-4 mb-4'>
                    {selectedProduct.images.map((image, index) => (
                        <img
                            key={index}
                            src={image.url}
                            alt={image.altText || `Thumbnail ${index}`}
                            className='w-full h-auto object-cover rounded-lg cursor-pointer border'
                        />
                    ))}
                </div>
                {/*Right Side Details */}
                <div className='md:w-1/2 md:ml-10'>
                    <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
                        {selectedProduct.name}
                    </h1>
                    <p className='text-lg text-gray-600 mb-1 line-through'>
                        {selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}
                    </p>
                    <p className='text-xl text-gray-500 mb-2'>
                        Rs {selectedProduct.price}
                    </p>
                    <p className='text-gray-600 mb-4'>{selectedProduct.description}</p>
                    <div className='mb-4'>
                        <p className='text-gray-700'>Color:</p>
                        <div className='flex gap-2 mt-2'>
                            {selectedProduct.colors.map((color) => (
                                <button
                                    key={color}
                                    className='w-8 h-8 rounded-full border'
                                    style={{ backgroundColor: color.toLocaleLowerCase(),
                                    filter: 'brightness(0.5)' }}
                                    >

                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='mb-4'>
                        <p className='text-gray-700'>Size:</p>
                        <div className='flex gap-2 mt-2'>
                            {selectedProduct.sizes.map((size) => (
                                <button
                                    key={size}
                                    className='w-8 h-8 rounded-full border'
                                    style={{ backgroundColor: 'transparent' }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='mb-4'>
                        <p className='text-gray-700'>Quantity:</p>
                        <div className='flex gap-2 mt-2'>
                            <button className='w-8 h-8 rounded-full border'>-</button>
                            <span className='flex items-center justify-center w-8 h-8'>{selectedProduct.quantity} 1</span>
                            <button className='w-8 h-8 rounded-full border'>+</button>
                        </div>
                    </div>

                    <button className='bg-black text-white py-2 px-6 rounded w-full mb-4'>ADD TO CART</button>
                    <div className='mt-10 text-gray-700'>
                        <h3 className='text-xl font-bold mb-4'>Characteristics:</h3>
                        <table className='w-full text-left text-sm text-gray-600'>
                            <tbody>
                                <tr>
                                    <td className='py-1'>Brand</td>
                                    <td className='py-1'>{selectedProduct.brand}</td>
                                </tr>
                                <tr>
                                    <td className='py-1'>Material</td>
                                    <td className='py-1'>{selectedProduct.material}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails
