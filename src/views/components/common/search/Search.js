import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useSearchUserQuery } from '../../../../features/user/userApi';
import ProfilePicture from '../../custom/images/ProfilePicture';

const Search = () => {
    const [search, setSearch] = useState('');

    // debouncing search query
    const { data: users, isLoading } = useSearchUserQuery(search, {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        refetchOnMountOrArgChange: true,
        skip: !search,
    });


    const renderUsers = () => {
        if (isLoading) return <h1>Loading...</h1>;
        if (!users) {
            return <div className="flex items-center gap-2 rounded px-3 py-2 text-[#262626] dark:text-gray-100">
                <h2>No user found</h2>
            </div>
        }
        if (users?.length > 0) {
            return users.map((user, key) => {
                return (
                    <Link to={`/${user.username}`} key={key} className="flex items-center gap-2 rounded px-3 py-2 text-[#262626] dark:text-gray-100">
                        <ProfilePicture src={user.image} alt="" className="w-10 h-10 rounded-full" />
                        <div>
                            <h2 className="text-[14px] font-[600]">{user.username}</h2>
                            <h3 className="text-[12px] text-gray-400">{user.fullName}</h3>
                        </div>
                    </Link>
                );
            });
        }
    }


    return (
    <div className='relative'>
          <div className="flex items-center gap-2 rounded px-3 bg-gray-200 text-[#262626] dark:bg-transparent dark:border dark:border-[#2d343b] dark:text-gray-100">
            <BiSearch />
            <input type="search" value={search} onChange={e => setSearch(e.target.value)} className="py-2 flex-1 focus:outline-none bg-transparent" placeholder="Search.." />
        </div>
          {
                search && (<div className='absolute w-full divide-y dark:divide-[#2d343b] background border dark:border-[#2d343b]'>
                  {renderUsers()}
                  
              </div>)
          }
        
    </div>
  )
}

export default Search