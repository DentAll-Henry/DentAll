import NavDash from '@/components/NavBar/navDash';


const page = () => {
  return (
    <div className="w-[80%] h-screen bg-darkD-600 text-white ml-[20%]">
      <NavDash />
      <div className='w-[80%] m-4 bg-'>
        VIDEO GRANDE
      </div>
      <div className='grid grid-cols-6'>
        <div>video 1</div>
        <div>video 2</div>
        <div>video 3</div>
        <div>video 4</div>
        <div>video 5</div>
        <div>video 6</div>
      </div>
    </div>
  );
}

export default page




