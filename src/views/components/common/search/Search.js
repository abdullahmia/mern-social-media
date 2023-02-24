import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import ProfilePicture from '../../custom/images/ProfilePicture';

const Search = () => {
    const [search, setSearch] = useState('');


    return (
    <div className='relative'>
          <div className="flex items-center gap-2 rounded px-3 bg-gray-200 text-[#262626] dark:bg-transparent dark:border dark:border-[#2d343b] dark:text-gray-100">
            <BiSearch />
            <input type="search" value={search} onChange={e => setSearch(e.target.value)} className="py-2 flex-1 focus:outline-none bg-transparent" placeholder="Search.." />
        </div>
          {
                search && (<div className='absolute w-full divide-y dark:divide-[#2d343b] background border dark:border-[#2d343b]'>
                  <div className="flex items-center gap-2 rounded px-3 py-2 text-[#262626] dark:text-gray-100">
                      <ProfilePicture  alt="" className="w-10 h-10 rounded-full" />
                      <div>
                          <h2 className="text-[14px] font-[600]">username</h2>
                          <h3 className="text-[12px] text-gray-400">Full Name</h3>
                      </div>
                  </div>

                <div className="flex items-center gap-2 rounded px-3 py-2 text-[#262626] dark:text-gray-100">
                    <ProfilePicture alt="" className="w-10 h-10 rounded-full" />
                    <div>
                        <h2 className="text-[14px] font-[600]">username</h2>
                        <h3 className="text-[12px] text-gray-400">Full Name</h3>
                    </div>
                </div>

                <div className="flex items-center gap-2 rounded px-3 py-2 text-[#262626] dark:text-gray-100">
                    <ProfilePicture alt="" className="w-10 h-10 rounded-full" />
                    <div>
                        <h2 className="text-[14px] font-[600]">username</h2>
                        <h3 className="text-[12px] text-gray-400">Full Name</h3>
                    </div>
                </div>

                <div className="flex items-center gap-2 rounded px-3 py-2 text-[#262626] dark:text-gray-100">
                    <ProfilePicture alt="" className="w-10 h-10 rounded-full" />
                    <div>
                        <h2 className="text-[14px] font-[600]">username</h2>
                        <h3 className="text-[12px] text-gray-400">Full Name</h3>
                    </div>
                </div>

                <div className="flex items-center gap-2 rounded px-3 py-2 text-[#262626] dark:text-gray-100">
                    <ProfilePicture alt="" className="w-10 h-10 rounded-full" />
                    <div>
                        <h2 className="text-[14px] font-[600]">username</h2>
                        <h3 className="text-[12px] text-gray-400">Full Name</h3>
                    </div>
                </div>
                  
              </div>)
          }
        
    </div>
  )
}

export default Search