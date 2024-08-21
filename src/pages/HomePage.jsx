import React from 'react'
import Navbar from '../components/Navbar'
import { Container, Stack } from '@mui/material'
import HomeView from '../components/home/view/home-view'
import Home from '../components/Home'

function HomePage() {
    return (
        <Stack>
            <Navbar />
            <Container>

                <Home />
            </Container>
        </Stack>
    )
}

export default HomePage