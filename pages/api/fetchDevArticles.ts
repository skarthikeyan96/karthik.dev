// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import moment from "moment"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const contentDir = "/content/blog/";

  const response = await fetch("https://dev.to/api/articles/me/published?per_page=1000", {
    headers: {
      "Api-Key": process.env.DEV_API_KEY as string,
    },
  });

  const data = await response.json();

  data.sort((a: { published_at: number; }, b: { published_at: number; }) => (a.published_at < b.published_at) ? 1 : -1).forEach((article:any) => {
      console.log(article)

      const normalizedTitle = article.title
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '')
      .toLowerCase()

      const normalizedPublishedAt = article.published_at.split('T')[0]
      const fileName = `${normalizedPublishedAt}_${normalizedTitle}.md`

      console.log(`${contentDir}${fileName} created!`)

const articleContent = `
---
title: "${article.title}"
metaTitle: "${article.title}"
metaDesc: "${article.description}"
date: "${moment(new Date(article.published_at)).format('YYYY-MM-DD')}"
slug: ${article.slug}
published: ${article.published}
---

${article.body_markdown}
`

      // const articleContent = `${frontMatter}
      
      // ${article.body_markdown}`

      console.log(articleContent.trimStart())

      fs.writeFileSync(
      `content/blog/${fileName}`,
      articleContent.trimStart(),
      'utf-8'
      )

  })


  res.status(200).json(data);
}
