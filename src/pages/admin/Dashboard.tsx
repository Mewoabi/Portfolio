import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { FileText, Folder, Mail, Timer } from 'lucide-react';
import { AnimateList, AnimateListItem } from '../../components/ui/Animate';
import type { BlogPost } from '../../types/blog';

interface DashboardStats {
  totalPosts: number;
  totalProjects: number;
  totalMessages: number;
  recentPosts: BlogPost[];
  recentMessages: {
    id: string;
    name: string;
    subject: string;
    createdAt: string;
  }[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalProjects: 0,
    totalMessages: 0,
    recentPosts: [],
    recentMessages: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch total counts
        const [postsSnap, projectsSnap, messagesSnap] = await Promise.all([
          getDocs(collection(db, 'blog-posts')),
          getDocs(collection(db, 'projects')),
          getDocs(collection(db, 'messages')),
        ]);

        // Fetch recent blog posts
        const recentPostsQuery = query(
          collection(db, 'blog-posts'),
          orderBy('publishedAt', 'desc'),
          limit(5)
        );
        const recentPostsSnap = await getDocs(recentPostsQuery);
        const recentPosts = recentPostsSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];

        // Fetch recent messages
        const recentMessagesQuery = query(
          collection(db, 'messages'),
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        const recentMessagesSnap = await getDocs(recentMessagesQuery);
        const recentMessages = recentMessagesSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as { id: string; name: string; subject: string; createdAt: string; }[];

        setStats({
          totalPosts: postsSnap.size,
          totalProjects: projectsSnap.size,
          totalMessages: messagesSnap.size,
          recentPosts,
          recentMessages,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
              <FileText className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Blog Posts</p>
              <p className="text-2xl font-semibold">{stats.totalPosts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
              <Folder className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Projects</p>
              <p className="text-2xl font-semibold">{stats.totalProjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
              <Mail className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Messages</p>
              <p className="text-2xl font-semibold">{stats.totalMessages}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Recent Posts */}
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Recent Posts</h2>
          <AnimateList className="space-y-4">
            {stats.recentPosts.map((post) => (
              <AnimateListItem key={post.id}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-medium line-clamp-1">{post.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Timer size={16} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </AnimateListItem>
            ))}
          </AnimateList>
        </div>

        {/* Recent Messages */}
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Recent Messages</h2>
          <AnimateList className="space-y-4">
            {stats.recentMessages.map((message) => (
              <AnimateListItem key={message.id}>
                <div className="space-y-1">
                  <h3 className="font-medium line-clamp-1">{message.subject}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    From: {message.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>
              </AnimateListItem>
            ))}
          </AnimateList>
        </div>
      </div>
    </div>
  );
}