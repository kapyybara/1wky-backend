import LoginForm from 'containers/User/LoginForm'
import LoginBanner from 'components/Image/LoginBanner'
import styles from './index.module.scss'
import Decoration from 'components/Decoration'
import blob1 from 'assets/images/loginBlob1.png'
import blob2 from 'assets/images/loginBlob2.png'
import { XTransition, Fade } from 'animations'

export default function Login() {
	return (
		<div className={styles.container}>
			<XTransition>
				<LoginForm />
			</XTransition>
			<Fade>
				<LoginBanner />
				<Decoration blobs={[blob1, blob2]} />
			</Fade>
		</div>
	)
}
