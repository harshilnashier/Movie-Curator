import React,{useState,useEffect} from 'react'
import Pagination from './Pagination'

function Favourites() {
  let [favourites,setFavourites]=useState([])
  let [genres,setGenres]=useState([])
  let [currGenre,setCurGenre]=useState('All Genres')
  let [rating,setRating]=useState(0)
  let [popularity,setPopularity]=useState(0)
  const [search,setSearch]=useState("")
  const [rows,setRows]=useState(5)
  const [currPage,setCurrPage]=useState(1)
  let genreids = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation', 35: 'Comedy',
    80: 'Crime', 99: 'Documentary',
    18: 'Drama', 10751: 'Family',
    14: 'Fantasy', 36: 'History',
    27: 'Horror',
    10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller',
    10752: 'War',
    37: 'Western'
  }


  
  useEffect(()=>{
          let temp=localStorage.getItem("curator");
          temp=JSON.parse(temp)||[];
          setFavourites([...temp]);
  })

  useEffect(()=>{
    let temp=favourites.map((movie)=>genreids[movie.genre_ids[0]])
    temp=new Set(temp)
    setGenres(["All Genres",...temp])
  },[favourites])
  
  let del=(movie)=>{
    let arr=favourites.filter((m)=>m.id!=movie.id)
    setFavourites([...arr])
    localStorage.setItem("curator",JSON.stringify(arr))
  }
  let filteredFav=[]
  filteredFav=currGenre=="All Genres"?favourites:favourites.filter((movie)=>genreids[movie.genre_ids[0]]==currGenre)

  if(rating===-1){
    filteredFav=filteredFav.sort(function(objA,objB){
      return objA.vote_average - objB.vote_average
    })
  }else if(rating===1){
    filteredFav=filteredFav.sort(function(objA,objB){
      return objB.vote_average - objA.vote_average
    })
  }
  if(popularity===-1){
    filteredFav=filteredFav.sort(function(objA,objB){
      return objA.popularity - objB.popularity
    })
  }else if(popularity===1){
    filteredFav=filteredFav.sort(function(objA,objB){
      return objB.popularity - objA.popularity
    })
  }
  // searching
  filteredFav=filteredFav.filter((movie)=>movie.title.toLowerCase().includes(search.toLowerCase()))

  // 
  let maxPage=Math.ceil(filteredFav.length/rows)
  let starting_index=(currPage-1)*rows
  let ending_index=Number(starting_index)+Number(rows)
  
  let goBack=()=>{
    if(currPage>1){
      setCurrPage(currPage-1)
    }
  }
  let goNext=()=>{
    if(currPage<maxPage){
      setCurrPage(currPage+1)
    }
  }
  filteredFav=filteredFav.slice(starting_index,ending_index)
  return (
    <>
    <div className="mt-6 flex justify-center space-x-2">
      {genres.map((val)=>
        <button className={currGenre==val?'py-1 px-2 bg-blue-400 rounded-lg font-bold text-lg text-white hover:bg-blue-400':'py-1 px-2 bg-gray-400 rounded-lg font-bold text-lg text-white hover:bg-blue-400'}
            onClick={()=>{
              setCurrPage(1)
              setCurGenre(val)}}> 
        {val}
      </button>
      )}
    </div>
    <div className="mt-4 flex justify-center space-x-2">
      <input type="text" placeholder='search' className='border-2 py-1 px-2 text-center' value={search} onChange={(e)=>setSearch(e.target.value)}/>
      <input type="number"  className='border-2 py-1 px-2 text-center' value={rows} onChange={(e)=>setRows(e.target.value)}/>
    </div>
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
  <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
        <div className='flex'>
        <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png" className="mr-2 cursor-pointer" 
        onClick={()=>{setRating(1) 
        setPopularity(0)}}></img>
        Rating
        <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png" className="ml-2 mr-2" onClick={()=>{setRating(-1)
        setPopularity(0)}
      }></img>
        </div>
        </th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
        <div className='flex'>
        <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png" className="mr-2 cursor-pointer" onClick={()=>{setRating(0) 
        setPopularity(1)}}></img>
        Popularity
        <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png" className="ml-2 mr-2" onClick={()=>{setRating(0) 
        setPopularity(-1)}}></img>
        </div>
        </th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Genre</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Remove</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
      {filteredFav.map((movie)=>{
        return <tr className="hover:bg-gray-50" key={movie.id}>
        <th className="flex  space-x-2 items-center px-6 py-4 font-normal text-gray-900">
            <img
              className="h-[8rem]  w-[7rem] object-fit"
              src={`https://image.tmdb.org/t/p/original/t/p/original/${movie.poster_path}`}
              alt=""
            />
            <div className="font-medium text-gray-700 text-sm">{movie.title}</div>
        </th>
        <td className="px-6 py-4">
          {movie.vote_average}
        </td>
        <td className="px-6 py-4">{movie.popularity}</td>
        <td className="px-6 py-4">
          <div className="flex gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700"
            >
            {genreids[movie.genre_ids[0]]}
            </span>
          </div>
        </td>
        <td className="px-6 py-4">
        <button
              className="inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold text-red-700" onClick={()=>del(movie)}
            >
              delete
            </button>
        </td>
      </tr>
      })}
    </tbody>
  </table>
</div>
    <Pagination pageNum={currPage} onPrev={goBack} onNext={goNext}></Pagination>
    </>
  )
}

export default Favourites
