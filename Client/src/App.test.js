import { getByRole, render, screen } from '@testing-library/react';
import Home from './component/home';
import Login from './component/login';
import Listing from './component/listing';

test('login', async ()=>{
  await render(<Home />)
  const inputField = screen.getByText(/Parking Management System/i)
  expect(inputField).toBeInTheDocument()
})

test('Requests', async ()=>{
  await render(<Listing />)
  const listingField = screen.queryByRole('textbox')
  // console.log(listingField)  
  expect(listingField).toBeInTheDocument()
})