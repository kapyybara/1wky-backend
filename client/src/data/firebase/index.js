import {initializeApp} from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyDEH2wGovK6Nj7QcOoGbMZRv6Un_lJdLvE',
	authDomain: 'iwvy-83a06.firebaseapp.com',
	projectId: 'iwvy-83a06',
	storageBucket: 'iwvy-83a06.appspot.com',
	messagingSenderId: '354052183303',
	appId: '1:354052183303:web:43ac3014bd5e92fd8ba1a2',
	measurementId: 'G-25V8GKSQQG',
}

export const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)


