import React from "react";
import WrapperForComponents from "../UI/WrapperForComponents/WrapperForComponents";
import s from "./Contacts.module.css";
import { Link } from "@/i18n/routing";

const Contacts = () => {
	return (
		<WrapperForComponents paddingTop={64} paddingBottom={40}>
			<div className={s.contactsWrapper}>
				<ul className={s.contactsContentList}>
					<li className={s.contentItem}>
						<h2 className={s.contentTitle}>Контакти /</h2>
					</li>
					<li className={s.contentItem}>
						<p className={s.contentText}>
							Я Глорія і Життя — мій найкращий проєкт.
						</p>
					</li>
					<li className={s.contentItemPhone}>
						<p className={s.contentText}>+38 (077) 777 77 77</p>
					</li>
				</ul>

				<ul className={s.contactsSocialList}>
					<li className={s.socialItem}>
						<Link href="/" className={s.socialLink}>
							<h5 className={s.socialText}>TELEGRAM</h5>
							<div className={s.socialWraper}>
								<svg className={s.socialIcon}>
									<use href="/sprite.svg#icon-arrow-bottom-left"></use>
								</svg>
							</div>
						</Link>
					</li>
					<li className={s.socialItem}>
						<Link href="/" className={s.socialLink}>
							<h5 className={s.socialText}>INSTAGRAM</h5>
							<div className={s.socialWraper}>
								<svg className={s.socialIcon}>
									<use href="/sprite.svg#icon-arrow-bottom-left"></use>
								</svg>
							</div>
						</Link>
					</li>
					<li className={s.socialItem}>
						<Link href="/" className={s.socialLink}>
							<h5 className={s.socialText}>FACEBOOK</h5>
							<div className={s.socialWraper}>
								<svg className={s.socialIcon}>
									<use href="/sprite.svg#icon-arrow-bottom-left"></use>
								</svg>
							</div>
						</Link>
					</li>
				</ul>
			</div>
		</WrapperForComponents>
	);
};

export default Contacts;
