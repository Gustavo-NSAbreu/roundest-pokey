import { getOptionForVote } from '@/utils/getRandomPokemon'
import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'
import { useState } from 'react';


const Home: NextPage = () => {

  const [ids, updateIds] = useState(() => getOptionForVote())

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: first }])
  const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: second }])
  
  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  const firstPokemonSprite = firstPokemon.data?.sprites.front_default  ?? undefined;
  const secondPokemonSprite = secondPokemon.data?.sprites.front_default ?? undefined;

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className='text-2xl text-center'>Which pokemon is Rounder?</div>
      <div className='p-2' />
      <div className='border rounded p-8 flex justify-between max-w-2xl items-center'>
        <div className='w-64 h-64 flesx flex-col'>
          <img src={firstPokemonSprite} alt='poke1' className='w-full' />
          <div className='text-xl text-center capitalize mt-[-2rem]'>{firstPokemon.data?.name}</div>
        </div>
        <div className='p-8'>Vs</div>
        <div className='w-64 h-64 flesx flex-col'>
          <img src={secondPokemonSprite} alt='poke2' className='w-full' />
          <div className='text-xl text-center capitalize mt-[-2rem]'>{secondPokemon.data?.name}</div>
        </div>
        <div className='p-2' />
      </div>
    </div>
  )
}

export default Home
