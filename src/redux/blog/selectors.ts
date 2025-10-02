import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectBlog = (state: RootState) => state.blogs.blogList;
export const selectBlogLang = (state: RootState) => state.blogs.blogLangList;

export const selectBarberArticles = createSelector([selectBlog], (articles) =>
	articles.filter((article) => article.type === "barber")
);

export const selectPsychologyArticles = createSelector(
	[selectBlog],
	(articles) => articles.filter((article) => article.type === "psychology")
);
