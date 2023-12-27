import React from 'react'

const SidebarOptions = ({active,text,Icon}) => {
  return (
    <div className={`flex cursor-pointer my-3 px-6 py-3 hover:bg-blue-200 hover:rounded-[30px] hover:text-blue-600 ${active && 'sidebarOptions_active'}`}>
      <Icon className="mr-3"/>
      <h2 className='mr-[20px] text-[18px] font-semibold'>{text}</h2>
    </div>
  )
}

export default SidebarOptions
