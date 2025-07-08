import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, ArrowRight, Tag } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Animate, AnimateList, AnimateListItem } from '../components/ui/Animate';
import { useBlogPosts } from '../hooks/useBlogPosts';

export default function Blog() {
  const { posts, loading, error } = useBlogPosts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories and tags
  const categories = useMemo(() => 
    [...new Set(posts.map(post => post.category))],
    [posts]
  );

  const tags = useMemo(() => 
    [...new Set(posts.flatMap(post => post.tags))],
    [posts]
  );

  // Filter posts based on selected filters
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [posts, selectedCategory, selectedTag, searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()} 
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 md:px-0 py-8 md:py-12">
      <Animate animation="slideUp" className="max-w-2xl mx-auto text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Thoughts, tutorials, and insights about web development and technology.
        </p>
      </Animate>

      {/* Filters */}
      <div className="mb-8 md:mb-12">
        <Animate animation="fadeIn" className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
          />
          
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto space-y-2">
              <p className="text-sm font-medium">Categories</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!selectedCategory ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="w-full md:w-auto space-y-2">
              <p className="text-sm font-medium">Tags</p>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  >
                    <Tag size={14} className="mr-1" />
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Animate>
      </div>

      {/* Blog Posts */}
      <AnimateList className="max-w-4xl mx-auto">
        {filteredPosts.map((post) => (
          <AnimateListItem key={post.id}>
            <article className="mb-8 md:mb-12 bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow">
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg mb-4 md:mb-6"
                />
              )}
              <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-sm">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CalendarDays size={16} />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <Link to={`/blog/${post.slug}`} className="block group">
                <h2 className="text-2xl font-semibold mb-3 group-hover:text-primary-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-primary-500 group-hover:text-primary-600 transition-colors">
                  <span>Read more</span>
                  <ArrowRight size={16} className="ml-2" />
                </div>
              </Link>

              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </AnimateListItem>
        ))}
      </AnimateList>

      {filteredPosts.length === 0 && (
        <Animate animation="fadeIn" className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300">
            No blog posts found matching your criteria.
          </p>
        </Animate>
      )}
    </div>
  );
}