import { Link, useLoaderData } from "remix";
import { getPosts, Post } from "~/post";

export let loader = () => {
  return getPosts();
};

export default function Posts() {
  let posts = useLoaderData<Post[]>();
  console.log(posts);
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}