import blogData from "../data/blogs.json";

const BlogDisplay = () => {
  // Reverse the array to show newest first
  const reversedBlogs = [...blogData].reverse();

  return (
    <div>
      {reversedBlogs.map((blog, index) => (
        <div
          key={index}
          className="mt-8 p-4 rounded-lg bg-gray-100 dark:bg-gray-800"
        >
          <div className="flex items-baseline gap-2 mb-2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {blog.title}
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {blog.date}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {blog.content}
          </p>
        </div>
      ))}
    </div>
  );
}
export default BlogDisplay;