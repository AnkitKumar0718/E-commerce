import React, { useContext } from 'react'
import { useParams} from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';
import { WishlistContext } from '../contexts/WishlistContext';
import { ToastContext } from '../contexts/ToastContext';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

function ProductDetails() {
  const { id }=useParams();
  const { products }=useContext(ProductContext);
  const { addToCart }=useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToast } = useContext(ToastContext);

  const product= products.find((item)=>{
    return item.id===parseInt(id);
  })
  
  if(!product){
    return <section className='flex justify-center items-center 
    h-screen pt-[100px]'>Loading...</section>
  }

  const { title, price, description, image } = product;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, product.id);
    addToast('Item added to cart!', 'success');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    const message = inWishlist ? 'Removed from wishlist' : 'Added to wishlist!';
    addToast(message, 'success');
  };
 
  return (
    <>
    <div className='min-h-screen bg-white pt-[100px]'>
    <section className='py-12 lg:py-16 flex items-center'>
      <div className='container mx-auto px-4'> 
      <div className='flex flex-col lg:flex-row items-center gap-8'>
        <div className='flex flex-1 justify-center items-center'>
          <img className='w-40 h-50 lg:max-w-sm' src={image} alt={title}/>
        </div>
        <div className='flex-1 text-center lg:text-left'>
       <h1 className='text-[26px] font-medium mb-2 max-w-[450px]
       mx-auto lg:mx-0'>{title}</h1>
       <div className='text-red-400 font-medium text-xl mb-6'>
       ${price.toFixed(2)}
       </div>
       <p className='mb-8 text-gray-700 leading-relaxed'>
        {description}
       </p>
       <div className='flex flex-col lg:flex-row gap-4'>
         <button 
           onClick={handleAddToCart} 
           className='bg-primary py-4 px-8 text-white hover:bg-red-600 transition'
         >
          Add to Cart
         </button>
         <button 
           onClick={handleToggleWishlist}
           className={`py-4 px-8 transition flex items-center gap-2 justify-center ${
             inWishlist 
               ? 'bg-red-500 text-white hover:bg-red-600' 
               : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
           }`}
         >
           {inWishlist ? <BsHeartFill /> : <BsHeart />}
           {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
         </button>
       </div>
      </div>
      </div>
      </div>
   </section>
  </div>
  </>
  )
}

export default ProductDetails
