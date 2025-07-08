import { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { Trash2, Mail } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Timestamp;
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const messagesQuery = query(
        collection(db, 'messages'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(messagesQuery);
      const fetchedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (messageId: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(db, 'messages', messageId));
        setMessages(prevMessages => 
          prevMessages.filter(msg => msg.id !== messageId)
        );
        if (selectedMessage?.id === messageId) {
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Messages</h1>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Messages List */}
        <div className="space-y-3 md:space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm cursor-pointer transition-colors ${
                selectedMessage?.id === message.id 
                  ? 'border-2 border-primary-500' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold truncate mb-1">{message.subject}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    From: {message.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {message.createdAt.toDate().toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(message.id);
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="text-center py-8 md:py-12 bg-white dark:bg-gray-800 rounded-lg">
              <Mail className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No messages yet
              </p>
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:sticky lg:top-6">
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div
                key={selectedMessage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm"
              >
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">
                      {selectedMessage.subject}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                      <p>From: {selectedMessage.name}</p>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="flex items-center gap-1 hover:text-primary-500"
                      >
                        <Mail size={16} />
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>

                  <div className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t dark:border-gray-700">
                    <p className="text-sm text-gray-500">
                      Received: {selectedMessage.createdAt.toDate().toLocaleString()}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-lg text-center"
              >
                <Mail className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Select a message to view its details
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}