import React from 'react'
import './Programs.css'
import program_1 from '../../assets/program-1.png'
import program_2 from '../../assets/program-2.png'
import program_3 from '../../assets/program-3.png'

function Programs() {
  return (
    <div className='programs '>
        <div className="program">
            <img src={program_1} alt="" />
            <button className='btn'>More ..</button>
        </div>
        <div className="program">
            <img src={program_2} alt="" />
            <button className='btn'>More ..</button>
        </div>
        <div className="program">
            <img src={program_3} alt="" />
            <button className='btn'>More ..</button>
        </div>
      
    </div>
  )
}

export default Programs
