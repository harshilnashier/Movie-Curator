import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { Oval } from 'react-loader-spinner';


function Banner() {
  let [BannerMovie,setBanner]=useState("");
  useEffect(function(){
    (function(){
      axios.get(
        "https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=afbf812d98308c2fa164317d1ff41796")
        .then((res)=>{
         setBanner(res.data.results[0]);
       })
    })()
  },[])

  return (
    <>  
      {BannerMovie===""?
      <div className='flex justify-center'>
          <Oval
          height="80"
          width="80"
          radius="9"
          color="gray"
          secondaryColor='gray'
          ariaLabel="loading"
          
        />
        </div>:


       <div className={`
       h-[40vh] bg-center bg-cover flex items-end md:h-[60vh] rounded-2xl`} 
      //  because tailwind removed dynamic variable implementation so manually do it
       style={{
        backgroundImage:
        `url(https://image.tmdb.org/t/p/original/t/p/original/${BannerMovie.backdrop_path})`
      }}>
        
       <div className="text-xl text-white md:text-3xl bg-gray-900 p-4 bg-opacity-40 text-center w-full font-bold rounded-2xl">
         {BannerMovie.title}
       </div>
       
     </div>
      }
    </>
  )
}

export default Banner
