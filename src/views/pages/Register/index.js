import Decoration from 'components/Decoration'
import RegisterForm from 'containers/User/RegisterForm'
import styles from './index.module.scss'
import blob1 from 'assets/images/resBlob1.png'
import blob2 from 'assets/images/resBlob2.png'
import { Fade, XTransition } from 'animations'

export default function Register() {
	return (
		<div className={styles.container}>
			<XTransition>
				<RegisterForm />
			</XTransition>
			<Fade>
				<Decoration blobs={[blob1, blob2]} />
			</Fade>
		</div>
	)
}
