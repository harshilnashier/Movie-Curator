import React,{useState} from 'react'

function Pagination(props) {
 let {pageNum,onPrev,onNext}=props
  return (
    <div className="flex justify-center my-4 ">
        <button className=" hover:bg-sky-300 border-2 p-2 border-r-0 rounded-l-xl border-blue-400" onClick={onPrev}>Previous</button>
        <div className="border-2 p-2 border-r-0 border-blue-400">{pageNum}</div>
        <button className="hover:bg-sky-300 border-2 p-2 rounded-r-xl border-blue-400" onClick={onNext}>Next</button>
    </div>
  )
}

export default Pagination