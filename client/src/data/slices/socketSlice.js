import { io } from 'socket.io-client'
import { createContext, useState, useRef, useEffect } from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    socket: io('http://localhost:3000'),
}

