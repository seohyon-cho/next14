import clsx from 'clsx';
import styles from './about.module.scss';
import Link from 'next/link';

export default function About() {
	return (
		<>
			<section className={clsx(styles.background)}></section>
			<section className={clsx(styles.about)}>
				<section className={clsx(styles.top)}>
					<article className={clsx(styles.left)}>
						<h3>TIME TO MEET YOUR</h3>
						<h2>NEW BLOG.</h2>
					</article>
					<article className={clsx(styles.right)}></article>
				</section>
				<section className={clsx(styles.bottom)}>
					<h3>Why working with us is different ...</h3>
					<ul>
						<li>
							<h4>Why working with us is different ...</h4>
							<p>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores perspiciatis necessitatibus animi doloremque pariatur placeat
								corrupti cum error odit eveniet!
							</p>
						</li>
						<li>
							<h4>Why working with us is different ...</h4>
							<p>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores perspiciatis necessitatibus animi doloremque pariatur placeat
								corrupti cum error odit eveniet!
							</p>
						</li>
						<li>
							<h4>Why working with us is different ...</h4>
							<p>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores perspiciatis necessitatibus animi doloremque pariatur placeat
								corrupti cum error odit eveniet!
							</p>
						</li>
					</ul>
				</section>
				<section className={clsx(styles.middle)}>
					<article className={clsx(styles.pic)}></article>
					<article className={clsx(styles.txt)}>
						<h3>This is a website that helps you create a blog that stand out.</h3>
						<p>
							Summarize what you do and who it's for here. Try and stick to the size of the text box so your readers don't get too overwhelmed.
							Achieve your wildest dreams location freedom intentional living.
						</p>
						<div>
							<Link href={`/youtube`}>Explore our content.</Link>
						</div>
					</article>
				</section>
			</section>
		</>
	);
}
