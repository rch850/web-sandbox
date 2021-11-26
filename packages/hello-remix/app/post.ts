import path from "path";
import fs from"fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";

export type Post = {
  slug: string;
  title: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

let postsPath = path.join(__dirname, "..", "posts");

function isValidPostAttributes(
  attributes: any
): attributes is PostMarkdownAttributes {
  return attributes?.title;
}

export async function getPosts() {
  let dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async filename => {
      let file = await fs.readFile(
        path.join(postsPath, filename)
      );
      let { attributes } = parseFrontMatter(
        file.toString()
      );
      invariant(
        isValidPostAttributes(attributes),
        `${filename} has bad meta data!`
      );
      return {
        slug: filename.replace(/\.md$/, ""),
        title: attributes.title
      }
    })
  );
}