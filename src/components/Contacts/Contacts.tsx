"use client";
import React, { useEffect } from "react";
import WrapperForComponents from "../UI/WrapperForComponents/WrapperForComponents";
import s from "./Contacts.module.css";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllContacts } from "@/redux/contacts/operations";
import { selectContacts } from "@/redux/contacts/selectors";

const Contacts = () => {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getAllContacts());
	}, [dispatch]);

	const contacts = useSelector(selectContacts);

	const t = useTranslations("Contact");
	return (
		<WrapperForComponents paddingTop={64} paddingBottom={40}>
			<div className={s.contactsWrapper}>
				<ul className={s.contactsContentList}>
					<li className={s.contentItem}>
						<h2 className={s.contentTitle}>{t("title")}</h2>
					</li>
					<li className={s.contentItem}>
						<p className={s.contentText}>{t("subTitle")}</p>
					</li>
					<li className={s.contentItemPhone}>
						<p className={s.contentText}>{contacts?.number}</p>
					</li>
				</ul>

				<ul className={s.contactsSocialList}>
					{contacts?.telegram && (
						<li className={s.socialItem}>
							<Link
								href={contacts.telegram as unknown as "/"}
								className={s.socialLink}
								target="_blank"
							>
								<h5 className={s.socialText}>TELEGRAM</h5>
								<div className={s.socialWraper}>
									<svg className={s.socialIcon}>
										<use href="/sprite.svg#icon-arrow-bottom-left"></use>
									</svg>
								</div>
							</Link>
						</li>
					)}
					{contacts?.instagram && (
						<li className={s.socialItem}>
							<Link
								href={contacts.instagram as unknown as "/"}
								className={s.socialLink}
								target="_blank"
							>
								<h5 className={s.socialText}>INSTAGRAM</h5>
								<div className={s.socialWraper}>
									<svg className={s.socialIcon}>
										<use href="/sprite.svg#icon-arrow-bottom-left"></use>
									</svg>
								</div>
							</Link>
						</li>
					)}
					{contacts?.facebook && (
						<li className={s.socialItem}>
							<Link
								href={contacts.facebook as unknown as "/"}
								className={s.socialLink}
								target="_blank"
							>
								<h5 className={s.socialText}>FACEBOOK</h5>
								<div className={s.socialWraper}>
									<svg className={s.socialIcon}>
										<use href="/sprite.svg#icon-arrow-bottom-left"></use>
									</svg>
								</div>
							</Link>
						</li>
					)}
				</ul>
			</div>
		</WrapperForComponents>
	);
};

export default Contacts;
