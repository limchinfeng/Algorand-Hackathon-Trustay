import getListings, { IListingsParams } from './actions/getListings';
import getCurrentUser from './actions/getCurrentUser';

import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import EmptyState from './components/EmptyState';
import ListingCard from './components/listings/ListingCard';
import Search from './components/navbar/Search';

interface HomeProps {
  searchParams: IListingsParams
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <div className='flex items-center justify-center'>
        <Search />
      </div>
      <Container>
        <div className='grid grid-cols-4'>
          <div className='col-span-3'>
            <div className='pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8'>
              {listings.map((listing) => {
                return (
                  <ListingCard
                    key={listing.id}
                    data={listing}
                    currentUser={currentUser}
                  />
                )
              })}
            </div>
          </div>
          <div className='col-span-1 m-5'>
            <h1 className='text-xl text-primary font-bold'>
              Community Voting
            </h1>
            <div className='border-primary border p-2 rounded-lg h-full'>
              supershuaifeng
            </div>
          </div>
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;