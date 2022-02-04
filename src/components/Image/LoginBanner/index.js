import banner from 'assets/images/loginBanner.png'
import styles from './index.module.scss'

export default function LoginBanner() {
	return <img src={banner} alt="" className={styles.banner}/>
}
