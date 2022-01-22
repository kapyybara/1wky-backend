import styles from './index.module.scss'
import mainLogo from 'assets/images/mainLogo.png'
import { ReactComponent as Loading } from 'assets/icons/loading.svg'

function Suspense() {
	return <div className={styles.container}>
        <Loading />
    </div>
}

export default Suspense
