import React ,{useEffect, useState}from 'react'
import axios from 'axios'
import { Oval } from 'react-loader-spinner'
import Pagination from './Pagination'
function Movies() {

  let [movies,setMovies]=useState("")
  let [pageNum,setPage]=useState(1)
  let [hover,sethover]=useState("")
  let [favourites,setFavourites]=useState([])


  useEffect(function(){
        axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=afbf812d98308c2fa164317d1ff41796&page=${pageNum}`)
          .then((res)=>{
           setMovies(res.data.results);
           let temp=localStorage.getItem("curator")
           temp=JSON.parse(temp)||[];
           setFavourites([...temp]);
         })
    },[pageNum])


const onPrev=()=>{
  if(pageNum>1){
    setPage(pageNum-1);
  }
}
const onNext=()=>{
  setPage(pageNum+1);
}

const showEmoji=(id)=>{
  sethover(id)
}
const HideEmoji=()=>{
  sethover("")
}
const removeMovieFromFav=(id)=>{
  let filteredFav=favourites.filter(elem=>{
    return elem!=id
  })
  setFavourites([...filteredFav])
  localStorage.setItem("curator",JSON.stringify(filteredFav))
}
const addMovieToFav=(movie)=>{
  let newFav=[...favourites,movie] 
  setFavourites([...newFav])
   localStorage.setItem("curator",JSON.stringify(newFav))
}
  return (

    <div className="mt-8">
        <div className="mb-8 font-bold text-center text-2xl">Trending Movies</div>
        
        <div className="flex flex-wrap justify-center">
          {
            movies.length==0?<div className='flex justify-center'>
            <Oval
            height="80"
            width="80"
            radius="9"
            color="gray"
            secondaryColor='gray'
            ariaLabel="loading"
            
          />
          </div>:
            movies.map((movie)=>{
              return <div
                onMouseOver={()=>{showEmoji(movie.id)}}
                onMouseLeave={()=>{HideEmoji()}}
               key={movie.id} className="w-[160px] h-[30vh] bg-center bg-cover m-4 rounded-xl hover:scale-110 md:h-[40vh] md:w-[180px] duration-300 flex items-end relative"
              style={{
                backgroundImage:`url(https://image.tmdb.org/t/p/original/t/p/original/${movie.poster_path})`
              }}>
                <div className="p-0.5 top-1 right-1 absolute" 
                style={{display:hover==movie.id?
                "block":"none"}}>
                  {
                    favourites.find((m)=>m.id===movie.id)?
                    <button className="text-2xl" onClick={()=>{removeMovieFromFav(movie)}}>
                      ❌
                    </button>
                    :<button className="text-2xl" onClick={()=>{addMovieToFav(movie)}}>
                    ❤️
                    </button>
                    
                  }
                    
                </div>

                <div className="text-l text-white bg-gray-900 p-1 bg-opacity-40 text-center w-full rounded-xl ">
                  {movie.title}
                </div>
</div>

            })
          }

        </div>
        <Pagination
            pageNum={pageNum}
            onPrev={onPrev}
            onNext={onNext}>  
          </Pagination>
    </div>
  )
}

export default Movies